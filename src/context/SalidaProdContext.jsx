import { createContext, useContext, useState } from "react";
import {getSalidaProductRequest, createSalidaProdRequest, getSalidaById, updateSalidaProdRequest, deleteSalidaProdRequest} from '../api/salidaProd';

const SalidaProductContext = createContext();

export const useSalidaProduct = () => {
    const context = useContext(SalidaProductContext)
  
    if (!context) {
      throw new Error("useSalidaProduct no puede ser usado sin un SalidaProductProvider");
    }
    return context;
  }

export function SalidaProductProvider({ children }){

    const [salida, setSalida] = useState([]);

    const getSalidaP = async () => {
        try {
          const res = await getSalidaProductRequest()
          setSalida(res.data)
          /* console.log(res.data) */
          return res.data
        } catch (error) {
          console.log(error)
        }
      }
    
    const getSalidaId = async (id) => {
      try {
        const res = await getSalidaById(id)
        console.log(res.data)
        return res.data
      } catch (error) {
        console.log(error)
      }
    }

    const createSalidaP = async (salida) => {
        try {
          const res = await createSalidaProdRequest(salida)
          setSalida((prevSalida)=>[...prevSalida, res.data]);
          console.log(res.data)
        } catch (error) {
          console.log(error)
        }
      }
    
    const updateSalidaP = async (id, salida) => {
      try {
        const res = await updateSalidaProdRequest(id, salida)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    
    const deleteSalidaP = async (id) => {
      try {
        const res = await deleteSalidaProdRequest(id)
        if (res.status === 204){
          setSalida(salida.filter(sal => sal.IdSalida !== id))
        }
      } catch (error) {
        console.log(error)
      }
    }
      return (
        <SalidaProductContext.Provider
          value={{
            salida,
            getSalidaP,
            getSalidaId,
            createSalidaP,
            updateSalidaP,
            deleteSalidaP
          }}
        >
          {children}
        </SalidaProductContext.Provider>
      )
}