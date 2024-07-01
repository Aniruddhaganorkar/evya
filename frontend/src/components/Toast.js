import React from 'react';

const Toast = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white text-black py-2 px-4 rounded-md shadow-lg border border-green-200 w-[300px] h-[100px] flex flex-col justify-between">
      <div className="flex items-center">
        <div className="bg-green-100 rounded-full p-2 mr-2">
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>
      <div className="text-left font-semibold">
        {message}
      </div>
      
    </div>
  );
};

export default Toast;
