import { HomeAssistant } from "../ha-types";
import { html, css, LitElement, CSSResultGroup, TemplateResult } from "lit";
import { property } from "lit/decorators";
import { ICardConfig, Lesson, StartTime, Day, TimetableResult } from "../types";
import styles from "./card.css";
//import { hasConfigOrEntityChanged } from "../has-changed";

/**
 * Main card class definition
 */
export class HAWebUntisCard extends LitElement {

    @property({ attribute: false })
    private cardTitle?: string

    @property({ attribute: false })
    private state: string = "";

    @property({ attribute: false})
    private timetable?: TimetableResult;

    @property({ attribute: false })
    private lastHour?: number

    @property({ attribute: false })
    private visibleTimetable?: Day[];

    private entity: string = "";

    @property() private _config?: ICardConfig;

    private entityObj: any = undefined;
    private _hass: any;
    private timetablestring: string = "";


    private startIndex: number = 0;
    private dayCount: number = 0;
    


    

    /**
     * Renders the card when the update is requested (when any of the properties are changed)
     */
    render(): TemplateResult 
    {
        if(this.timetable != undefined) {
        return html`
            <ha-card>
                ${this.cardTitle ? html`
                <div class="card-header">
                    <div class="truncate">
                        <div class="cardTitle">
                            ${this.cardTitle}
                        </div>
                        <div class="last" @click=${() => this._showLastWeek(this.startIndex)}>
                            ${(this.startIndex-5) > 0 ? html`<ha-icon icon='mdi:chevron-left'></ha-icon>`: html``}
                        </div>
                        <div class="next" @click=${() => this._showNextWeek(this.startIndex)}>
                            ${(this.startIndex+5) <= this.dayCount ? html`<ha-icon icon='mdi:chevron-right'></ha-icon>`: html``}
                        </div>
                    </div>
                </div>` : html ``}
                <div class="card-content">
                    <div class='days'>
                            <div class='day'>
                                <div class='hourheader'>&nbsp;</div>
                                <div class='daydate'>&nbsp;</div>
                                <div class='hours'>
                                    ${this.timetable.data.startTimetimes.map( (time: StartTime, index: number) => {
                                            if(this.lastHour == undefined || this.lastHour >= Number(time.key.substring(0,2)))
                                            {
                                                return html`
                                                <div class='lesson'>
                                                    <div class=${this._getHourActiveStyle(time.key, 'hourheader') }>
                                                        ${time.key}
                                                    </div>
                                                    <div class=${this._getHourActiveStyle(time.key, 'hourend') }>
                                                        ${time.value}
                                                    </div>
                                                </div>`;
                                            }
                                        
                                    })}
                                </div>
                            </div>
                        ${this.visibleTimetable?.map((day: Day, index: number) => {
                                return html `
                                <div class='day'>
                                    <div class='dayheader'>
                                        ${day.value[0].tagname}
                                    </div>
                                    <div class='daydate'>
                                        ${day.value[0].date}
                                    </div>
                                    <div class='lessons'>
                                    ${day.value.map((lesson: Lesson) => {
                                        if(this.lastHour == undefined || this.lastHour >= Number(lesson.startTime.substring(0,2)))
                                        {
                                            return html`
                                            <div class='lesson'>
                                                <div class=${this._getHourActiveStyle(lesson.startTime, 'lessonheader') }>
                                                        ${lesson.fach != '' ? lesson.fach.substring(0,6) : '-'}
                                                </div>
                                                <div class=${this._getHourActiveStyle(lesson.startTime, 'teacher') }>
                                                    ${lesson.lehrer != '' ? lesson.lehrer.substring(0,12) : '-'}
                                                </div>
                                            </div>`;
                                        }
                                        
                                    })}
                                    </div>
                                </div>`;
                            //this.renderDay(day);
                        })}
                    </div>
                </div>
            </ha-card>
            `;
        }
        else
        {
            return html`<div>Loading...</div>`;
        }   

    
    }

    /*
    ${day.value.map((lesson: Lesson) => {
        this.renderLesson(lesson);
    })}
    */

    private _showNextWeek(currentIndex: number) {
        this.startIndex = currentIndex + 5;
        var ende = (this.startIndex + 5)  > this.dayCount ? this.dayCount - 1 : this.startIndex + 5;
        this.visibleTimetable = this.timetable?.data.timetable.slice(this.startIndex, ende) ?? [];
    }
    private _showLastWeek(currentIndex: number) {
        this.startIndex = currentIndex - 5;
        if(this.startIndex < 0)
            this.startIndex = 0;
        this.visibleTimetable = this.timetable?.data.timetable.slice(this.startIndex, this.startIndex+5) ?? []
    }

    
    private _getHourActiveStyle(time: string, classprefix: string) : string {
        if(this.lastHour)
            if(Number(time.substring(0,2)) > this.lastHour)
                return classprefix + 'inactive'
            else
                return classprefix
        else
            return classprefix
    }

    /**
     * CSS for the card
     */
    static get styles(): CSSResultGroup {
        return css(<TemplateStringsArray><any>[styles]);
    }

    /**
     * Called on every hass update
     */
    set hass(hass: HomeAssistant) {
        if (!this.entity || !hass.states[this.entity]) {
            return;
        }

        this.state = hass.states[this.entity].state;
        this.entityObj = hass.states[this.entity];
        this._hass = hass;
        

        // Initialize?
        if(this.timetablestring != this.entityObj.attributes.timetable) {
            try {
                this.timetable = JSON.parse(this.entityObj.attributes.timetable);
                this.visibleTimetable = this.timetable?.data.timetable.slice(this.startIndex,5) ?? [];
                this.dayCount = this.timetable?.data.timetable.length ?? 0;
            }
            catch(e)
            {
                console.log("Error Parsing timetable: " + e);
                console.log(this.entityObj.attributes.timetable)
            }
            
            //this._init();
        }
            
    }



    /**
     * Called every time when entity config is updated
     * @param config Card configuration (yaml converted to JSON)
     */
    setConfig(config: ICardConfig): void {
        this.entity = config.entity;
        if(config.title)
            this.cardTitle = config.title;
        if(config.lastHour)
            this.lastHour = config.lastHour
        this.startIndex = 0;
    }


}

