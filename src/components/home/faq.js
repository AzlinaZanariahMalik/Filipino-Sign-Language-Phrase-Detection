import React from 'react';

import { Collapse} from 'antd';

const { Panel } = Collapse;

function AppFaq() {
  return(
    <div id="faq" className="block faqBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2><i className="fas fa-comments"></i> FAQs</h2>
        </div>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Why I can't see the camera, even though i allow the access permission?" key="1">
			<p> If you are using from the mobile please use landscape mode but the mobile view has low support from the tensorflowjs libary</p>
            <p>Usually it takes a minute for the camera to appear, if it takes longer than minutes Please refresh the page .</p>
            <p>Allow the camera access permission.</p>
            <p>If camera have been blocked, click the lock icon of the address bar to enable it.</p>
          </Panel>
          <Panel header="Why is there no detection?" key="2">
            <p>It takes an average of 25 seconds to fetch the model.</p>
            <p>The Distance is limit only to half meter.</p>
            <p>Please make sure you have the following: stable internet connection, graphics card and the place is not dark.</p>
          </Panel>
          <Panel header="Why does the label keep on changing or is not steady?" key="3">
            <p>The Capture Real Time moment may not be clear enough or the lightning of the background is too blurry or dark.</p>
          </Panel>
      
        </Collapse>
      </div>
    </div>  
  );
}

export default AppFaq;