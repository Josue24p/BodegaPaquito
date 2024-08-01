import { createContext, useContext, useState } from "react";
import { createClienteRequest, deleteClienteRequest, getClienteByIdRequest, getClienteRequest, updateClienteRequest } from '../api/cliente';


const ClienteContext = createContext();

export const useCliente = () => {
  const context = useContext(ClienteContext)

  if (!context) {
    throw new Error("useCliente no puede ser usado sin un ClienteProvider");
  }
  return context;
}
export function ClienteProvider({ children }) {

  const [cliente, setCliente] = useState([]);

  const getCliente = async () => {
    try {
      const res = await getClienteRequest()
      setCliente(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getClienteById = async (id) => {
    try {
      const res = await getClienteByIdRequest(id)
      console.log(res.data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const createCliente = async (cliente) => {
    try {
      const res = await createClienteRequest(cliente)
      setCliente((prevClientees)=>[...prevClientees, res.data]);
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const updateCliente = async (id, cliente) => {
    try {
      const res = await updateClienteRequest(id, cliente)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteCliente = async (id) => {
    try {
      const res = await deleteClienteRequest(id)
      if (res.status==204) {
        setCliente(cliente.filter(cliente => cliente.IdCliente != id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ClienteContext.Provider
      value={{
        cliente,
        getCliente,
        getClienteById,
        createCliente,
        updateCliente,
        deleteCliente,
      }}
    >
      {children}
    </ClienteContext.Provider>
  )
}

