import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SingleUserModal from "./all_user/SingleUserModal";
import RenderUsers from "./all_user/RenderUsers";
import AdminPagination from "../../../components/AdminPagination";
import { getAllUserData, getSingleUser } from "../";

function UserMgtUserData() {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);
  const [isModalPop, setIsModalPop] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const [allUserData, setAllUserData] = useState({});

  const dataRender = async () => {
    const data = await dispatch(getAllUserData(pageNum));
    await setAllUserData({ ...data });
    await setTotalPage(data.totalPage);
  };

  useEffect(() => {
    dataRender();
  }, [pageNum]);

  const dataClicked = async (id, isAdmin, idRole) => {
    await dispatch(getSingleUser(id, isAdmin, idRole));
    setIsModalPop(true);
  };

  return (
    <>
      {isModalPop ? <SingleUserModal someFunction={setIsModalPop} /> : null}
      <div className="row-span-6 grid grid-rows-12">
        <div className="row-span-11 grid grid-rows-10 gap-2 lg:gap-2">
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
          <RenderUsers allUserData={allUserData} dataClicked={dataClicked} />
        </div>
        <div className="pagination-container">
          <AdminPagination pageNum={pageNum} setPageNum={setPageNum} totalPage={totalPage} />
        </div>
      </div>
    </>
  );
}

export default UserMgtUserData;
