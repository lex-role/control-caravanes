import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { plate } = await request.json();

    // Primero verificamos si existe un vehículo activo con esa matrícula
    const activeVehicle = await prisma.vehicle.findFirst({
      where: {
        plate,
        isActive: true,
      },
    });

    if (activeVehicle) {
      return NextResponse.json(
        { error: "Vehicle already registered" },
        { status: 400 }
      );
    }

    // Si no hay vehículo activo, buscamos si hay uno reciente (24h)
    const previousVehicle = await prisma.vehicle.findFirst({
      where: {
        plate,
        isActive: false,
        exitTime: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
      orderBy: {
        exitTime: "desc",
      },
    });

    if (previousVehicle) {
      // Reactivar vehículo existente
      const updatedVehicle = await prisma.vehicle.update({
        where: { id: previousVehicle.id },
        data: {
          isActive: true,
          exitTime: null,
        },
      });
      return NextResponse.json(updatedVehicle);
    }

    // Si no hay vehículo activo ni reciente, creamos uno nuevo
    const vehicle = await prisma.vehicle.create({
      data: { plate },
    });

    return NextResponse.json(vehicle);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating vehicle" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        entryTime: "desc",
      },
    });

    return NextResponse.json(vehicles);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching vehicles" },
      { status: 500 }
    );
  }
}
