import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import Storage from "./pages/storage/Storage";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddProduct from "./pages/addProduct/AddProduct";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import EditProduct from "./pages/editProduct/EditProduct";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Contact from "./pages/contact/Contact";
import Dashboard from "./pages/dashboard/Dashboard";
import Payments from "./pages/payments/Payments";
import PaymentDetails from "./components/payment/paymentDetails/PaymentDetails";
import EditPayment from "./components/payment/paymentEdit/EditPayment";
import Terms from "./pages/info/Terms";
import Privacy from "./pages/info/Privacy";
import Faq from "./pages/info/Faq";
import AddPayment from "./components/payment/PayForm/AddPayment";
import Cart from "./pages/cart/Cart";
import Transactions from "./pages/transactions/Transactions";
import Clients from "./pages/clients/Clients";
import ClientDetails from "./pages/clients/ClientDetails";
import AddClient from "./pages/clients/AddClient";
import EditClient from "./pages/clients/EditClient";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />
        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/storage"
          element={
            <Sidebar>
              <Layout>
                <Storage />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-product"
          element={
            <Sidebar>
              <Layout>
                <AddProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/payments"
          element={
            <Sidebar>
              <Layout>
                <Payments />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-payment"
          element={
            <Sidebar>
              <Layout>
                <AddPayment />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/payment-details/:id"
          element={
            <Sidebar>
              <Layout>
                <PaymentDetails />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/transactions"
          element={
            <Sidebar>
              <Layout>
                <Transactions />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/cart"
          element={
            <Sidebar>
              <Layout>
                <Cart />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/product-details/:id"
          element={
            <Sidebar>
              <Layout>
                <ProductDetails />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <Sidebar>
              <Layout>
                <EditProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-payment/:id"
          element={
            <Sidebar>
              <Layout>
                <EditPayment />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/clients"
          element={
            <Sidebar>
              <Layout>
                <Clients />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/client-details/:id"
          element={
            <Sidebar>
              <Layout>
                <ClientDetails />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-client"
          element={
            <Sidebar>
              <Layout>
                <AddClient />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-client/:id"
          element={
            <Sidebar>
              <Layout>
                <EditClient />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Sidebar>
              <Layout>
                <Contact />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/terms"
          element={
            <Sidebar>
              <Layout>
                <Terms />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/privacy"
          element={
            <Sidebar>
              <Layout>
                <Privacy />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/faq"
          element={
            <Sidebar>
              <Layout>
                <Faq />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
