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
  const notify = () => toast("Fetching & Loading the Model for 2 minutes. Once done, show the palm and fold the middle and ring finger downwards ,a distance of half meter infront of the webcam. detection time is around 3-5 seconds.(Mobile Version is not fully supported.)", {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 120000,
	  pauseOnHover: false,
	  draggable:false,
	  closeButton:false,
	  closeOnClick: false
	});
  useEffect(()=>{notify()},[]);
  return (
  
    <Layout className="mainLayout">
      <Header>
        <AppHeader/>
      </Header>
      <Content>
        <AppHome/>
        <ToastContainer />
      </Content>
      <Footer>
        <AppFooter/>  
      </Footer>      
    </Layout>
  );
}

export default App;
