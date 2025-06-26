
// import Sidebar from "./layouts/Sidebar";
// import Header from "./components/Header";
// import Dashboard from "./pages/Dashboard";
// import Orders from "./pages/Orders";
// import Customers from "./pages/Customers";
// import NotFound from "./pages/NotFound";
// import Error400 from "./pages/Error400";
// import Error401 from "./pages/Error401";
// import Error403 from "./pages/Error403";
// import FormAddCustomer from "./components/FormAddCustomer";
// import FormAddOrder from "./components/FormAddOrder";
// import MainLayout from "./layouts/MainLayout";
// import AuthLayout from "./layouts/AuthLayout";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Forgot from "./pages/auth/Forgot";
// import Loading from "./components/Loading";

// Lazy load the Dashboard component

// const Dashboard = React.lazy(() => import("./pages/Dashboard"));
// const Orders = React.lazy(() => import("./pages/Orders"));
// const Customers = React.lazy(() => import("./pages/Customers"));

// const Error400 = React.lazy(() => import("./pages/Error400"));
// const Error401 = React.lazy(() => import("./pages/Error401"));
// const Error403 = React.lazy(() => import("./pages/Error403"));
// const FormAddCustomer = React.lazy(() =>
//   import("./components/FormAddCustomer")
// );
// const Users = React.lazy(() => import("./pages/Users"));
// const FormAddOrder = React.lazy(() => import("./components/FormAddOrder"));
// const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import AdminLayout from "./layouts/AdminLayout";
import Kontak from "./pages/Guest/Kontak";
import FormPemesanan from "./pages/Guest/FormPemesanan";
// import Homepage from "./pages/Guest/Homepage";
// import LayananGuest from "./pages/Guest/LayananGuest";



const Homepage = React.lazy(() => import("./pages/Guest/Homepage"));
const LayananGuest = React.lazy(() => import("./pages/Guest/LayananGuest"));
const LayananTampil = React.lazy(() => import("./pages/Admin/LayananTampil"));
const TambahLayanan = React.lazy(() => import("./pages/Admin/TambahLayanan"));
const EditLayanan = React.lazy(() => import("./pages/Admin/EditLayana"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Admin/Login"));
const Register = React.lazy(() => import("./pages/auth/Admin/Register"));
const Loading = React.lazy(() => import("./components/Loading"));
const ListPelanggan = React.lazy(() => import("./pages/Admin/ListPelanggan"));
const Dashboard = React.lazy(() => import("./pages/Admin/Dashboard"))
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<GuestLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/layanan" element={<LayananGuest/>} />
          <Route path="/form" element={<FormPemesanan/>} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/layanantampil" element={<LayananTampil/>} /> 
          <Route path="/tambahlayanan" element={<TambahLayanan/>} />
          <Route path="/listpelanggan" element={<ListPelanggan/>} />
          <Route path="/edit/:id" element={<EditLayanan/>} />  
          <Route path="/dashboard" element={<Dashboard/>} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
