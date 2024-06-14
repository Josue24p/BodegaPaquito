import { createContext, useContext, useState } from "react";
import {createProveedorRequest, getProveedorRequest} from '../api/proveedor';


const ProveedorContext = createContext();

export const useProveedor = () => {
    const context = useContext(ProveedorContext)

    if (!context) {
        throw new Error ("useProveedor no puede ser usado sin un ProveedorProvider");
    }
    return context;
}
export function ProveedorProvider({children}) {
    const [proveedor, setProveedor] = useState([]);

    const getProveedor = async () =>{
        try {
          const res = await getProveedorRequest()
          setProveedor(res.data)
        } catch (error) {
          console.log(error)
        }
      }

      const createProveedor = async (provedors) => {
        try {
          const res = await createProveedorRequest(provedors)
          setProveedor([...proveedor,res.data])
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <ProveedorContext.Provider
        value={{
            proveedor,
            getProveedor,
            createProveedor
        }}
    >
      {children}
    </ProveedorContext.Provider>
  )
}

