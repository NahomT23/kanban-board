import { auth } from "@clerk/nextjs/server"
import prisma from "@/utils/prisma"
import Board from "@/components/Board"
import Column from "@/components/Column"

const page = async () => {

  const { userId } = await auth()
  
  if (!userId) {
    throw new Error("User is not authenticated.")
  }

  const board = await prisma.kanbanBoard.findFirst({
    where: {
      userId: userId
    },
    include: {
      tasks: true
    }
  })

  return (
    <>
    <Board
    board={board}
    />
    </>
  )
}

export default page
