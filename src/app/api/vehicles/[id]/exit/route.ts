import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  try {
    // Obtener el id de la URL
    const id = request.nextUrl.pathname.split("/").slice(-2, -1)[0];

    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        isActive: false,
        exitTime: new Date(),
      },
    });

    return NextResponse.json(vehicle);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating vehicle" },
      { status: 500 }
    );
  }
}
