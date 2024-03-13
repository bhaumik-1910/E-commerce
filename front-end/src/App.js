import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import Protection from './Components/proctection';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route path='/' element={<Shop />} />
            <Route path='mens' element={<Protection> <ShopCategory banner={men_banner} category="men" /> </Protection>} />
            <Route path='womens' element={<Protection><ShopCategory banner={women_banner} category="women" /></Protection>} />
            <Route path='kids' element={<Protection><ShopCategory banner={kid_banner} category="kid" /></Protection>} />

            <Route path='product' element={<Product />}>
              <Route path=':productId' element={<Product />} />
            </Route>

            <Route path='cart' element={<Protection><Cart /></Protection>} />
            <Route path='login' element={<LoginSignup />} />
          </Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
