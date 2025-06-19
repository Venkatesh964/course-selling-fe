import React from "react";
import { AppBar } from "../components/AppBar";
import { useCart } from "../context/CartList";

export const Cart = () => {
  //@ts-ignore
  const { cart } = useCart();
  return (
    <div>
      <AppBar />
      <section className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold py-3">Shopping Cart</h1>

        <div>
          <div className="grid grid-cols-5 gap-16">
            <div className="col-span-4">
              <p className="font-semibold border-b border-slate-300 py-2">
                Course in cart
              </p>
              <div>
                {cart.map((item: any) => (
                  <div className="flex justify-between border-b border-slate-300 py-2">
                    <div className="flex gap-4">
                      <div className="py-2">
                        <img src={item.imageUrl} height={60} width={100} />
                      </div>
                      <div>
                        <div className="font-semibold py-1">{item.title}</div>
                        <div className="pb-1">
                          {" "}
                          by {item.author || "Nassar hussain"}
                        </div>
                        <div className="text-sm text-gray-600 pb-2">
                          7.5 total hours . 54 lectures . Intermediate
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-8">
                      <div className="flex flex-col gap-2">
                        <div className="text-right">Remove</div>
                        <div className="text-right">Move to Wishlist</div>
                      </div>
                      <div>
                        <div>{item.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-1 py-2">
              <div className="py-2 font-semibold text-gray-600">Total: </div>
              <div className="font-bold text-3xl py-1">₹1,437</div>
              <div className="text-gray-700 line-through py-1">₹9,257</div>
              <div className="pb-4">84% off</div>
              <button className="px-4 py-2 border border-slate-200 bg-violet-600 text-white rounded-md font-semibold cursor-pointer hover:bg-violet-400">
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
