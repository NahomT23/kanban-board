import { getBoardIdForUser } from "@/app/actions/getBoardId"
import { currentUser } from "@clerk/nextjs/server"
import OnBoardingForm from "../components/OnBoardingForm"
import { createNewBoard } from "@/app/actions/boardActions"
import { auth } from "@clerk/nextjs/server"


const Page = async () => {
  const boardId = await getBoardIdForUser()
  const user = await currentUser()
  const userName = user?.firstName

  return (
    <div className="bg-gray-900">
      {/* Pass createNewBoard as a prop to the client component */}
      <OnBoardingForm
        userName={userName}
        createNewBoard={createNewBoard}
        boardId={boardId}
      />
    </div>
  )
}

export default Page
