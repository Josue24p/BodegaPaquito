import { createContext, useContext, useState } from "react";
import {getEntradaProductRequest, createEntradaProductRequest, getEntradaByIdRequest, updateEntradaProductRequest, deleteEntradaProductRequest} from '../api/entradaProd';

const EntradaProductContext = createContext();

export const useEntradaProduct = () => {
    const context = useContext(EntradaProductContext)
  
    if (!context) {
      throw new Error("useEntradaProduct no puede ser usado sin un EntradaProductProvider");
    }
    return context;
  }

export function EntradaProductProvider({ children }){

    const [entrada, setEntrada] = useState([]);

    const getEntradaP = async () => {
        try {
          const res = await getEntradaProductRequest()
          setEntrada(res.data)
          /* console.log(res.data) */
          return res.data
        } catch (error) {
          console.log(error)
        }
      }
    
      const getEntradaById = async (id) => {
        try {
          const res = await getEntradaByIdRequest(id)
          console.log(res.data) 
          return res.data
        } catch (error) {
          console.log(error)
        }
      }

      const createEntradaP = async (entradaP) => {
        try {
          const res = await createEntradaProductRequest(entradaP)
          setEntrada([...entrada, res.data]);
          console.log(res.data)
        } catch (error) {
          console.log(error)
        }
      }

      const updateEntradaP = async (id,entrada) => {
        try {
          const res = await updateEntradaProductRequest(id,entrada)
          console.log(res.data)
        } catch (error) {
          console.log(error)
        }
      }

      const deleteEntradaP = async (id) => {
        try {
          const res = await deleteEntradaProductRequest(id)
          if (res.status==204) {
            setEntrada(entrada.filter(ent => ent.IdEntrada != id))
          }
        } catch (error) {
          console.log(error)
        }
      }
    
      return (
        <EntradaProductContext.Provider
          value={{
            entrada,
            getEntradaP,
            getEntradaById,
            createEntradaP,
            updateEntradaP,
            deleteEntradaP
          }}
        >
          {children}
        </EntradaProductContext.Provider>
      )
}