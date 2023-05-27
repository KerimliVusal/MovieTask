import React from "react";
import '../skletion/skletion.scss'
function Skeletons({ width, height }) {
  return <div className='skeleton' style={{ width, height }}></div>;
}

export default Skeletons;