import React from 'react';

const Spinner = () => {
  return (
    <div className="relative flex items-center justify-start h-[2.8rem] w-[2.8rem]">
    <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full"></div>
    <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full rotate-45"></div>
    <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full rotate-90"></div>
    <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full rotate-135"></div>
    <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full rotate-180"></div>
    <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full rotate-225"></div>
    <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full rotate-270"></div>
    <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full rotate-315"></div>
  </div>
  );
};

export default Spinner;