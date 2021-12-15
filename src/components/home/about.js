import React from 'react';



function AppAbout() {
  return (
    <div id="about" className="block aboutBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2><i className="fas fa-info-circle"></i> About </h2>
          <p>Filipino Sign Language Phrase Detection</p>
        </div>
        <div className="contentHolder">
          <p> A Research Project about Real-Time Custom Object Detection that was trained with 32 translated Filipino Sign Language of Basic Greetings and Commonly Used Phrases with an objective to assist Filipino community without background knowledge in Filipino Sign Language.</p>
          <p>Alphabets, Number Sign and other complex motion Sign Languange is not included to reduced the loading time of the model object detection for the web application</p>
          <p>This Project Custom Model was train in Google Colaboratory with Tensorflow Object Detection API bootstrapped with Create React App and Reactjs Tensorflowjs library. The Datasets were carefully choosen to represent the main point of each Filipino Sign Languages and thoughtfully translated the language names to filipino  by Jaafar, Malik and Nur label with
            a graphical image annotation tool from tzutalin.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AppAbout;