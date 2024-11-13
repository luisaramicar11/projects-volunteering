export interface IProjectsResponseDelete {
    statusCode: number;
    message:    string;
    data:       IData;
}

export interface IData {
    message: string;
}