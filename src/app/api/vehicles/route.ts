import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { plate } = await request.json()

    // Comprobamos si el vehículo ya existe y está activo
    const existingVehicle = await prisma.vehicle.findFirst({
      where: {
        plate,
        isActive: true
      }
    })

    if (existingVehicle) {
      return NextResponse.json(
        { error: 'Vehicle already registered' },
        { status: 400 }
      )
    }

    // Registramos el nuevo vehículo
    const vehicle = await prisma.vehicle.create({
      data: {
        plate
      }
    })

    return NextResponse.json(vehicle)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Error registering vehicle' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        entryTime: 'desc'
      }
    })

    return NextResponse.json(vehicles)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching vehicles' },
      { status: 500 }
    )
  }
}