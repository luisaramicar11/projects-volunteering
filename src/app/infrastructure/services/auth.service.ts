import { ILoginRequest, ILoginResponse } from "@/app/core/application/dto";
import { HttpClient } from "../utils";

export class AuthService {
    private clientHttp: HttpClient;
    private basePath : string = "auth";

    constructor(){
        this.clientHttp = new HttpClient();
    }

    async login(req: ILoginRequest): Promise<ILoginResponse>{
        return await this.clientHttp.post<ILoginResponse, ILoginRequest>(
            `${this.basePath}/login`,
            req
        )
    }
}