import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserData, getSingleUser } from "../../feature/admin/AdminSlice";
import SingleUserModal from "./SingleUserModal";

function UserMgtUserData() {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalPop, setIsModalPop] = useState(false);

  const dataRender = async () => {
    await dispatch(getAllUserData(pageNum));
    setIsLoading(false);
  };

  const dataClicked = async (id, isAdmin, idRole) => {
    await dispatch(getSingleUser(id, isAdmin, idRole));
    setIsModalPop(true);
  };

  useEffect(() => {
    dataRender();
  }, [pageNum]);

  const addPageNum = () => {
    setPageNum(pageNum + 1);
  };

  const minusPageNum = () => {
    setPageNum(pageNum - 1);
  };

  const allUserData = useSelector((state) => state.admin.allUser);
  const cutString = (string) => {
    return string.length > 12 ? string.slice(0, 10) + "..." : string;
  };

  const RenderUserData = () => {
    return allUserData.dataAll.map((data) => {
      return (
        <div
          className="row-span-1 bg-slate-100 px-2 grid
            grid-cols-6 items-center"
          onClick={() => dataClicked(data.id_user, data.is_admin, data.id_role)}
        >
          <p className="col-span-1">{data.id_user}</p>
          <p className="col-span-2">{cutString(data.username)}</p>
          <p className="col-span-2">{cutString(data.email)}</p>
          <p className="col-span-1 text-right">{data.is_admin ? "admin" : "user"}</p>
        </div>
      );
    });
  };

  return (
    <>
      {!isLoading ? (
        <>
          {isModalPop ? <SingleUserModal someFunction={setIsModalPop} /> : null}
          <div className="row-span-6 grid grid-rows-8 text-sm gap-2">
            <div className="row-span-1 grid grid-cols-6 px-2 items-end font-semibold">
              <p className="col-span-1">id</p>
              <p className="col-span-2">name</p>
              <p className="col-span-2">email</p>
              <p className="col-span-1 text-right">role</p>
            </div>
            <div className=" row-span-6 grid grid-rows-8 gap-2">
              <RenderUserData />
            </div>
            <div
              className="items-center row-span-1 py-2 grid grid-cols-7 text-slate-800
    text-lg"
            >
              <div
                className="col-span-1 col-start-3 flex items-center 
      justify-center"
              >
                <button onClick={minusPageNum} disabled={pageNum === 1}>
                  <i className="uil uil-arrow-left hover:cursor-pointer"></i>
                </button>
              </div>
              <div
                className="col-span-1 col-start-4 flex items-center 
      justify-center"
              >
                <p>{pageNum}</p>
              </div>
              <div
                className="col-span-1 col-start-5 flex items-center 
      justify-center"
              >
                <button onClick={addPageNum} disabled={pageNum === allUserData.totalPage}>
                  <i className="uil uil-arrow-right hover:cursor-pointer"></i>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default UserMgtUserData;
