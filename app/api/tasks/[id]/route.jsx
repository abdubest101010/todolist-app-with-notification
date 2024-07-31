import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const { id: userId } = params;

    const body = await request.json();
    const { title, description, scheduledDate } = body;

    if (!userId || !title || !scheduledDate || !description) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const task = await prisma.task.create({
      data: {
        userId: parseInt(userId),
        title,
        description,
        scheduledAt: new Date(scheduledDate),
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
