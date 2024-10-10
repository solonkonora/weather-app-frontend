"use client";

import React from 'react';
import Navbar from '@/src/components/navbar';
import Barchart from '@/src/components/barchart';

const Charts = () => {
  return (
    <div className="Chart-container, mb-9">
         <Navbar />
         <Barchart />
    </div>
  )
};

export default Charts;

