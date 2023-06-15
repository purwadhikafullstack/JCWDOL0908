import { SectionTitle } from "../../../components/Typo";
import Meja from "../../../images/categories/meja-kerja.jpg";
import { useState } from "react";

const CategoryItem = ({ name, img, anchor }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
    className={`flex flex-col items-center justify-center gap-3 cursor-pointer pb-5 ${isHover ? "bg-white rounded-b-lg shadow-sm transition-colors duration-300" : ""}`}
    onMouseEnter={() => setIsHover(true)}
    onMouseLeave={() => setIsHover(false)}
  >
    <div className="image">
      <img src={img} alt={name} className={`${isHover ? "rounded-t-lg" : "rounded-lg"}`} />
    </div>
    <div className="text-center font-title">{name}</div>
  </div>
  
  );
};

function CategoryExplore() {
  return (
    <section className="py-8 bg-gray-100">
      <div className="page_container">
        <div className="text-center">
          <SectionTitle>Explore by Category</SectionTitle>
        </div>
        <div className="grid gap-5 sm:grid-cols-4 grid-cols-2">
          <CategoryItem name="Meja Kerja" img={Meja} anchor="/" />
          <CategoryItem name="Meja Kerja" img={Meja} anchor="/" />
          <CategoryItem name="Meja Kerja" img={Meja} anchor="/" />
          <CategoryItem name="Meja Kerja" img={Meja} anchor="/" />
          <CategoryItem name="Meja Kerja" img={Meja} anchor="/" />
          <CategoryItem name="Meja Kerja" img={Meja} anchor="/" />
          <CategoryItem name="Meja Kerja" img={Meja} anchor="/" />
          <CategoryItem name="Meja Kerja" img={Meja} anchor="/" />
        </div>
      </div>
    </section>
  );
}

export default CategoryExplore;
