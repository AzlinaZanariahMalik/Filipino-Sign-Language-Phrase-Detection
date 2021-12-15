
import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import {drawRect, labelMap} from "./model";

tf.setBackend('webgl');

//tensorflowjs library and Computer Vision API
function AppMain() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runModel = async () => {
    //Load Model 
  
    //Final 32 dataset custom train model
    const fslmodel = await tf.loadGraphModel('https://capstonetfjstestmodel.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json')
    

  
    setInterval(() => {
      detect(fslmodel);
    }, 1000); //1second detection but we deduce that the converted model is the problem 
  };

  const detect = async (fslmodel) => {
    // data
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // get video 
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // set video 
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // set canvas 
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      
      const img = tf.browser.fromPixels(video)
      const resized = tf.image.resizeBilinear(img, [640,480])
      const casted = resized.cast('int32')
      const expanded = casted.expandDims(0)
      const obj = await fslmodel.executeAsync(expanded)

      //console.log(await obj[0].array())
      console.log(obj)

      //Identify the Object Array Number from the model
      const boxes = await obj[6].array()
      const classes = await obj[7].array()
      const scores = await obj[5].array()

      
      // Draw 
      const ctx = canvasRef.current.getContext("2d");

      
      // draw (obj, ctx)  
      requestAnimationFrame(()=>{drawRect(boxes[0], classes[0], scores[0], 0.9, videoWidth, videoHeight, ctx)}); 

      document.getElementById("caption").innerText = {classes};

      tf.dispose(img)
      tf.dispose(resized)
      tf.dispose(casted)
      tf.dispose(expanded)
      tf.dispose(obj)

    }
    await tf.nextFrame()
  };

  useEffect(()=>{runModel()},[]);
  return (
    <div id="main" className="mainBlock">
            <header className="container-fluid">
                <Webcam
                ref={webcamRef}
                audio={false}
                muted={true} 
                style={{
                  position: "absolute",
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  zindex: 9,
                  width: 640,
                  height: 480,
            
                 }}
          
                 />

                 <div id="caption"></div>


                <canvas
                  ref={canvasRef}
                  style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 8,
                    width: 640,
                    height: 480,
                  }}
                  
                />
               
            </header>  
    </div>
  );
}

export default AppMain;