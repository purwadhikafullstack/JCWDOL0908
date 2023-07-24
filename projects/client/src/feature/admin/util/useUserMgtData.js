import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUserData, getSingleUser } from "../";

export const useUserMgtData = () => {
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

  return {
    pageNum,
    setPageNum,
    isModalPop,
    setIsModalPop,
    totalPage,
    setTotalPage,
    allUserData,
    setAllUserData,
    dataRender,
    dataClicked,
  };
};
