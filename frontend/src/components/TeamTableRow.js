import React, { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiEdit2 } from 'react-icons/fi';
import DeleteConfirmation from './DeleteConfirmation'; // Import the DeleteConfirmation component

const TeamTableRow = ({ member, onDelete, onEdit, onSelect, isSelected }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const displayedTeams = member.teams?.slice(0, 3) || [];
  const remainingTeamsCount = member.teams?.length - 3;

  const getColorClasses = (team) => {
    const colors = [
      'bg-purple-100 text-purple-800',
      'bg-blue-100 text-blue-800',
      'bg-blue-100 text-blue-800',
      'bg-yellow-100 text-yellow-800',
      'bg-indigo-100 text-indigo-700',
    ];
    const color = colors[team.length % colors.length];
    return color;
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    onDelete(member.id);
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleSelect = () => {
    onSelect(member.id);
  };

  const handleEdit = () => {
    onEdit(member);
  };

  return (
    <tr>
      <td className="py-2 px-4 border-b border-gray-200 flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={isSelected}
          onChange={handleSelect}
        />
        <img
          src={member.avatar}
          alt={member.name}
          className="w-8 h-8 rounded-full mr-2"
        />
        <div>
          <div className="text-sm font-medium">{member.name}</div>
          <div className="text-xs text-gray-500">{member.user_name}</div>
        </div>
      </td>
      <td className="py-2 px-4 border-b border-gray-200 text-center">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            member.is_active
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {`${member.is_active ? 'Active' : 'Inactive'}`}
        </span>
      </td>
      <td className="py-2 px-4 border-b border-gray-200 text-left">
        {member.role}
      </td>
      <td className="py-2 px-4 border-b border-gray-200 text-left">
        {member.email}
      </td>
      <td className="py-2 px-4 border-b border-gray-200 flex items-center">
        {displayedTeams.map((team, index) => (
          <span
            key={index}
            className={`text-xs font-semibold mr-2 mb-1 px-2.5 py-1 rounded-full ${getColorClasses(
              team
            )}`}
          >
            {team}
          </span>
        ))}
        {remainingTeamsCount > 0 && (
          <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 mb-1 px-2.5 py-0.5 rounded-full">
            +{remainingTeamsCount}
          </span>
        )}
      </td>
      <td className="py-2 px-4 border-b border-gray-200 text-center">
        <button
          className="text-gray-600 hover:text-gray-800 mr-2"
          onClick={handleDelete}
        >
          <RiDeleteBinLine />
        </button>
        <button className="text-gray-600 hover:text-gray-800" onClick={handleEdit}>
          <FiEdit2 />
        </button>
      </td>

      {showDeleteConfirmation && (
        <td className="py-2 px-4 border-b border-gray-200 text-center">
          <DeleteConfirmation
            isOpen={showDeleteConfirmation}
            onClose={handleCancelDelete}
            onConfirm={handleConfirmDelete}
          />
        </td>
      )}
    </tr>
  );
};

export default TeamTableRow;
