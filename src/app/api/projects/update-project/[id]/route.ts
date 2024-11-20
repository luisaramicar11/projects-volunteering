import { IProjectRequest } from "@/app/core/application/dto";
import { ProjectService } from "@/app/infrastructure";
import { NextResponse } from "next/server";

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  console.log(params);
  const { id } = params;
  const idNumber = parseInt(id, 10);

  const project = new ProjectService();
  try {
    const projectData: IProjectRequest = await request.json();
    const res = await project.update(idNumber, projectData);
    return NextResponse.json({ status: 200, data: res });
  } catch (error) {
    return NextResponse.json({ status: 500, error: error });
  }
};
