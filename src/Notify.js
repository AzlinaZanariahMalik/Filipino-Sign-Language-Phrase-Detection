import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function AppNotify() {

    const notify = () => toast("Fetching the Model Please Wait, Once done Pose a number 4 sign with no space between your fingers with a distance of half meter or near infront of the webcam, the detection time of the model is 3 sec", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 40000});
    
  return (
    <div className="formBox">
     <button onClick={notify}>Fetch Model</button>
     <ToastContainer />

    </div>
  );
}

export default AppNotify;