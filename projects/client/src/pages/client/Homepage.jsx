import LayoutClient from "../../components/LayoutClient";
import Carousel from "../../components/Carousel";
import CategoryExplore from "../../feature/homepage/components/CategoryExplore";

function Homepage() {
  return (
    <LayoutClient>
      <div className="page__container_fluid overflow-hidden">
        <Carousel />
      </div>
      <CategoryExplore />
    </LayoutClient>
  );
}

export default Homepage;
