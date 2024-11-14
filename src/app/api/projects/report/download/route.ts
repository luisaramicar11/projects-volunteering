// app/api/projects/report/download/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/route"; // Asegúrate de que la ruta sea correcta

const API_BASE_URL = "https://communnityvolunteering-production.up.railway.app/api/v1";

export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = session.user.token;

  try {
    const response = await fetch(`${API_BASE_URL}/projects/report/download`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to download report');
    }

    const fileBuffer = await response.arrayBuffer(); // Obtén el archivo como ArrayBuffer
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="reporte_proyectos.xlsx"',
      },
    });
  } catch (error) {
    console.error('Error downloading report from external API:', error);
    return NextResponse.json({ error: 'Error downloading report' }, { status: 500 });
  }
};
