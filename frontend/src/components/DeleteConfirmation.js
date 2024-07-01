import React, { useState, useEffect } from 'react';

const DeleteConfirmation = ({ isOpen, onClose, onConfirm }) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
  }, [showToast, isOpen]);

  const handleConfirm = () => {
    setShowToast(true);

    onConfirm();
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Hide toast after 3 seconds
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-[400px] h-[176px] p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Are you sure you want to delete selected users?</h2>
          <div className="flex space-x-4">
            <button className="w-full py-2 bg-gray-200 text-gray-800 rounded-md" onClick={onClose}>
              Cancel
            </button>
            <button className="w-full py-2 bg-purple-600 text-white rounded-md" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmation;
