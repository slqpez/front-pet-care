import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./message.css"

function Message({text, type}) {
  const customId = "custom-id-yes";

  let notify = function(){}
  if (type==="error"){
    notify = () =>
    toast.error(`${text}`, {
      toastId: customId,
      position: "top-center",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      delay:10
    });
  }else{
    if(type === "success"){
      notify = ()=>toast.success(`${text}`, {
        toastId: customId,
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        delay:10
      });
    }
  }
  

    

   useEffect(() => {
    notify();
  }, []); 
  return (
    <div>
      <ToastContainer className="message"/>
    </div>
  );
}

export default Message;
