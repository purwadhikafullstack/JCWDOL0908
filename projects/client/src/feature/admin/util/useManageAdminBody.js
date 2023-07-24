import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdmin, getSingleWarehouseAdmin, getWarehouseCities } from "../";

export const useManageAdminBody = (page) => {
  const dispatch = useDispatch();
  const [editClicked, setEditClicked] = useState(false);
  const [deletedClicked, setDeleteClicked] = useState(false);
  const [warehouseCities, setWarehouseCities] = useState([]);
  const [addNewAdminClicked, setNewAdminClicked] = useState(false);

  const editBtnHndler = async (id) => {
    await dispatch(getSingleWarehouseAdmin(id));
    setEditClicked(true);
  };

  const getDataWarehouseCities = async () => {
    const data = await getWarehouseCities();
    setWarehouseCities([...data]);
  };

  useEffect(() => {
    (async () => {
      await dispatch(getAllAdmin(page));
    })();
  }, [page]);

  useEffect(() => {
    getDataWarehouseCities();
  }, []);

  useEffect(() => {
    getDataWarehouseCities();
  }, [editClicked]);

  const allAdmin = useSelector((state) => state.admin.allAdmin);

  return {
    editClicked,
    setEditClicked,
    deletedClicked,
    setDeleteClicked,
    warehouseCities,
    setWarehouseCities,
    addNewAdminClicked,
    setNewAdminClicked,
    editBtnHndler,
    getDataWarehouseCities,
    allAdmin,
  };
};
