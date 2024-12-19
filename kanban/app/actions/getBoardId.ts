"use server"
import prisma from "@/utils/prisma"
import { auth } from "@clerk/nextjs/server"

const { userId } = await auth()
    
if (!userId) {
    throw new Error("User is not authenticated.")
}

export const getBoardIdForUser = async () =>{
    const board = await prisma.kanbanBoard.findFirst({
        where: {
            userId: userId
        }
    })

    return board ? board.id : null 
}