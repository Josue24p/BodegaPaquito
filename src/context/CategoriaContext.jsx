import { createContext, useContext, useState } from "react";
import {getCategoriaRequest} from '../api/categoria';

const CategoriaContext = createContext();

export const useCategoria = () => {
    const context = useContext(CategoriaContext)

    if(!context){
        throw new Error('useContext must be used inside a CategoriaProvider')
    }
    return context;
}

export function CategoriaProvider({children}){
    const [categoria, setCategoria] = useState([]);

    const getCategoria = async () => {
        try{
            const res = await getCategoriaRequest();
            setCategoria(res.data);
            console.log(res.data)
            return res.data
        } catch(error){
            console.error('Error getting categorias:', error);
        }
    }

    return (
        <CategoriaContext.Provider value={{ categoria, getCategoria }}>
            {children}
        </CategoriaContext.Provider>
    )
}