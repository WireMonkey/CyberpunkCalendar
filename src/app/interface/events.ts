export interface Events {
    firstDay: Date;
    lastDay: Date;
    currentDay: Date;
    events: Event[];
    forcast: weather[];
}

export interface Event {
    day: Date;
    shortNote: string;// Max 50 char.
    note?: string;
    isPdf?: boolean;
    fileName?: string;
}

export interface weather {
    day: Date;
    temp: string;
    weather: string;
}
