"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/utils/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createNewBoard(formData: FormData) {
    const { userId } = await auth(); // Call auth inside the function

    if (!userId) {
        throw new Error("User is not authenticated.");
    }

    const name = formData.get("boardName") as string;

    const existingBoard = await prisma.kanbanBoard.findFirst({
        where: {
            userId: userId!
        }
    });

    if (existingBoard) {
        await prisma.kanbanBoard.update({
            where: {
                id: existingBoard.id
            },
            data: {
                name: name
            }
        });
    } else {
        await prisma.kanbanBoard.create({
            data: {
                name: name,
                userId: userId!
            }
        });
    }
    revalidatePath("/");
}

export async function createTask(formData: FormData) {
    const name = formData.get("task") as string;
    const boardId = formData.get("boardId") as string;

    if (!name.trim()) {
        return;
    }

    await prisma.task.create({
        data: {
            name: name,
            board: {
                connect: { id: boardId }
            },
            status: "TODO"
        }
    });

    revalidatePath("/");
}

export async function editTask(formData: FormData) {
    const newTask = formData.get("newTask") as string;
    const taskId = formData.get("taskId") as string;
    const newStatus = formData.get("newStatus") as string; // If status needs to be updated

    if (!newTask.trim()) {
        return;
    }

    try {
        await prisma.task.update({
            where: { id: taskId },
            data: {
                name: newTask,
            },
        });
        revalidatePath("/"); // Revalidate UI
    } catch (error) {
        console.error("Error updating task:", error);
        throw new Error("Failed to update task");
    }
}

export async function deleteTask(formData: FormData) {
    const taskId = formData.get("taskId") as string;

    await prisma.task.delete({
        where: {
            id: taskId
        }
    });

    revalidatePath("/");
}

