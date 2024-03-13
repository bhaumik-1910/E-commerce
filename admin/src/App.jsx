import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import LoginSignup from './Components/Login/LoginSignup'
import Adminpage from './Components/Adminpage/Adminpage'
import AddProduct from './Components/AddProduct/AddProduct';
import ListProduct from './Components/ListProduct/ListProduct';
import Sidebar from './Components/Sidebar/Sidebar';
import Protection from './Components/protection';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route path='/' element={<Adminpage />} />
            <Route path='login' element={<LoginSignup />} />

              <Route path="admin" element={<Protection><Sidebar /></Protection>}>
                <Route path="/admin/addproduct" element={<AddProduct />} />
                <Route path="/admin/listproduct" element={<ListProduct />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
