import { Signup } from "./pages/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Home } from "./pages/Home";
import { AuthProvider } from "./context/Auth";
import { WishList } from "./components/WishList";
import { WishListProvider } from "./context/WishList";

function App() {
  return (
    <Router>
      <AuthProvider>
        <WishListProvider>
          <Routes>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/wishlist" element={<WishList />}></Route>
          </Routes>
        </WishListProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
