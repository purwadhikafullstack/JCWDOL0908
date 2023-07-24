import { useEffect, useState } from "react";
import { getCategories } from "../";

export const useCategoryBody = () => {
  const [isNewCategoryClicked, setNewCategoryClicked] = useState(false);
  const [isDeleteClicked, setDeleteClicked] = useState(false);
  const [isEditClicked, setEditClicked] = useState(false);
  const [singleCategory, setSingleCategory] = useState({});
  const [categories, setCategories] = useState({});
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await getCategories(pageNum);
      await setCategories({ ...response });
    })();
  }, [pageNum]);

  return {
    isNewCategoryClicked,
    setNewCategoryClicked,
    isDeleteClicked,
    setDeleteClicked,
    isEditClicked,
    setEditClicked,
    singleCategory,
    setSingleCategory,
    categories,
    setCategories,
    pageNum,
    setPageNum,
  };
};
