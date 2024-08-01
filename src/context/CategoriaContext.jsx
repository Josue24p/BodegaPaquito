import { createContext, useContext, useState } from "react";
import {createCategoriaRequest, deleteCategoriaRequest, getCategoriaByIdRequest, getCategoriaRequest, updateCategoriaRequest} from '../api/categoria';

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
            /* console.log(res.data) */
            return res.data
        } catch(error){
            console.error('Error getting categorias:', error);
        }
    }

    const getCategoriaById = async (id) => {
        try{
            const res = await getCategoriaByIdRequest(id);
            console.log(res.data)
            return res.data
        } catch(error){
            console.error('Error getting categoria:', error);
        }
    }

    const createCategoria = async (categoria) => {
        try {
            const res = await createCategoriaRequest(categoria)
            setCategoria((prevCategoria)=>[...prevCategoria, res.data])
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    const updateCategoria = async (id, categoria) => {
        try {
            const res = await updateCategoriaRequest(id, categoria)
            console.log(res.data)
        } catch (error) {
           console.log(error) 
        }
    }

    const deleteCategoria = async (id) => {
        try {
            const res = await deleteCategoriaRequest(id)
            if(res.status == 204){
                setCategoria(categoria.filter(cat => cat.IdCategoria != id))
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <CategoriaContext.Provider 
        value={{
          categoria,
          getCategoria,
          getCategoriaById,
          createCategoria,
          updateCategoria,
          deleteCategoria,
        }}>
            {children}
        </CategoriaContext.Provider>
    )
}