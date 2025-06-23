import { Signup } from "./pages/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Home } from "./pages/Home";
import { AuthProvider } from "./context/Auth";

import { useWishList, WishListProvider } from "./context/WishList";
import { Cart } from "./pages/Cart";
import { AppBar } from "./components/AppBar";
import React from "react";
import { WishList } from "./pages/WishList";
import { CartProvider } from "./context/CartList";
import { Purchase } from "./pages/Purchase";

function App() {
  return (
    <Router>
      <AuthProvider>
        <WishListProvider>
          <CartProvider>
            <Routes>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/signin" element={<Signin />}></Route>

              <Route path="/" element={<Home />}></Route>
              <Route path="/wishlist" element={<WishList />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/purchases" element={<Purchase />}></Route>
            </Routes>
          </CartProvider>
        </WishListProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
