import LayoutClient from "../../components/LayoutClient";
import Jumbotron from "../../components/Jumbotron";
import { H3 } from "../../components/Typo";
import CartItem from "../../feature/cart/components/CartItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { numberFormat } from "../../helper/number_format";

function Cart() {
  const products = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user.email) {
      window.location.href = "/client";
    }
  }, [user]);

  return (
    <LayoutClient>
      <Jumbotron title="Your Shopping Cart" />
      <section className="page_container">
        <div className="py-6 min-h-[450px]">
          {
            products.length > 0 ? (
              <>
                <H3>Shopping Cart List</H3>
                <div
                  className="flex flex-row justify-between my-2 py-2 border-b border-gray-300 font-title text-primaryLight">
                  <div className="flex flex-col">
                    <span className="font-bold" />
                  </div>
                  <div className="sm:flex hidden flex-row space-x-2 gap-2">
                    <span className="font-bold">Quantity</span>
                    <span className="font-bold min-w-[100px]">Subtotal</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {
                    products.map((product) => (
                      <CartItem key={product.id} product={product} />
                    ))
                  }
                  <div className="flex flex-row justify-end mt-6 border-t pt-3">
                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-row justify-between font-title text-primaryLight">
                        <span className="font-bold px-3">Grand Total</span>
                        <span
                          className="font-bold">{numberFormat(products.reduce((a, b) => a + b.product.price * b.quantity, 0))}</span>
                      </div>
                      <Link to="/checkout" className="bg-primaryLight text-white px-4 py-2 rounded text-center font-title font-medium">
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <span className="text-gray-500 text-lg">Your shopping cart is empty</span>
                <Link to="/products" className="bg-primaryLight text-white px-4 py-2 rounded mt-4">
                  Continue Shopping
                </Link>
              </div>
            )
          }
        </div>
      </section>
    </LayoutClient>
  );
}

export default Cart;