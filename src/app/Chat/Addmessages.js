"use client";
import React from "react";
import Avatar from "@mui/material/Avatar";
import { useSession } from "next-auth/react";

const Addmessages = ({ id, message, name, email, image, time }) => {
  const { data } = useSession();
  console.log(data);
  const isUser = false;
  return (
    <>
      {/* //for user */}

      {data?.user.email == email ? (
        <div className="flex mt-2 w-full justify-end ">
          <p
            className={`my-auto ml-2 rounded-tl-lg rounded-br-lg p-2 
              bg-blue-800 text-white mr-4 `}
          >
            <h5>{message}</h5>
            <div className="flex justify-end">
              <h6 className="text-xs text-gray-400">
                {new Date(time).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
                
              </h6>
            </div>
          </p>

          <Avatar src={image} />
        </div>
      ) : (
        <div className="flex  m-4 w-1/2 ">
          <Avatar src={image} />

          <p
            className={`my-auto ml-2 rounded-tl-lg rounded-br-lg p-2 
              bg-white text-black mr-4 `}
          >
            <span className="font-small text-sm capitalize font-bold text-green-700">
              {name}
            </span>

            <h5>{message}</h5>
            <div className="flex justify-end">
              <h6 className="text-xs text-gray-400">2.00 pm</h6>
            </div>
          </p>
        </div>
      )}
    </>
  );
};

export default Addmessages;
