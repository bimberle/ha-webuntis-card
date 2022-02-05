
export interface ICardConfig {
    title?: string;
    entity: string;
    lastHour?: string;
}


export interface TimetableResult {
    version: string;
    data: TimetableData;
}

export interface TimetableData {
    timetable: Day[];
    starttimes: StartTime[];
}

export interface StartTime {
    key: string;
    value: string;
}

export interface Day {
    key: string;
    value: Lesson[];
}

export interface Lesson {
    classCount: Number;
    ende: string;
    fach: string;
    fachLang: string;
    lehrer: string;
    raum: string;
    start: string;
    tag: string;
    tagDate: Number;
    tagname: string;
    type: string;
}