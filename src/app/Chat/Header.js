// import React from "react";
"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";

const Header = () => {
  const { data } = useSession();
  return (
    <>
      <header className="sticky top-0 z-50 flex justify-around w-full h-16 items-center bg-black text-gray-50  ">
        <div><Link href="/">Ms Chat</Link></div>
        <div className="space-x-6  "></div>
        <div className="flex justify-center ">
          {!data ? (
            <button
              onClick={signIn}
              className="border-white border-1 bg-green-400 rounded-full px-10 py-2 "
            >
              Sign In
            </button>
          ) : (
            <div className="flex justify-center w-full">
              <h1 className="font-bold mr-4 mt-2">{data?.user.name}</h1>
              <Avatar src={data?.user.image} />
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
