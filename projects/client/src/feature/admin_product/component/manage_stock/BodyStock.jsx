import React, { useEffect, useState } from "react";
import AdminPagination from "../../../../components/AdminPagination";
import RenderProduct from "./RenderProduct";
import EditModal from "./edit_data/EditModal";
import { getWarehouses } from "../../../admin_warehouse/";
import { getStock } from "../../";
import DeleteModal from "./delete_data/DeleteModal";

function BodyStock(props) {
  const { productsList, totalPage, setPageNum, pageNum, userAdmin, refetchedData } = props;
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

  return (
    <>
      {isEditClicked ? (
        <EditModal
          setEditClicked={setEditClicked}
          warehouses={warehouses}
          productStock={productStock}
          userAdmin={userAdmin}
          singleProduct={singleProduct}
          refetchedData={refetchedData}
        />
      ) : null}
      {isDeleteClicked ? (
        <DeleteModal
          setDeleteClicked={setDeleteClicked}
          warehouses={warehouses}
          productStock={productStock}
          userAdmin={userAdmin}
          singleProduct={singleProduct}
          refetchedData={refetchedData}
        />
      ) : null}
      <div className="row-span-6 grid grid-rows-12">
        <div className="row-span-11 grid grid-rows-10 gap-2 lg:gap-2">
          <div
            className="row-span-1 font-semibold grid lg:grid-cols-5
              grid-cols-6 items-end text-xs pl-2 md:text-sm lg:text-base"
          >
            <p className="col-span-1">name</p>
            <p className="hidden lg:inline lg:col-span-1">weight (kg)</p>
            <p className="col-span-2 text-center lg:text-left lg:col-span-1">stock</p>
            <p className="col-span-2 lg:col-span-1 text-center">booked qty</p>
            <p className="text-right">action</p>
          </div>
          <RenderProduct
            productsList={productsList}
            editBtnHndler={editBtnHndler}
            deleteBtnHandler={deleteBtnHandler}
          />
        </div>
        <div className="pagination-container">
          <AdminPagination setPageNum={setPageNum} pageNum={pageNum} totalPage={totalPage} />
        </div>
      </div>
    </>
  );
}

export default BodyStock;
