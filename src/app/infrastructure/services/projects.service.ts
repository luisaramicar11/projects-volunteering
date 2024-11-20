import {
  IAllProjectsRequest,
  IAllProjectsResponse,
  IProjectRequest,
  IProjectResponse,
} from "@/app/core/application/dto";
import { HttpClient } from "../utils/client-http";

export class ProjectService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  async findAll({ page, size }: IAllProjectsRequest) {
    try {
      const projects = await this.httpClient.get<IAllProjectsResponse>(
        `projects?page=${page}&size=${size}`
      );
      return projects;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener los proyectos");
    }
  }

  async create(project: IProjectRequest) {
    try {
      const newProject = await this.httpClient.post<
        IProjectResponse,
        IProjectRequest
      >(`projects`, project);
      return newProject;
    } catch (error) {
      console.log(error);
      throw new Error("Error al crear el proyecto");
    }
  }

  async update(id: number, project: IProjectRequest) {
    try {
      const updatedProject = await this.httpClient.patch<
        IProjectResponse,
        IProjectRequest
      >(`projects/${id}`, project);
      return updatedProject;
    } catch (error) {
      console.log(error);
      throw new Error("Error al actualizar el proyecto");
    }
  }

  async destroy(id: number) {
    try {
      const project = await this.httpClient.delete(`projects/${id}`);
      return project;
    } catch (error) {
      console.log(error);
      throw new Error("Error al eliminar el proyecto");
    }
  }
}
