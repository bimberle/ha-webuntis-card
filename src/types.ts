
export interface ICardConfig {
    title?: string;
    entity: string;
    lastHour?: number;
}


export interface TimetableResult {
    version: string;
    data: TimetableData;
    notifications: number;
    timetableurl: string;
}

export interface TimetableData {
    timetable: Day[];
    startTimetimes: StartTime[];
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
    endeTIme: string;
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