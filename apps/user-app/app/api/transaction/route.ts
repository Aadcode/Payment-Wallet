"use server"
import db from "@repo/db/client";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";

export const GET = async () => {
    const session = await getServerSession(authOptions);

    const data = await db.user.findUnique({
        where: {
            email: session?.user?.email || undefined,
        },

        include: {
            OnRampTransaction: {
                include:
                {
                    user: true
                }
            }
        },
    });

    if (session?.user) {
        return NextResponse.json({
            transaction: data?.OnRampTransaction
        })
    }
    return NextResponse.json({
        message: "You are not logged in"
    }, {
        status: 403
    })
}