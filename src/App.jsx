import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Producto from './Pages/Producto';
import Proveedor from './Pages/Proveedor';
import EntradaProducto from './Pages/EntradaProducto';
import SalidaProducto from './Pages/SalidaProducto';
import { ProveedorProvider } from './context/ProveedorContext';
import { ProductProvider } from './context/ProductContext';
import { EntradaProductProvider } from './context/EntradaProdContex';
import { SalidaProductProvider } from './context/SalidaProdContext';


function App() {

  return (
    <ProductProvider>
      <EntradaProductProvider>
        <SalidaProductProvider>
    <ProveedorProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/producto' element={<Producto />}></Route>
          <Route path='/proveedor' element={<Proveedor />}></Route>
          <Route path='/entradaProducto' element={<EntradaProducto />}></Route>
          <Route path='/salidaProducto' element={<SalidaProducto />}></Route>
        </Routes>
      </BrowserRouter>
    </ProveedorProvider>
    </SalidaProductProvider>
    </EntradaProductProvider>
    </ProductProvider>
  )
}

export default App
