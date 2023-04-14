"use client";

import React, { useEffect, useRef, useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import IconButton from "@mui/material/IconButton";
import Addmessages from "./Addmessages";
import Pusher from "pusher-js";
import axios from "axios";
import { useSession } from "next-auth/react";
import bg from "../images/bg.jpg";
import Image from "next/image";

const ChatBox = ({messages}) => {
  const [Msg, setMsg] = useState([]);
  const [input, setInput] = useState("");
  const ref=useRef()

 

  useEffect(() => {
    axios
      .get(`${process.env.GET_URL}`)
      .then((response) => setMsg(response.data.chat));
  }, []);
   useEffect(()=>{
     ref.current?.scrollIntoView({behavior:"smooth"})
   },[Msg])

  useEffect(() => {
    const pusher = new Pusher(`${process.env.ID}`, {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      setMsg([...Msg, data]);
    });
    console.log(Msg);
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [Msg]);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { data } = useSession();

  const userdata = {
    message: input,
    name: data?.user.name,
    email: data?.user.email,
    image: data?.user.image,
  };
  const sendMessages = async () => {
    await axios.post(`${process.env.URL}`, userdata);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessages();
  
  };
  if (!data) {
    return (
      <div className="min-h-screen bg-black">
        <div className="flex justify-center text-white items-center h-screen ">
          <button className="border-2 border-white px-6 py-2 rounded-full hover:">
            Sign In
          </button>
        </div>
      </div>
    );
  }
  return (
    <>
      <div    className=" min-h-screen w-full   relative ">
        <Image src={bg} className="absolute object-fit -z-50 h-full w-full" />
        <div className="h-screen overflow-y-scroll  " >
          {Msg.map(({ _id, name, message, date, email, image }) => (
            <div className="flex" ref={ref}>
              <Addmessages
                id={_id}
                message={message}
                name={name}
                email={email}
                image={image}
                time={date}
              />
            </div>
          ))}
          
        </div>
      </div>
      <div className="relative ">
        <Image src={bg} className="absolute object-fit -z-50 h-full w-full" />
        <form>
          <div className="  w-full bottom-0 py-2 flex justify-center items-center  ">
            <div className="w-10/12 ">
              <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="p-4 rounded-full w-10/12   bg-white text-black border-2"
              />
            </div>
            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-green-500 h-16 w-16 rounded-full "
              >
                <SendOutlinedIcon fontSize="medium" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatBox;
