import { useEffect, useState } from "react";
import { getStock } from "../";
import { getWarehouses } from "../../admin_warehouse";

export const useStockBody = (userAdmin) => {
  const [warehouses, setWarehouses] = useState([]);
  const [singleProduct, setProduct] = useState({});
  const [isEditClicked, setEditClicked] = useState(false);
  const [isDeleteClicked, setDeleteClicked] = useState(false);
  const [productStock, setProductStock] = useState({});

  const editBtnHndler = async (product) => {
    const response = await getStock(product.id_product, userAdmin?.id_warehouse);
    setProductStock({ ...response?.result });
    setProduct({ ...product });
    setEditClicked(true);
  };

  const deleteBtnHandler = async (product) => {
    const response = await getStock(product.id_product, userAdmin?.id_warehouse);
    setProductStock({ ...response?.result });
    setProduct({ ...product });
    setDeleteClicked(true);
  };

  useEffect(() => {
    (async () => {
      const response = await getWarehouses();
      setWarehouses([...response?.result]);
    })();
  }, []);

  return {
    warehouses,
    setWarehouses,
    singleProduct,
    setProduct,
    isEditClicked,
    setEditClicked,
    isDeleteClicked,
    setDeleteClicked,
    productStock,
    setProductStock,
    editBtnHndler,
    deleteBtnHandler,
  };
};
