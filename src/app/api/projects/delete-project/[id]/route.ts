
import { ProjectService } from "@/app/infrastructure";
import { NextResponse } from "next/server";

export const DELETE = async (request: Request,{ params }: { params: { id: string } }) => {
  try {
    console.log("params", params);
    const id:string = params?.id;

    if (!id) {
      return NextResponse.json({ status: 400, error: "ID no proporcionado" });
    }

    const idNumber = parseInt(id, 10);

    // Verifica que la conversión fue exitosa
    if (isNaN(idNumber)) {
      return NextResponse.json({ status: 400, error: "ID inválido" });
    }

    const project = new ProjectService();
    const res = await project.destroy(idNumber);

    return NextResponse.json({ status: 200, data: res });
  } catch (error) {
    console.error("Error al eliminar el proyecto:", error);  
    return NextResponse.json({ status: 500, error: "Error al eliminar el proyecto" });
  }
};