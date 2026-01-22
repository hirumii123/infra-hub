import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    // Validasi sederhana
    if (!email || !password) {
      return NextResponse.json({ message: "Data tidak lengkap" }, { status: 400 });
    }

    // Cek apakah email sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email: email }
    });

    if (existingUser) {
      return NextResponse.json({ message: "Email sudah terdaftar" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create User
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "user" // Default role
      }
    });

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}