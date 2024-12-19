"use client"
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'

import { PiKanban } from "react-icons/pi"
import Link from "next/link";
import ThemeSwitcher from './ThemeSwitcher';
import useRouteCheck from '@/hooks/useRouteCheck';


const Navbar = () => {

  const onBoardingRoute = useRouteCheck(["onBoarding"])

  const kanbanRoute = useRouteCheck(["myKanban"])


  return (
    <div className={`py-5 bg-transparent absolute top-0 left-0 w-full z-10
    ${!kanbanRoute || onBoardingRoute} ? "text-white" : null `}>
        <div className="flex justify-between w-[90%] max-w-[1450px] mx-auto">
            <Link href="/" className="flex gap-1 items-center justify-center text-2xl font-bold uppercase">
               Kanban <PiKanban/>
            </Link>

            <div className="flex items-center gap-5">
                       <SignedOut>
                       <SignInButton />
                     </SignedOut>
                     <SignedIn>
                       <UserButton />
                     </SignedIn>

                     {!kanbanRoute && <SignedIn/> && !onBoardingRoute && (
                      <Link href={"/myKanban"}>
                        Go To My Board &#8594;
                      </Link>
                     ) }
                <ThemeSwitcher/>
            </div>
        </div>
    </div>
  )
}

export default Navbar
