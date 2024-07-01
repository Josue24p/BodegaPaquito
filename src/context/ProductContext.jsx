import { createContext, useContext, useState } from "react";
import { getProductoRequest , createProductoRequest  } from '../api/producto';


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
      console.log(res.data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const createProduct = async () => {
    try {
      const res = await createProductoRequest()
      setProduct([...product, res.data]);
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ProductContext.Provider
      value={{
        product,
        getProduct,
        createProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

