import { createContext, useContext, useState } from "react";
import { getProductoRequest , createProductoRequest, updateProductoRequest, deleteProductoRequest, getProductByIdRequest } from '../api/producto';


const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext)

  if (!context) {
    throw new Error("useProduct no puede ser usado sin un ProductProvider");
  }
  return context;
}
export function ProductProvider({ children }) {

  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    try {
      const res = await getProductoRequest()
      setProduct(res.data)
      /* console.log(res.data) */
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const getProductoById = async (id) => {
    try {
      const res = await getProductByIdRequest(id)
      console.log(res.data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }
  const createProduct = async (producto) => {
    try {
      const res = await createProductoRequest(producto)
      setProduct((prevProducts)=>[...prevProducts, res.data]);
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const updateProduct = async (id, producto) => {
    try {
      const res = await updateProductoRequest(id, producto)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProducto = async (id) => {
    try {
      const res = await deleteProductoRequest(id)
      if (res.status==204) {
        setProduct(product.filter(pro => pro.IdProducto != id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ProductContext.Provider
      value={{
        product,
        getProduct,
        getProductoById,
        createProduct,
        updateProduct,
        deleteProducto
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

