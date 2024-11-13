export interface IProjectResponse {
    statusCode: number;
    message:    string;
    data:       IProject;
}

export interface IProject {
    title:       string;
    description: string;
    startDate:   Date;
    endDate:     Date;
    organizer:   Organizer;
    id:          number;
    isActive:    boolean;
}

export interface Organizer {
    id:    number;
    email: string;
    role:  string;
}
