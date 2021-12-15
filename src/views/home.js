import React from 'react';

import AppMain from '../components/home/main';
import AppAbout from '../components/home/about';
import AppFaq from '../components/home/faq';
import AppQuestion from '../components/home/question';


function AppHome() {
  return (
    <div className="main">
      <AppMain/>
      <AppAbout/> 
      <AppFaq/>
      <AppQuestion/>
    </div>
  );
}

export default AppHome;