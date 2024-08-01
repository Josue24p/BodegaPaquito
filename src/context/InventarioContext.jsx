import { createContext, useContext, useState } from "react";
import {getInventarioRequest, createInventarioRequest, getInventarioByIdRequest, updateInventarioRequest, deleteInventarioRequest} from '../api/inventario';

const InventarioContext = createContext();

export const useInventario = () => {
    const context = useContext(InventarioContext)
  
    if (!context) {
      throw new Error("useInventario no puede ser usado sin un InventarioProvider");
    }
    return context;
  }

export function InventarioProvider({ children }){

    const [inventario, setInventario] = useState([]);

    const getInventario = async () => {
        try {
          const res = await getInventarioRequest()
          setInventario(res.data)
          /* console.log(res.data) */
          return res.data
        } catch (error) {
          console.log(error)
        }
      }
    
      const getInventarioById = async (id) => {
        try {
          const res = await getInventarioByIdRequest(id)
          /* console.log(res.data)  */
          return res.data
        } catch (error) {
          console.log(error)
        }
      }

      const createInventario = async (inventario) => {
        try {
          const res = await createInventarioRequest(inventario)
          setInventario((prevInventario)=>[...prevInventario, res.data]);
          /* console.log(res.data) */
        } catch (error) {
          console.log(error)
        }
      }

      const updateInventario = async (id,inventario) => {
        try {
          const res = await updateInventarioRequest(id,inventario)
          console.log(res.data)
        } catch (error) {
          console.log(error)
        }
      }

      const deleteInventario = async (id) => {
        try {
          const res = await deleteInventarioRequest(id)
          if (res.status==204) {
            setInventario(inventario.filter(inv => inv.IdInventario != id))
          }
        } catch (error) {
          console.log(error)
        }
      }
    
      return (
        <InventarioContext.Provider
          value={{
            inventario,
            getInventario,
            getInventarioById,
            createInventario,
            updateInventario,
            deleteInventario
          }}
        >
          {children}
        </InventarioContext.Provider>
      )
}