import React from "react";

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen font-mono text-center px-4">
      <img src="/lo.png" alt="Loading Icon" className="w-56 mb-4" />
      
      <p className="text-xl font-semibold mb-2">
        It’s a journey of self-discipline, patience, and growth.
      </p>
      <p className="text-xl font-semibold mb-4">
        Focus on becoming the best version of yourself, and success will follow.
      </p>
      
      <img src="/load.png" alt="Spinner" className="w-16 animate-spin mb-2" />
      <div className="text-lg font-bold tracking-widest">LOADING...</div>
    </div>
  );
}

export default Loading;
