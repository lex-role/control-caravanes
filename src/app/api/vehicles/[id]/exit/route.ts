import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const vehicle = await prisma.vehicle.update({
      where: { id: params.id },
      data: {
        isActive: false,
        exitTime: new Date(),
      },
    });

    return NextResponse.json(vehicle);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating vehicle" },
      { status: 500 }
    );
  }
}
