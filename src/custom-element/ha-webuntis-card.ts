import { HomeAssistant } from "../ha-types";
import { html, css, LitElement, CSSResultGroup, TemplateResult, PropertyValues } from "lit";
import { property } from "lit/decorators";
import { ICardConfig, Lesson, StartTime, Day, TimetableResult, Klausur, Homework } from "../types";
import styles from "./card.css";
//import { hasConfigOrEntityChanged } from "../has-changed";
//import { hasConfigOrEntityChanged } from "../has-changed";

/**
 * Main card class definition
 */
export class HAWebUntisCard extends LitElement {

    @property({ attribute: false })
    private cardTitle?: string

    @property({ attribute: false })
    private debug?: boolean

    @property({ attribute: false })
    private api_url?: string

    @property({ attribute: false })
    private webuntis_url?: string

    @property({ attribute: false })
    private webuntis_school?: string

    @property({ attribute: false })
    private webuntis_user?: string

    @property({ attribute: false })
    private webuntis_key?: string

    @property({ attribute: false })
    private webuntis_schoolnumber?: string

    @property({ attribute: false})
    private timetable?: TimetableResult;

    @property({ attribute: false })
    private lastHour?: number

    @property({ attribute: false })
    private visibleTimetable?: Day[];

    //private entity: string = "";

    @property() private _config?: ICardConfig;

    //private entityObj: any = undefined;
    private _hass: any;
    //private timetablestring: string = "";
    private klausuren: Klausur[] = [];
    private homework: Homework[] = [];

    private startIndex: number = 0;
    private dayCount: number = 0;
    private initialized: boolean = false;
    @property({ attribute: false })
    private actualDate: string = "";
    private lastVisibleDate: Date = new Date();
    


    

    /**
     * Renders the card when the update is requested (when any of the properties are changed)
     */
    render(): TemplateResult 
    {
        if(this.timetable != undefined) {
            if(!this.initialized)
                this.initialized = true;
        return html`
            <ha-card class="webuntiscard">
                ${this.cardTitle ? html`
                <div class="card-header">
                    <div class="truncate">
                        <div class="cardTitle">
                            ${this.cardTitle}
                        </div>
                        ${this.renderNotification()}
                        <div class="last" @click=${() => this._showLastWeek()}>
                            ${(this.startIndex-5) >= 0 ? html`<ha-icon icon='mdi:chevron-left'></ha-icon>`: html``}
                        </div>
                        <div class="next" @click=${() => this._showNextWeek()}>
                            ${(this.startIndex+5) < this.dayCount ? html`<ha-icon icon='mdi:chevron-right'></ha-icon>`: html``}
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
                                <div class=${this.actualDate == day.value[0].date.substring(0,6) ? `currentDay` : `day`}>
                                    <div class='dayheader'>
                                        ${day.value[0].tagname}
                                    </div>
                                    <div class='daydate'>
                                        ${day.value[0].date.substring(0,6)}
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
                <div>Hausaufgaben</div>
                <div class='homework'>
                    ${this.homework.map((homework: Homework, index: number) => {
                        return html`
                        <div class='homeworkRow'>
                            <div class='homeworkDateCol'>
                                <div class='homeworkLesson'>${homework.fach}</div>
                                <div class='homeworkDueDate'>${homework.faelligkeitsdatum}</div>
                            </div>
                            <div class='homeworkTextCol'>
                                <div class='homeworkTextContent'>
                                    <div class='homeworkTextCol'>${homework.text}</div>
                                    <div class='homeworkDueDate'>${homework.datum}</div>
                                </div>
                                <div class='homeworkTextContent'>${homework.remark}</div>
                            </div>
                        </div>`; 
                    }) }
                </div>
            </ha-card>
            `;
        }
        else
        {
            return html`<div>Loading...</div>`;
        }   

    
    }


    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if(this.initialized) 
        {
            var shoulddo = false;
            
                // timetable hat sich nicht geändert
                if(changedProps.has("visibleTimetable"))
                    shoulddo = true;

                // hat sich der Tag geändert?
                if(changedProps.has("actualDate"))
                    shoulddo = true;
                
                if(this.actualDate != this.getCurrentDateString())
                    {
                        // Prüfen ob das aktuelle Datum > der letzte angezeigt Tag ist
                        //if(!this.isComingDateVisible()) {
                        //    shoulddo = false;
                        //    this._showNextWeek();
                        //}
                        //else
                            this.actualDate = this.getCurrentDateString();
                    }
                    
                    
                
            return shoulddo;
        }
        else
            return true;
    }

    protected updated(changedProps: PropertyValues) {
            super.updated(changedProps);
        
            if (changedProps.has("hass")) {
                //const stateObj = this.hass!.states[this._config!.entity];
                const oldHass = changedProps.get("hass") as this["hass"];
                //const oldStateObj = oldHass ? oldHass.states[this._config!.entity] : undefined;
        
            }
        }

    private renderNotification() : TemplateResult {

        if(this.timetable?.notifications && this.timetable.notifications > 0)
        {
            var urlSet = false;
            if(this.timetable?.timetableurl && this.timetable.timetableurl != '')
                urlSet = true;
            
            return html`
            ${urlSet ? html`<a target='_blank' href='${this.timetable.timetableurl}'>` : ``}
            <div class="notificationbadge">
                <ha-icon icon='mdi:bell'></ha-icon>
                <div class='badge'>${this.timetable.notifications}</div>
            </div>
            ${urlSet ? html`</a>` : ``}
            `;
        }
        else 
            return html``;
    }

    private _parseDate(input: string) {
        var parts = input.match(/(\d+)/g);
        // note parts[1]-1
        if(parts != undefined)
            return new Date(parseInt(parts[2]), parseInt(parts[1])-1, parseInt(parts[0]));
        else
            return new Date();
    }

    private _showNextWeek() {
        this.startIndex += + 5;
        var ende = (this.startIndex + 5)  > this.dayCount ? this.dayCount : this.startIndex + 5;
        this.visibleTimetable = this.timetable?.data.timetable.slice(this.startIndex, ende) ?? [];
        this.setLastVisibleDate();
    }
    private _showLastWeek() {
        this.startIndex -= 5;
        if(this.startIndex < 0)
            this.startIndex = 0;
        this.visibleTimetable = this.timetable?.data.timetable.slice(this.startIndex, this.startIndex+5) ?? []
        this.setLastVisibleDate();
    }

    setLastVisibleDate() {
        var lastDateString : string = this.visibleTimetable ? this.visibleTimetable[this.visibleTimetable.length-1].value[0].date : "";
        this.lastVisibleDate = this._parseDate(lastDateString);
    }

    getCurrentDateString() {
        var now = new Date();
        this.actualDate = "";
        this.actualDate += now.getUTCDate() < 10 ? "0" + now.getUTCDate().toString() :  now.getUTCDate().toString();
        this.actualDate += now.getUTCMonth() < 10 ? ".0" + now.getUTCMonth().toString() : "." + now.getUTCMonth().toString();
        return this.actualDate += "."; 
    }

    isComingDateVisible() : boolean {
        var today: Date = new Date();
        let timeInMilisec: number = this.lastVisibleDate.getTime() - today.getTime();
        let daysBetweenDates: number = Math.ceil(timeInMilisec / (1000 * 60 * 60 * 24));
        
        if(daysBetweenDates >= 0) {
            return true;
        }
        else
            return false;
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
        //if (!this.entity || !hass.states[this.entity]) {
        //    return;
        //}

        //this.state = hass.states[this.entity].state;
        //this.entityObj = hass.states[this.entity];
        this._hass = hass;

        this.actualDate = this.getCurrentDateString();
        
        this.getTimetableFromUrl().then(timetable => {
            if(timetable != undefined) {
                this.timetable = timetable;
                if(this.timetable.data != undefined) {
                    this.visibleTimetable = this.timetable.data.timetable.slice(this.startIndex,5) ?? [];
                    this.dayCount = this.timetable.data.timetable.length ?? 0;
                    //if(!this.isComingDateVisible())
                    //    this._showNextWeek();
                    this.setLastVisibleDate();
                }
                if(this.timetable.data.klausuren != undefined) {
                    this.klausuren = this.timetable.data.klausuren;
                }
                if(this.timetable.data.homework != undefined) {
                    this.homework = this.timetable.data.homework;
                }
            }
        });
            
    }



    /**
     * Called every time when entity config is updated
     * @param config Card configuration (yaml converted to JSON)
     */
    setConfig(config: ICardConfig): any {
        //this.entity = config.entity;
        if(config.title)
            this.cardTitle = config.title;
        if(config.lastHour)
            this.lastHour = config.lastHour
        if(config.api_url)
            this.api_url = config.api_url
        if(config.webuntis_url)
            this.webuntis_url = config.webuntis_url
        if(config.webuntis_user)
            this.webuntis_user = config.webuntis_user
        if(config.webuntis_key)
            this.webuntis_key =config.webuntis_key
        if(config.webuntis_schoolnumber)
            this.webuntis_schoolnumber = config.webuntis_schoolnumber
        if(config.webuntis_school)
            this.webuntis_school = config.webuntis_school
        if(config.debug)
            this.debug = config.debug;
        else
            this.debug = false;


        this.startIndex = 0;
    }

    // http://192.168.178.116:8234/webuntis/x/x/nessa.webuntis.com/RobertG%20Gym/KEC/E75HFIUCPA5HTVRV/4229900/false
    
    // http://192.168.178.116:8234/webuntis/x/x/nessa.webuntis.com/RobertG%20Gym/KEC/E75HFIUCPA5HTVRV/4229900/false
    
    getTimetableFromUrl() : Promise<TimetableResult> {
        let parsedResponse: TimetableResult;
        let url = this.api_url + "/x/x/" + this.webuntis_url + "/" + this.webuntis_school + "/" + this.webuntis_user + "/" + this.webuntis_key + "/" + this.webuntis_schoolnumber;
        if(this.debug)
            url = url + "/true";
        else
            url = url + "/false";
        
        return fetch(url)
		.then((response) => response.json()) // Parse the response in JSON:
		.then((response) => {
            if(response.data.klausuren == undefined || response.data.klausuren == true)
                response.data.klausuren = [];
            if(this.debug)
                console.debug(response);
			return response as TimetableResult;
		});

    }


}

