import React from 'react'
import TeamTable from '../components/TeamTable';

const Member = () => {
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className=" mx-12" >
            <h1 className="text-2xl font-semibold mb-4 ">Team Settings</h1>
            <TeamTable/>
            </div>
        </div>
      );
}

export default Member
