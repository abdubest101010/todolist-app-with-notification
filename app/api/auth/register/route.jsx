import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json({ error: "Username Missing " }, { status: 400 });
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        username,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating username:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
