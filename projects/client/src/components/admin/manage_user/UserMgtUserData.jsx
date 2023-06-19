import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SingleUserModal from "./all_user/SingleUserModal";
import RenderUsers from "./all_user/RenderUsers";
import Pagination from "./all_user/Pagination";
import { getAllUserData, getSingleUser } from "../../../feature/admin";

function UserMgtUserData() {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalPop, setIsModalPop] = useState(false);
  const [allUserData, setAllUserData] = useState({});

  const dataRender = async () => {
    const data = await dispatch(getAllUserData(pageNum));
    await setAllUserData({ ...data });
    setIsLoading(false);
  };

  useEffect(() => {
    dataRender();
  }, [pageNum]);

  const dataClicked = async (id, isAdmin, idRole) => {
    await dispatch(getSingleUser(id, isAdmin, idRole));
    setIsModalPop(true);
  };

  const addPageNum = () => {
    setPageNum(pageNum + 1);
  };

  const minusPageNum = () => {
    setPageNum(pageNum - 1);
  };

  return (
    <>
      {!isLoading ? (
        <>
          {isModalPop ? <SingleUserModal someFunction={setIsModalPop} /> : null}
          <div className="row-span-6 grid grid-rows-8 text-sm gap-2 lg:text-lg">
            <div
              className="row-span-1 grid grid-cols-6 px-2 items-end font-semibold
            lg:font-bold lg:px-11 lg:grid-cols-5"
            >
              <p className="col-span-1">id</p>
              <p className="col-span-2 lg:col-span-1">name</p>
              <p className="col-span-2 lg:col-span-1">email</p>
              <p className="hidden lg:inline lg:col-span-1">phone</p>
              <p className="col-span-1 text-right">role</p>
            </div>
            <div className=" row-span-6 grid grid-rows-8 gap-2">
              <RenderUsers allUserData={allUserData} dataClicked={dataClicked} />
            </div>
            <div
              className="items-center row-span-1 py-2 grid grid-cols-7 text-slate-800
              text-lg lg:grid-cols-11 lg:gap-0 lg:text-lg lg:font-bold"
            >
              <Pagination
                allUserData={allUserData}
                addPageNum={addPageNum}
                minusPageNum={minusPageNum}
                pageNum={pageNum}
              />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default UserMgtUserData;
