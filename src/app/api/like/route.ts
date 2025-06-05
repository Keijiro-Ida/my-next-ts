import { PrismaClient } from "@/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();


export async function POST(req: NextRequest) {
    const { reviewId, userId } = await req.json();
    if (!reviewId || !userId) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const already = await prisma.like.findUnique({
        where: {
            userId_reviewId: {
                userId: userId,
                reviewId: reviewId
            }
        }});
    if (already) {
        return NextResponse.json({ error: "Already liked" }, { status: 400 });
    }
    await prisma.like.create({
        data: {
            userId: userId,
            reviewId: reviewId
    }});

    return NextResponse.json({ ok: true });

}

export async function DELETE(req: NextRequest) {
    const { reviewId, userId } = await req.json();
    if (!reviewId || !userId) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    await prisma.like.deleteMany({
        where: {
            userId: userId,
            reviewId: reviewId
        }
    });

    return NextResponse.json({ ok: true });
}
