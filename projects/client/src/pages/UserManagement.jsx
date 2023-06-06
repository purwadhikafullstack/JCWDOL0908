import React from "react";
import LayoutAdmin from "../components/LayoutAdmin";
import UserMgtUserData from "../components/admin/UserMgtUserData";

function UserManagement() {
  return (
    <LayoutAdmin>
      <div className="grid grid-rows-8 maxvh pt-2 pb-6 px-8 gap-4">
        <div className="w-full text-center row-span-2 grid grid-rows-3 gap-8">
          <h1
            className="font-semibold text-2xl pt-8 row-span-2
          text-slate-800"
          >
            User Management
          </h1>
          <div className="grid grid-cols-2 row-span-1 gap-20">
            <button
              className="py-1 px-1 bg-slate-800 text-white text-xs 
          font-semibold"
            >
              All Data
            </button>
            <button
              className="py-1 px-1 bg-slate-800 text-white text-xs 
          font-semibold"
            >
              Create Admin
            </button>
          </div>
        </div>
        <UserMgtUserData />
      </div>
    </LayoutAdmin>
  );
}

export default UserManagement;
