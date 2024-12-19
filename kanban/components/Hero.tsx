"use client"
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import BackgroundImage from "../public/backgroundImage.jpg";
import heroImage from "../public/heroImage.jpg";

import { SignInButton } from "@clerk/nextjs";

const Hero = () => {
  return (
    <div
      className="bg-cover bg-center h-screen w-full flex items-center justify-between px-12"
      style={{ backgroundImage: `url(${BackgroundImage.src})` }}
    >

      <div className="text-white max-w-[50%]">
        <h1 className="text-4xl font-bold mb-5">Visualize Success Daily</h1>
        <p className="text-lg mb-8">
            Take control of your projects with our simple yet <br /> powerful Kanban board.
        </p>

      
      <div>


        <SignInButton>
            <p  className="flex items-center bg-gray-800 text-white px-6 py-3 text-lg font-bold rounded hover:bg-gray-900">
            Start Planning Now
            </p>
        </SignInButton>
        </div>


      </div>
      
       <div>
        <Image 
        src={heroImage} 
        alt="Hero Image" 
        className="w-[500px] h-[600px] object-contain"
        />
        </div>

      <style jsx>{`
        @keyframes bounce-horizontal {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
