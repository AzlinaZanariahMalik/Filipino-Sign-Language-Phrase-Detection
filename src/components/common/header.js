import React, { useState } from 'react';

import { Anchor, Drawer, Button } from 'antd';

const { Link } = Anchor;

function AppHeader() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="container-fluid">
      <div className="header">
        <div className="logo">
             <h6> Filipino Sign Language Phrase Detection</h6>
        </div>
        <div className="mobileHidden">
          <Anchor className="anchor" targetOffset="65">
            <Link href="#main" className="main-nav" activeClassName="main-nav-active" title="Home" />
            <Link href="#about" className="main-nav" activeClassName="main-nav-active" title="About" />
            <Link href="#faq" className="main-nav" activeClassName="main-nav-active" title="FAQs" />
            <Link href="#question" className="main-nav" activeClassName="main-nav-active" title="Ask" />
          </Anchor>
        </div>
        <div className="mobileVisible">
          <Button type="primary" style={{ background: "#b90e0a" }} onClick={showDrawer}>
            <i className="fas fa-bars"></i>
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Anchor className="anchor" targetOffset="65">
              <Link href="#main" className="main-nav" activeClassName="main-nav-active" title="Home" />
              <Link href="#about" className="main-nav" activeClassName="main-nav-active" title="About" />
              <Link href="#faq" className="main-nav" activeClassName="main-nav-active" title="FAQs" />
              <Link href="#question" className="main-nav" activeClassName="main-nav-active" title="Ask" />
            </Anchor>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default AppHeader;