import LayoutClient from "../../components/LayoutClient";
import Jumbotron from "../../components/Jumbotron";
import { useEffect, useState } from "react";
import FilterSort from "../../feature/products/components/FilterSort";
import FilterWrapper from "../../feature/products/components/FilterWrapper";
import { ListProducts } from "../../feature/products";
import ProductItem from "../../feature/products/components/ProductItem";
import Pagination from "../../components/Pagination";

function Products() {
  const [products, setProducts] = useState({});
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    price: [0, 999999999],
    category: [],
  });
  const [sort, setSort] = useState({
    type: "default",
    value: "",
  });

  const query = {
    page: page,
    price_min: filter.price[0],
    price_max: filter.price[1],
    sort_key: sort.type,
    sort_condition: sort.value,
    page_size: 12,
    id_category: filter.category,
  };

  const fetchProducts = async () => {
    try {
      const response = await ListProducts(query);
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchProducts();
    })();
  }, [page, sort]);

  const { products: data, metadata } = products;

  return (
    <LayoutClient>
      <Jumbotron title="A Collection of Furniture.co" />
      <section className="py-6">
        <div className="page_container flex flex-col">
          {/* filter */}
          <div className="w-full flex flex-row gap-2">
            <FilterSort sort={sort} setSort={setSort} />
            <FilterWrapper filter={filter} setFilter={setFilter} />
          </div>
          {/* list */}
          {data ? (
            <>
              <div className="grid sm:grid-cols-4 grid-cols-2 gap-5 py-6">
                {
                  data?.map((product) => {
                    return (
                      <ProductItem
                        key={product.id_product}
                        product_name={product.product_name}
                        category_name={product.category.category_name}
                        price={product.price}
                        product_image={product.product_image}
                        id_product={product.id_product}
                        stock={product.stock}
                      />
                    );
                  })
                }
              </div>
              {metadata.total_page > 1 && (<Pagination metadata={metadata} page={page} setPage={setPage} />)}
            </>
          ) : (
            <div className="flex justify-center items-center h-96">
              <p className="text-2xl font-semibold">No Products</p>
            </div>
          )}
        </div>
      </section>
    </LayoutClient>
  );
}

export default Products;