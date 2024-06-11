import React from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Producto from './Pages/Producto';
import Proveedor from './Pages/Proveedor';
import EntradaProducto from './Pages/EntradaProducto';
import SalidaProducto from './Pages/SalidaProducto';


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/inventario' element={<Producto/>}></Route>
        <Route path='/proveedor' element={<Proveedor/>}></Route>
        <Route path='/entrada-producto' element={<EntradaProducto/>}></Route>
        <Route path='/salida-producto' element={<SalidaProducto/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
