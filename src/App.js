import React, { useEffect }  from "react";
import './App.css';
import 'antd/dist/antd.css';
//components
import AppHeader from './components/common/header';
import AppFooter from './components/common/footer';
import AppHome from './views/home';
//import AppNotify from './Notify.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Layout } from 'antd';

toast.configure();
const { Header, Content, Footer } = Layout;


function App() {
  

    const clearWaitingQueue = () => {
      toast.clearWaitingQueue();
    }
    const notify = () => toast("Fetching & Loading the Model for 2 minutes Please wait. Once done loading, position the signer within a distance of half meter infront of the webcam.(Mobile Version is not fully supported.)", {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 120000,
	  pauseOnHover: false,
	  draggable:false,
	  closeButton:false,
	  closeOnClick: false,
    onClose: toastdetection

	});


  const toastdetection = () => toast.success('Show the palm and fold the middle and ring finger downwards , wait for 3-5 seconds.', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 7000,
    pauseOnHover: false,
    draggable: false,
    closeButton: false,
    closeOnClick: false,
    onClose:toastdetect
  });

  const toastdetect = () => toast.info('For every detection, count for 3-5 seconds. If there still no detection change the angle or position of the gesture and if it still persist the shape of the gesture is hard to recognize.', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: false,
    pauseOnHover: false,
    draggable: false,
    closeButton: true,
    closeOnClick: true,
    //toastId: detect
  });
 
 
  
  useEffect(()=>{notify()},[]);
  return (
  
    <Layout className="mainLayout">
      <Header>
        <AppHeader/>
      </Header>
      <Content>
        <AppHome/>
      </Content>
      <Footer>
        <AppFooter/>  
      </Footer>      
    </Layout>
  );
}

export default App;
