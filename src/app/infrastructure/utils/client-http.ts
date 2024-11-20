import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const defaultBaseUrl =
  "https://communnityvolunteering-production.up.railway.app/api/v1";

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || defaultBaseUrl;
  }

  private async getHeader(formData: boolean = false) {
    const session = await getServerSession(authOptions);
    console.log(session?.user);
    const headers: HeadersInit = {};
    //console.log(session?.user.token);
    if (formData === false) {
      headers["Authorization"] = `Bearer ${session?.user.token}`;
      headers["Content-Type"] = "application/json";
    }
    if (session?.user?.token) {
      headers["Authorization"] = `Bearer ${session?.user.token}`;
    }
    return headers;
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    return await response.json();
  }

  async get<T>(url: string): Promise<T> {
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: headers,
      method: "GET",
      cache: "no-store",
    });
    return this.handleResponse(response);
  }

  async delete<T>(url: string): Promise<T> {
    console.log("URL del cliente DELETE:", url);
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers,
      method: "DELETE",
    });
    return this.handleResponse(response);
  }

  async post<T, B>(
    url: string,
    body: B,
    formData: boolean = false
  ): Promise<T> {
    const headers = await this.getHeader(formData);
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: headers,
      method: "POST",
      body: formData ? (body as FormData) : JSON.stringify(body),
    });
    return this.handleResponse(response);
  }

  async patch<T, B>(url: string, body: B): Promise<T> {
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: headers,
      method: "PATCH",
      body: JSON.stringify(body),
    });
    return this.handleResponse(response);
  }
}
