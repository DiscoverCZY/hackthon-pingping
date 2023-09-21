import React from "react";
import logo from 'themes/logo.svg';

const SvgComponent = ({ w, h }) => {
  return <img src={logo} alt="Pingpong" width={w} height={h} />
};

export default SvgComponent;
