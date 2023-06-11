import React, { useEffect, useState } from "react";
import LayoutAdmin from "../components/LayoutAdmin";
import UserMgtUserData from "../components/admin/manage_user/UserMgtUserData";
import ManageAdmin from "../components/admin/manage_user/ManageAdmin";
import { useDispatch } from "react-redux";
import { getAllAdmin } from "../feature/admin/AdminSlice";

function UserManagement() {
  const [allDataBtnClicked, setAllDataBtnClicked] = useState(true);
  const [mngAdminBtnClicked, setMngAdminBtnClicked] = useState(false);
  const [adminPageNum, setAdminPageNum] = useState(1);
  const dispatch = useDispatch();

  const getData = async () => {
    await dispatch(getAllAdmin(adminPageNum));
  };

  useEffect(() => {
    getData();
  }, []);

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
              className="py-1 px-1 bg-slate-800 text-white text-sm 
          font-semibold hover:bg-slate-900 disabled:bg-slate-100 disabled:text-slate-400"
              disabled={allDataBtnClicked}
              onClick={() => {
                setMngAdminBtnClicked(false);
                setAllDataBtnClicked(true);
              }}
            >
              All User
            </button>
            <button
              className="py-1 px-1 bg-white text-slate-800 text-sm 
            font-semibold border-slate-800 border-2 hover:bg-slate-950 
           hover:text-white disabled:bg-slate-100 disabled:text-slate-400
            disabled:border-slate-400"
              disabled={mngAdminBtnClicked}
              onClick={() => {
                setMngAdminBtnClicked(true);
                setAllDataBtnClicked(false);
              }}
            >
              Manage Admin
            </button>
          </div>
        </div>
        {allDataBtnClicked ? <UserMgtUserData /> : <ManageAdmin page={adminPageNum} setPage={setAdminPageNum} />}
      </div>
    </LayoutAdmin>
  );
}

export default UserManagement;
