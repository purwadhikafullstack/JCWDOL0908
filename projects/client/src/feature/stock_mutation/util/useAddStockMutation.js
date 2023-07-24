import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getCategories, getProducts, getWarehouseWhichProvideProduct } from "../../admin_product";
import { createNewMutationRequest } from "../";

export const useAddStockMutation = (setNewRequest, admin, fetchingData) => {
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
      const warehouses = [...response.result].filter((warehouse) => {
        return warehouse.id_warehouse !== parseInt(formik.values.to_id_warehouse);
      });
      setFromWarehouse([...warehouses]);
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

  return {
    categories,
    setCategories,
    products,
    setProducts,
    fromWarehouse,
    setFromWarehouse,
    quantity,
    setQuantity,
    maxQty,
    setMaxQty,
    addQty,
    decreaseQty,
    formik,
    categoriesChange,
    productsChange,
    fromWarehouseChange,
  };
};
