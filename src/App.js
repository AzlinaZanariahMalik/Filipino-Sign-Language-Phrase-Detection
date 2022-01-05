import React from "react";
import './App.css';
import 'antd/dist/antd.css';
//components
import AppHeader from './components/common/header';
import AppFooter from './components/common/footer';
import AppHome from './views/home';
//import AppNotify from './Notify.js';


import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;


function App() {
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
