import React from "react";
import SingleUserModal from "./all_user/SingleUserModal";
import RenderUsers from "./all_user/RenderUsers";
import AdminPagination from "../../../components/AdminPagination";
import { useUserMgtData } from "../util/useUserMgtData";
import NoData from "../../../components/NoData";

function UserMgtUserData() {
  const { pageNum, setPageNum, isModalPop, setIsModalPop, totalPage, allUserData, dataClicked } = useUserMgtData();

  const AllUserDataBody = () => {
    return (
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
    );
  };

  return (
    <>
      {isModalPop ? <SingleUserModal someFunction={setIsModalPop} /> : null}
      <div className="row-span-6 grid grid-rows-12">
        {allUserData?.dataAll?.length > 0 ? (
          <>
            <AllUserDataBody />
            <div className="pagination-container">
              <AdminPagination pageNum={pageNum} setPageNum={setPageNum} totalPage={totalPage} />
            </div>
          </>
        ) : (
          <NoData text="data" />
        )}
      </div>
    </>
  );
}

export default UserMgtUserData;
