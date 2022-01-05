
import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import {loadGraphModel} from "@tensorflow/tfjs-converter";
import Webcam from "react-webcam";
import { message } from 'antd';
//import { toast, ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
tf.setBackend('webgl');
//toast.configure();

//Classes: label
const labelMap = {
  1:{name:'Ako', color:'blue'},
  2:{name:'Ano', color:'yellow'},
  3:{name:'Araw', color:'white'},
  4:{name:'Ayos lang', color:'red'},
  5:{name:'Baka', color:'blue'},
  6:{name:'Bukas', color:'yellow'},
  7:{name:'Gabi', color:'white'},
  8:{name:'Hapon', color:'red'},
  9:{name:'Hi', color:'blue'},
  10:{name:'Hindi', color:'yellow'},
  11:{name:'Hintay', color:'white'},
  12:{name:'Ikinagagalak', color:'red'},
  13:{name:'Ka o Mo o Ikaw', color:'blue'},
  14:{name:'Kamusta', color:'yellow'},
  15:{name:'Mabagal', color:'white'},
  16:{name:'Magandang', color:'red'},
  17:{name:'Magkita', color:'blue'},
  18:{name:'Mahal kita', color:'yellow'},
  19:{name:'Makilala', color:'white'},
  20:{name:'Mamaya', color:'red'},
  21:{name:'Ngayon', color:'blue'},
  22:{name:'Oo', color:'yellow'},
  23:{name:'Oras na', color:'white'},
  24:{name:'Paalam', color:'red'},
  25:{name:'Pakiulit', color:'blue'},
  26:{name:'Pakiusap', color:'yellow'},
  27:{name:'Pangalan', color:'white'},
  28:{name:'Paumanhin', color:'red'},
  29:{name:'Salamat', color:'blue'},
  30:{name:'Tayo', color:'yellow'},
  31:{name:'Umaga', color:'white'},
  32:{name:'Walang anuman', color:'red'},
 
}

//Tensorflowjs Library and react drawRect
export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx)=>{
  for(let i=0; i<=boxes.length; i++){
      if(boxes[i] && classes[i] && scores[i]>threshold){
       
          const [y,x,height,width] = boxes[i]
          const text = classes[i]
          
          
          ctx.strokeStyle = labelMap[text]['color']
          ctx.lineWidth = 5
          ctx.fillStyle = 'white'
          ctx.font = '30px Arial'         
          
          
          ctx.beginPath()
          ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i]*100)+'%', x*imgWidth, y*imgHeight-10)
          ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2, height*imgHeight/1.5);
          ctx.stroke()
		  
		
      }
  }
}

//tensorflowjs library and Computer Vision API
function AppMain() { 
  
  //const notify = () => toast("Fetching & preparing the Model for 2 minutes. Once done, show the palm and fold the middle and ring finger downwards ,a distance of half meter infront of the webcam. detection time is around 3-5 seconds.(Mobile Version is not fully supported.)", {
  //  position: toast.POSITION.TOP_CENTER,
  //  autoClose: 120000,
	//  pauseOnHover: false,
	//  draggable:false,
	//  closeButton:false,
	//  closeOnClick: false
	//});
 

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runModel = async () => {
    //Load Model 
  
    //Final 32 dataset custom train model
    const fslmodel = await tf.loadGraphModel('https://capstonetfjstestmodel.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json')
    

    setInterval(() => {
      detect(fslmodel);
    }, 3000); //3 second detection with average of 20 seconds of loading model but we deduce that the converted model is the problem 
  };

  const detect = async (fslmodel) => {
    //tf.engine().startScope();
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
      const boxes = await obj[0].array()
      const classes = await obj[5].array()
      const scores = await obj[1].array()

      
      // Draw 
      const ctx = canvasRef.current.getContext("2d");

      
      // draw (obj, ctx)  
      requestAnimationFrame(()=>{drawRect(boxes[0], classes[0], scores[0], 0.9, videoWidth, videoHeight, ctx)}); 

      //for Caption still undefined
	
     //document.getElementById("caption").innerText = `
     //           prediction: ${labelMap[obj.classes]}
     //       `
	  
	  //document.getElementById("caption").innerText = {classes};

      tf.dispose(img)
      tf.dispose(resized)
      tf.dispose(casted)
      tf.dispose(expanded)
      tf.dispose(obj)

    }
    //tf.engine().endScope();
  };

  useEffect(()=>{runModel()},[]);
  return (
    <div id="main" className="mainBlock">
		<div id="caption"></div>
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