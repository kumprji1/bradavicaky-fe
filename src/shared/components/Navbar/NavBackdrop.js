import React from 'react';
import ReactDOM from 'react-dom';

import './NavBackdrop.css';

const NavBackdrop = props => {
  return ReactDOM.createPortal(
    <div className="nav-backdrop" onClick={props.onClick}></div>,
    document.getElementById('nav-backdrop')
  );
};

export default NavBackdrop;