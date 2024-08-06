import { createContext, useContext, useState } from "react";
import { createProveedorRequest, deleteProveedorRequest, getProveedorByIdRequest, getProveedorRequest, updateProveedorRequest } from '../api/proveedor';


const ProveedorContext = createContext();

export const useProveedor = () => {
  const context = useContext(ProveedorContext)

  if (!context) {
    throw new Error("useProveedor no puede ser usado sin un ProveedorProvider");
  }
  return context;
}
export function ProveedorProvider({ children }) {

  const [proveedor, setProveedor] = useState([]);

  const getProveedor = async () => {
    try {
      const res = await getProveedorRequest()
      setProveedor(res.data)
      return res
    } catch (error) {
      console.log(error)
    }
  }

  const getProveedorById = async (id) => {
    try {
      const res = await getProveedorByIdRequest(id)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const createProveedor = async (provedors) => {
    try {
      const res = await createProveedorRequest(provedors)
      setProveedor((prevProveedores)=>[...prevProveedores, res.data]);
      return res
    } catch (error) {
      console.log(error)
    }
  }

  const updateProveedor = async (id, proveedors) => {
    try {
      const res = await updateProveedorRequest(id, proveedors)
      return res
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProveedor = async (id) => {
    try {
      const res = await deleteProveedorRequest(id)
      if (res.status==204) {
        setProveedor(proveedor.filter(proveedor => proveedor.IdProveedor != id))
      }
      return res
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ProveedorContext.Provider
      value={{
        proveedor,
        getProveedor,
        getProveedorById,
        createProveedor,
        updateProveedor,
        deleteProveedor,
      }}
    >
      {children}
    </ProveedorContext.Provider>
  )
}

