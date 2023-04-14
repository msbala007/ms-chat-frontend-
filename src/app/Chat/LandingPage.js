"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import chat from "../images/chat_img.png"

const LandingPage = () => {
  const { data } = useSession();
  const router = useRouter();
  return (
    <>
      <div className=" bg-black min-h-screen text-white flex flex-col justify-center items-center w-full space-y-9">
        <div>
          <Image src={chat} className="w-full h-56"/>
        </div>
        
        <div className="font-bold text-7xl text-center sm:text-5xl xl:text-8xl">
          The Ultimate Communcation Platform
        </div>
        <div className="text-center">
          {!data ? (
            <button
              onClick={() => signIn()}
              className="bg-orange-400 px-6 py-2 rounded-full"
            >
              Let's connect
            </button>
          ) : (
            <button
              onClick={() => router.push("/ms-chat")}
              className="bg-orange-400 px-6 py-2 rounded-full"
            >
              Let's connect
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
