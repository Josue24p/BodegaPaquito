import { createContext, useContext, useState } from "react";
import {getSalidaProductRequest, createSalidaProdRequest} from '../api/salidaProd';

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
          console.log(res.data)
          return res.data
        } catch (error) {
          console.log(error)
        }
      }
    
      const createSalidaP = async () => {
        try {
          const res = await createSalidaProdRequest()
          setSalida([...salida, res.data]);
          console.log(res.data)
        } catch (error) {
          console.log(error)
        }
      }
    
      return (
        <SalidaProductContext.Provider
          value={{
            salida,
            getSalidaP,
            createSalidaP
          }}
        >
          {children}
        </SalidaProductContext.Provider>
      )
}