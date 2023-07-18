import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../../../../components/CustomInput";
import CustomSelectFormikHook from "../../../../../components/CustomSelectFormikHook";
import { getCategories, getProducts, getWarehouseWhichProvideProduct } from "../../../../admin_product";
import RenderCategoryOptions from "../../../../admin_product/component/RenderCategoryOptions";
import RenderProductsOption from "./RenderProductsOption";
import RenderWarehouse from "../../../../admin/component/all_admin/edit_data/RenderWarehouse";
import ClosedBtnModal from "../../../../../components/ClosedBtnModal";
import { createNewMutationRequest } from "../../../";
import AddOrDecrease from "./AddorDecrease";
import MaxQty from "./MaxQty";

function AddModal(props) {
  const { setNewRequest, admin, warehouse, fetchingData } = props;
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [fromWarehouse, setFromWarehouse] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [maxQty, setMaxQty] = useState(0);

  const addQty = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const decreaseQty = () => {
    setQuantity((quantity) => quantity - 1);
  };

  const validationSchema = Yup.object().shape({
    created_by: Yup.string().required("required"),
    id_category: Yup.number().required("required"),
    id_product: Yup.number().required("required"),
    from_id_warehouse: Yup.number().required("required"),
    to_id_warehouse: Yup.number().required("required"),
  });

  const formik = useFormik({
    initialValues: {
      created_by: admin.username,
      id_category: "",
      id_product: "",
      from_id_warehouse: "",
      to_id_warehouse: admin.id_warehouse || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      let { from_id_warehouse, to_id_warehouse, id_product } = values;
      from_id_warehouse = parseInt(from_id_warehouse);
      to_id_warehouse = parseInt(to_id_warehouse);
      id_product = parseInt(id_product);
      const id_user = admin?.id_user;
      const dataToSend = { id_user, id_product, quantity, from_id_warehouse, to_id_warehouse };
      console.log(dataToSend);
      const response = await createNewMutationRequest(dataToSend);
      alert(response.message);
      await fetchingData();
      setNewRequest(false);
    },
  });

  useEffect(() => {
    (async () => {
      const response = await getCategories();
      setCategories([...response.categories]);
    })();
  }, []);

  const categoriesChange = async (e) => {
    if (!e.target.value) {
      setProducts([]);
    } else {
      const response = await getProducts("", "", "", e.target.value);
      setProducts([...response?.result?.productsList]);
    }
    setFromWarehouse([]);
    setQuantity(1);
    setMaxQty(0);
  };

  const productsChange = async (e) => {
    if (!e.target.value) {
      setFromWarehouse([]);
    } else {
      const response = await getWarehouseWhichProvideProduct(e.target.value);
      setFromWarehouse([...response.result]);
    }
    setQuantity(1);
    setMaxQty(0);
  };

  const fromWarehouseChange = async (e) => {
    const warehouse_selected = parseInt(e.target.value);
    let filteredWarehouse = [...fromWarehouse].filter((warehouse) => {
      return warehouse.id_warehouse === warehouse_selected;
    });
    if (!filteredWarehouse.length) {
      setQuantity(1);
      setMaxQty(0);
    } else {
      setQuantity(1);
      setMaxQty(filteredWarehouse[0].stock - filteredWarehouse[0].booked_stock);
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <ClosedBtnModal setModal={setNewRequest} />
        <div className="modal-header-container">
          <h1 className="modal-header-text">Product Mutation Request</h1>
          <form className="modal-body-container gap-2" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              name="created_by"
              id="created_by"
              formik={formik}
              label="created by"
              isDisabled={true}
            />
            <CustomSelectFormikHook
              formik={formik}
              label="requester-warehouse"
              name="to_id_warehouse"
              isDisabled={admin?.id_warehouse}
            >
              <RenderWarehouse warehouses={warehouse} />
            </CustomSelectFormikHook>
            <CustomSelectFormikHook
              formik={formik}
              label="category"
              name="id_category"
              additionalFunction={categoriesChange}
            >
              <RenderCategoryOptions categories={categories} />
            </CustomSelectFormikHook>
            <CustomSelectFormikHook
              formik={formik}
              label="product"
              name="id_product"
              additionalFunction={productsChange}
            >
              <RenderProductsOption products={products} />
            </CustomSelectFormikHook>
            <CustomSelectFormikHook
              formik={formik}
              label="requested-warehouse"
              name="from_id_warehouse"
              additionalFunction={fromWarehouseChange}
            >
              <RenderWarehouse warehouses={fromWarehouse} />
            </CustomSelectFormikHook>
            <MaxQty maxQty={maxQty} />
            <AddOrDecrease addQty={addQty} decreaseQty={decreaseQty} qty={quantity} maxQty={maxQty} />
            <div className="grid grid-cols-3 gap-2 text-sm h-8 mt-4">
              <button
                disabled={formik.values.from_id_warehouse === ""}
                type="submit"
                onClick={formik.handleSubmit}
                className="bg-primary text-white h-full disabled:cursor-not-allowed disabled:bg-slate-100
                disabled:text-primaryLight"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
