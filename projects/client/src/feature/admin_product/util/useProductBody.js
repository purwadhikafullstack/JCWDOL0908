import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, getProducts } from "../";

export const useProductBody = (admin) => {
  const [totalPage, setTotalPate] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [isNewProductClicked, setNewProductClicked] = useState(false);
  const [isEditClicked, setEditClicked] = useState(false);
  const [isDeleteClicked, setDeleteClicked] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [singleProduct, setSingleProduct] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const OFFSET = 4;
  const LIMIT = 4;

  useEffect(() => {
    (async () => {
      const response = await getCategories();
      setCategories([...response.categories]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getProducts(OFFSET, LIMIT, pageNum, selectedCategory);
      setProducts([...response.result.productsList]);
      setTotalPate(response.result.totalPage);
    })();
  }, [pageNum]);

  useEffect(() => {
    (async () => {
      const response = await getProducts(OFFSET, LIMIT, 1, selectedCategory);
      setProducts([...response.result.productsList]);
      setTotalPate(response.result.totalPage);
      setPageNum(1);
    })();
  }, [selectedCategory]);

  const filterOnChangeHandle = async (event) => {
    const id_category = parseInt(event.target.value);
    setSelectedCategory(id_category);
  };

  const refetchedData = async () => {
    const fetchedData = await getProducts(OFFSET, LIMIT, pageNum, selectedCategory);
    setProducts([...fetchedData.result.productsList]);
    setTotalPate(fetchedData.result.totalPage);
  };

  const isItNotSuperAdmin = () => {
    return admin?.role_admin !== "super-admin";
  };

  return {
    totalPage,
    setTotalPate,
    pageNum,
    setPageNum,
    isNewProductClicked,
    setNewProductClicked,
    isEditClicked,
    setEditClicked,
    isDeleteClicked,
    setDeleteClicked,
    categories,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    singleProduct,
    setSingleProduct,
    products,
    setProducts,
    navigate,
    isItNotSuperAdmin,
    filterOnChangeHandle,
    refetchedData,
  };
};
