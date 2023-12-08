
export interface ICardConfig {
    title?: string;
    api_url: string;
    webuntis_url?: string;
    webuntis_school?: string;
    webuntis_user?: string;
    webuntis_key?: string;
    webuntis_schoolnumber?: string;
    lastHour?: number;
    debug?:boolean;
}


export interface TimetableResult {
    version: string;
    data: TimetableData;
    notifications: number;
    timetableurl?: string;
}

export interface TimetableData {
    timetable: Day[];
    startTimetimes: StartTime[];
    klausuren?: any;
    homework?: Homework[];
}

export interface Homework {
    datum: string;
    faelligkeitsdatum : string;
    fach : string;
    text : string;
    remark : string;
    lehrer : string;
}

export interface StartTime {
    key: string;
    value: string;
}

export interface Day {
    key: string;
    value: Lesson[];
}

export interface Klausur {
    datum: string;
    uhrzeit: string;
    fach: string;
}

export interface Lesson {
    classCount: Number;
    endeTime: string;
    fach: string;
    fachLang: string;
    lehrer: string;
    raum: string;
    startTime: string;
    date: string;
    tagDate: Number;
    tagname: string;
    type: string;
    sondertext: string;
}