import { SectionTitle } from "../../../components/Typo";
import Meja from "../../../images/categories/meja-kerja.jpg";
import { useEffect, useState } from "react";
import { ToastError } from "../../../helper/Toastify";
import { getCategories } from "../../categories/api/getCategories";
import { Link } from "react-router-dom";

const CategoryItem = ({ name, img, anchor }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <Link to={anchor} className="relative">
      <div
        className={`flex flex-col items-center justify-center gap-3 cursor-pointer pb-5 ${isHover ? "bg-white rounded-b-lg shadow-sm transition-colors duration-300" : ""}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="w-full h-32 overflow-hidden rounded-lg">
          <img src={img} alt={name} className={`object-cover w-full h-full ${isHover ? "rounded-t-lg" : "rounded-lg"}`} />
        </div>
        <div className="text-center font-title">{name}</div>
      </div>
    </Link>
  );
};

function CategoryExplore() {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const res = await getCategories(8, 0,1);
      setCategories(res.data.result.categories);
    } catch (error) {
      ToastError(error.message || "Failed to fetch categories");
    }
  };

  useEffect(() => {
    (async () => {
      await fetchCategories();
    })();
  }, []);


  return (
    <section className="py-8 bg-gray-100">
      <div className="page_container">
        <div className="text-center">
          <SectionTitle>Explore by Category</SectionTitle>
        </div>
        <div className="grid gap-5 sm:grid-cols-4 grid-cols-2">
          {
            categories.map((category, index) => {
              const img = category.category_image ? process.env.REACT_APP_SERVER_URL + category.category_image : Meja;
              return (
                <CategoryItem name={category.category_name} img={img} anchor={`/products?categories=${category.id_category}`} key={index} />
              )
            })
          }
        </div>
      </div>
    </section>
  );
}

export default CategoryExplore;
