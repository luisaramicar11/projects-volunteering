import { IProjectRequest } from "@/app/core/application/dto";
import { ProjectService } from "@/app/infrastructure";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const project = new ProjectService();
    try {
        const projectData: IProjectRequest = await request.json();
        const res = await project.create(projectData);
        return NextResponse.json({status: 201, data: res})
    } catch (error) {
        return NextResponse.json({ status: 500, error: error});
    }
}