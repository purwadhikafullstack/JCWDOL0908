import LayoutClient from "../../components/LayoutClient";
import Jumbotron from "../../components/Jumbotron";
import { useEffect, useState } from "react";
import FilterSort from "../../feature/products/components/FilterSort";
import FilterWrapper from "../../feature/products/components/FilterWrapper";
import { ListProducts } from "../../feature/products";
import ProductItem from "../../feature/products/components/ProductItem";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";

function Products() {
  const [search, setSearch] = useSearchParams();
  const [products, setProducts] = useState({});
  const [page, setPage] = useState(search.get("page") || 1);
  const [filter, setFilter] = useState({
    price: [0, 999999999],
    category: [],
  });
  const [sort, setSort] = useState({
    type: search.get("sort_key") || "default",
    value: search.get("sort_condition") || "",
  });

  // TODO : useSearchParams() to get query params | page, price_min, price_max, \
  useEffect(() => {
    setSearch((searchParams) => {
      searchParams.set("sort_key", sort.type);
      searchParams.set("sort_condition", sort.value);
      return searchParams;
    })
  }, [sort]);

  useEffect(() => {
    setSearch((searchParams) => {
      searchParams.set("page", page);
      return searchParams;
    })

  }, [page])

  useEffect(() => {
    setSearch((searchParams) => {
      searchParams.set("price_min", filter.price[0]);
      searchParams.set("price_max", filter.price[1]);
      return searchParams;
    })
  }, [filter.price])





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
  }, [page, sort, filter]);

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
            {filter.category.length > 0 && (
              <div className="flex flex-row items-center gap-2 border px-2 py-1 rounded-md">
                <p className="">On Filter: {filter.category.length} Category</p>
                <button
                  className="bg-red-500 px-1 rounded-md"
                  onClick={() => setFilter({ ...filter, category: [] })}
                >
                  <i className="uil uil-times text-white"></i>
                </button>
              </div>
            )}

            {
              filter.price[0] > 0 || filter.price[1] !== 999999999 ? (
                <div className="flex flex-row items-center gap-2 border px-2 py-1 rounded-md">
                  <p className="">On Filter: Price {filter.price[0]} - {filter.price[1]}</p>
                  <button
                    className="bg-red-500 px-1 rounded-md"
                    onClick={() => setFilter({ ...filter, price: [0, 999999999] })}
                  >
                    <i className="uil uil-times text-white"></i>
                  </button>
                </div>
              ) : null
            }


          </div>
          {/* list */}
          {data?.length > 0 ? (
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