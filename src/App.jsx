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
import { CategoriaProvider } from './context/CategoriaContext';
import ProductoForm from './components/ProductoForm';
import ProveedorForm from './components/ProveedorForm';
import EntradaProdForm from './components/EntradaProdForm';
import SalidaProdForm from './components/SalidaProdForm';
import { ClienteProvider } from './context/ClienteContext';
import { InventarioProvider } from './context/InventarioContext';
import Inventario from './Pages/Inventario';
import InventarioForm from './components/InventarioForm';
import { SnackbarProvider } from './context/SnackbarContext';
import ClienteForm from './components/ClienteForm';
import CategoriaForm from './components/CategoriaForm';
import Cliente from './Pages/Cliente';
import Categoria from './Pages/Categoria';


function App() {

  return (
    <SnackbarProvider>
      <ProductProvider>
        <CategoriaProvider>
          <EntradaProductProvider>
            <SalidaProductProvider>
              <ProveedorProvider>
                <ClienteProvider>
                  <InventarioProvider>
                    <BrowserRouter>
                      <Routes>
                        <Route path='/' element={<Dashboard />}></Route>
                        <Route path='/producto' element={<Producto />}></Route>
                        <Route path='/producto/:id' element={<ProductoForm />}></Route>
                        <Route path='/proveedor' element={<Proveedor />}></Route>
                        <Route path='/proveedor/:id' element={<ProveedorForm />}></Route>
                        <Route path='/entradaProducto' element={<EntradaProducto />}></Route>
                        <Route path='/entradaProducto/:id' element={<EntradaProdForm />}></Route>
                        <Route path='/salidaProducto' element={<SalidaProducto />}></Route>
                        <Route path='/salidaProducto/:id' element={<SalidaProdForm />}></Route>
                        <Route path='/inventario/' element={<Inventario />}></Route>
                        <Route path='/inventario/:id' element={<InventarioForm />}></Route>
                        <Route path='/cliente/' element={<Cliente />}></Route>
                        <Route path='/cliente/:id' element={<ClienteForm />}></Route>
                        <Route path='/categoria/' element={<Categoria />}></Route>
                        <Route path='/categoria/:id' element={<CategoriaForm />}></Route>
                      </Routes>
                    </BrowserRouter>
                  </InventarioProvider>
                </ClienteProvider>
              </ProveedorProvider>
            </SalidaProductProvider>
          </EntradaProductProvider>
        </CategoriaProvider>
      </ProductProvider>
    </SnackbarProvider>
  )
}

export default App
