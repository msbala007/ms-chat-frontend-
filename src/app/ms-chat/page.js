import React from 'react'
import ChatBox from '../Chat/ChatBox'

const getAllMessages=async ()=>{
  const response=await fetch("https://ms-chat-k7sf.onrender.com/v1/receive")
  const data=await response.json()
  return data;
}

const page = async() => {
  const data=await getAllMessages()
  // console.log(data);
  return (
    <div>
      <ChatBox messages={data} />
    </div>
  )
}

export default page