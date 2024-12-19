"use client"
import { useState, useEffect } from "react"
import { motion } from 'framer-motion'
import { useRouter } from "next/navigation"
import SyncLoader from "react-spinners/SyncLoader"
import toast from "react-hot-toast"
import Input from "@/components/Input"
import { auth } from "@clerk/nextjs/server"
import { createTask } from "@/app/actions/boardActions"

const variant = {
    hidden: {opacity: 0},
    visible: {opacity: 1},
    exit: {opacity: 0}
}

const OnBoardingForm = ({
    userName,
    createNewBoard,
    boardId
}: {
    userName: string | null | undefined
    createNewBoard: (formData: FormData) => Promise<void> 
    boardId: string | null
}) => {

    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    // CHECK IF THERE IS A BOARD ID AND ROUTER.PUSH()

    // useEffect(() => {
    //     if(boardId !== null){
    //         router.replace("/myKanban")
    //     }
    // }, [])

    const stepOneSubmit = () => {
        setStep(2)
    }
   
    const stepTwoSubmit = () => {
        setLoading(true)
        setTimeout(() => {
            router.replace("/myKanban");
            toast.success(`Welcome to your new baord ${userName}`)
            setLoading(false)
        }, 5000);
    }

    const goBack = () => {
        setStep(1)
    }
  return (
    <div>
        <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variant}
        transition={{duration: 0.5}}
        className="flex-col h-full items-center justify-center pt-[82px] w-[90%] mx-auto max-w-[1450px] text-white"
        >
            {step === 1 && (
                <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.5}}
                className="w-full text-center"
                >
                    <h1 className="mb-10 text-4xl font-bold uppercase">
                        Hey {userName} 👋 Let's Give Your Board A Name
                    </h1>
                    <form 
                    action={createNewBoard}
                    className="flex flex-col gap-10 items-center"
                    onSubmit={stepOneSubmit}
                     >    
                        <Input
                        name="boardName"
                        type="text"
                        placeholder="My Board Name..."
                        disabled={loading}
                        />

                        <button className="bg-white px-2 py-2 rounded-xl text-black font-semibold hover:bg-gray-200">
                            Continue
                        </button>
                    </form>
                </motion.div>
            )}

            {step === 2 && (
                <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.5}}
                className="w-full text-center"
                >
                    <h1 className="mb-10 text-4xl font-bold uppercase">
                        Now Let's Add Your First Task 😊
                    </h1>
                    <form
                    onSubmit={stepTwoSubmit}
                    action={createTask}
                    className="flex flex-col gap-10 items-center"
                    >
                    <Input
                    name="task"
                    type="text"
                    placeholder="My First Task..."
                    disabled={loading}
                    />

                    <Input
                    type="hidden"
                    value={boardId!}
                    name="boardId"
                    />

                    <div className="flex justify-center gap-4 w-4/5 mb-10 items-center">
                    <button
                    onClick={goBack}
                    disabled={loading} 
                    className="bg-white px-2 py-2 rounded-xl text-black font-semibold hover:bg-gray-200"
                    >
                        &#8592; Go Back
                    </button>
                    
                    <button  
                    className="bg-white px-2 py-2 rounded-xl text-black font-semibold hover:bg-gray-200"
                    disabled={loading}
                    type="submit"
                    >
                        Continue
                    </button>
                    </div>

                    {loading ? (
                        <div className="flex gap-3 items-center text-white">
                            <SyncLoader color="#fff"/>
                            <span>Getting Your Board Ready</span>
                        </div>
                    )
                    :
                    (
                        null
                    )
                    }

                    </form>
                </motion.div>
            )}
        </motion.div>
    </div>
  )
}

export default OnBoardingForm
