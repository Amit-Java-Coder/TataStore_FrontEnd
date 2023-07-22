import About from './Pages/about';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Index from './Pages';
import Dashboard from './Pages/Users/dashboard';
import Profile from './Pages/Users/profile';
import Services from './Pages/services';
import Cart from './Pages/cart';
import MyNavbar from './Components/Navbar';
import Contact from './Pages/contact';
import { ToastContainer } from 'react-toastify';
import Login from './Pages/login';
import Signup from './Pages/signup';
import Home from './Pages/Users/home';
import UserProvider from './Context/user.provide';
import AdminDashboard from './Pages/Admin/adminDashboard';
import AdminHome from './Pages/Admin/adminHome';
import AdminAddProduct from './Pages/Admin/adminAddProduct';
import AdminOrder from './Pages/Admin/adminOrder';
import AdminViewProducts from './Pages/Admin/adminViewProducts';
import AdminViewCategories from './Pages/Admin/adminViewCategories';
import AdminAddCategories from './Pages/Admin/addminAddCategories';
import AdminViewUsers from './Pages/Admin/adminViewUsers';
import UserStore from './Pages/Users/userStore';
import UserProductView from './Pages/Users/userProductView';
import UserCategoryView from './Pages/Users/userCategoryView';
import UserCategory from './Components/Users/UserCategory';
import CartProvider from './Context/cart.provider';
import Order from './Pages/Users/order';
import UseLoader from './Hooks/useLoader';
import Loading from './Components/Loading';
import HomeProductView from './Pages/homeProductView';
import PriceFilterView from './Pages/Users/priceFilterView';


function App() {

  const loading=UseLoader()
  return (
        <UserProvider>
            <CartProvider>
            <BrowserRouter>
               <ToastContainer position='bottom-center' theme='dark'/>
               <MyNavbar/>
               <Loading show={loading}/>
                       <Routes>
                           <Route path='/' element={<Index/>}/>
                           <Route path='/about' element={<About/>}/>
                           <Route path='/services' element={<Services/>}/>
                           <Route path='/cart' element={<Cart/>}/>
                           <Route path='/login' element={<Login/>}/>
                           <Route path='/signup' element={<Signup/>}/>
                           <Route path='/contact' element={<Contact/>}/>
                           <Route path='/userStore' element={<UserStore/>}/>
                           <Route path='/products/:productId/:categoryId' element={<UserProductView/>}/>
                           <Route path='/category/:categoryId/:categoryTitle' element={<UserCategoryView/>}/>
                           <Route path='/homeview/:productId' element={<HomeProductView/>}/>
                           <Route path='/product/:price1/:price2' element={<PriceFilterView/>}/>

                           <Route path='/users' element={<Dashboard/>}>
                           {/*The follwing routes can only be accessed by User*/}
                                     <Route path='home' element={<Home/>}/>
                                     <Route path='profile/:userId' element={<Profile/>}/>
                                     <Route path='about' element={<About/>}/>
                                     <Route path='order' element={<Order/>}/>
                           </Route>


                           <Route path='/admin' element={<AdminDashboard/>}>
                           {/*The follwing routes can only be accessed by Admin*/}
                                     <Route path='home' element={<AdminHome/>}/>
                                     <Route path='view-products' element={<AdminViewProducts/>}></Route>
                                     <Route path='add-product' element={<AdminAddProduct/>}/>
                                     <Route path='view-categories' element={<AdminViewCategories/>}></Route>
                                     <Route path='add-category' element={<AdminAddCategories/>}></Route>
                                     <Route path='view-users' element={<AdminViewUsers/>}></Route>
                                     <Route path='orders' element={<AdminOrder/>}></Route>
                           </Route>                           
                       </Routes>
            </BrowserRouter>
          </CartProvider>
        </UserProvider>
  );
}

export default App;
