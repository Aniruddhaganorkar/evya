import React, { useState, useEffect } from 'react';
import TeamTableRow from './TeamTableRow';
import { GoQuestion } from 'react-icons/go';
import { BiDownArrowAlt } from 'react-icons/bi';
import { FaArrowRight , FaArrowLeft } from "react-icons/fa6";

import { useLocation, useNavigate } from 'react-router-dom';
import DeleteConfirmation from './DeleteConfirmation';
import Toast from './Toast';
import EditUserModal from './EditUserModal';


const renderPageNumbers = (currentPage, totalPages, updatePage) => {
  const visiblePages = Math.min(6, totalPages);
  const halfVisiblePages = Math.floor(visiblePages / 2);
  const startIndex = Math.max(
    Math.min(currentPage - halfVisiblePages, totalPages - visiblePages + 1),
    1
  );
  const endIndex = Math.min(startIndex + visiblePages - 1, totalPages);

  return (
    <>
      {startIndex > 1 && <span>...</span>}
      {Array.from({ length: endIndex - startIndex + 1 }, (_, i) => (
        <button
          key={i + startIndex}
          className={`py-1 px-2 rounded-md mr-1 ${currentPage === startIndex + i ? 'bg-purple-100 text-purple-600' : ''}`}
          onClick={() => updatePage(startIndex + i)}
        >
          {startIndex + i}
        </button>
      ))}
      {endIndex < totalPages && <span>...</span>}
    </>
  );
};

const TeamTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [members, setMembers] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalMembers / itemsPerPage);
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const initialPage = parseInt(urlParams.get('page'), 10) || 1;

  useEffect(() => {
    setCurrentPage(Math.min(initialPage, totalPages));
  }, [totalPages, initialPage]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/v1/members?limit=${itemsPerPage}&offset=${(currentPage - 1) * itemsPerPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      console.log(data);
      setMembers(data.members);
      setTotalMembers(data.totalMembers); // Assuming the API returns total number of members
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [currentPage]);

  const updatePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`?page=${pageNumber}`);
  };

  const handleDeleteSelected = () => {
    console.log(91)
    setIsModalOpen(true);
  };
  const handleDeleteMember = async (memberId) => {
    try {
      console.log(95, memberId)
      setLoading(true);
      // Call API to delete the member
      const response = await fetch(`http://localhost:8080/v1/members/${memberId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to delete member');
      // Refetch members after deletion
      fetchMembers();
    } catch (err) {
      setError(err.message);
    }
  };
  const handleConfirmDelete = async (event) => {
    try {
      console.log(95, event);
      // Call API to delete selected members
      const response = await fetch('http://localhost:8080/v1/members', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ members: selectedMembers }),
      });
      if (!response.ok) throw new Error('Failed to delete members');
      setIsModalOpen(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      // Refetch members after deletion
      fetchMembers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = async(updatedUser) => {
    // Assuming members is a state, you would set it here. Adjust as necessary.
    setIsEditModalOpen(false);
    console.log(updatedUser)
    const res = await fetch(`http://localhost:8080/v1/members/${updatedUser.id}/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser)
    });
    setShowToast(true);
    fetchMembers();
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSelectMember = (id) => {
    setSelectedMembers((prevSelectedMembers) => {
      if (prevSelectedMembers.includes(id)) {
        return prevSelectedMembers.filter((memberId) => memberId !== id);
      } else {
        return [...prevSelectedMembers, id];
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex justify-center bg-white border">
      <div className="w-full">
        <div className="flex items-center px-2.5 py-4">
          <h2 className="font-semibold text-xl mr-3">Team Members</h2>
          <p className="bg-gray-100 text-xs rounded-xl">{` ${totalMembers} users `}</p>
          <button
            className="bg-purple-600 text-white py-1 px-3 rounded-md focus:outline-none ml-auto"
            onClick={handleDeleteSelected}
            disabled={selectedMembers.length === 0} // Disable button when no members are selected
          
          >
            Delete selected
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-20 border-b bg-gray-50 text-left">Name</th>
                <th className="py-2 px-4 border-b bg-gray-50 text-center">
                  <div className="flex items-center justify-center">
                    Status <BiDownArrowAlt className="ml-2" />
                  </div>
                </th>
                <th className="py-2 px-4 border-b bg-gray-50 text-left">
                  <div className="flex items-center">
                    Role <GoQuestion className="ml-2" />
                  </div>
                </th>
                <th className="py-2 px-4 border-b bg-gray-50 text-left">Email address</th>
                <th className="py-2 px-4 border-b bg-gray-50 text-left">Teams</th>
                <th className="py-2 px-4 border-b bg-gray-50 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <TeamTableRow
                  key={index}
                  member={member}
                  onDelete={handleDeleteMember}
                  onEdit={handleEditUser}
                  isSelected={selectedMembers.includes(member.id)}
                  onSelect={handleSelectMember}
                />
              ))}
            </tbody>
          </table>
          <div className="p-4 flex justify-between items-center">
            <button
              className="bg-gray-200 py-1 px-2 rounded-md focus:outline-none"
              onClick={() => currentPage > 1 && updatePage(currentPage - 1)}
            >
              <FaArrowLeft className='inline-block mx-2 items-center mr-1'/>Previous
            </button>
            <div className="flex flex-1 items-center justify-center self-center px-14 md:px-5 sm:self-stretch sm:px-4">
              {renderPageNumbers(currentPage, totalPages, updatePage)}
            </div>
            <button
              className="bg-gray-200 py-1 px-2 rounded-md ml-2 focus:outline-none"
              onClick={() => currentPage < totalPages && updatePage(currentPage + 1)}
            >
              <FaArrowRight className='inline-block mx-2 items-center mr-1'/>Next
            </button>
          </div>
        </div>
      </div>
      <DeleteConfirmation isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirmDelete} />
      <Toast message="Users successfully deleted!" isVisible={showToast} onClose={() => setShowToast(false)} />
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default TeamTable;
