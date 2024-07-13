import { Button, FormControl, Grid, InputLabel, Select, TextField, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import { useForm } from 'react-hook-form';
import { useProduct } from '../context/ProductContext';
import { useCategoria } from '../context/CategoriaContext';
import { useEffect, useState } from 'react';


function ProductoForm(/* { product } */) {
    const { register, handleSubmit, reset, setValue } = useForm();
    const { createProduct } = useProduct();
    const { categoria, getCategoria } = useCategoria();
    const [categories, setCategories] = useState('')

    const submit = async (data) => {
        console.log(data)
        try {
            data.stock = parseInt(data.stock, 10); // Convertir a entero
            data.precio = parseFloat(data.precio); // Convertir a flotante
            createProduct(data);
            reset();
            setCategories('')
        } catch (error) {
            console.log(error)
        }
    }

    /* const obtenerCategoria = async () => {
        try {
            let res = await getCategoria();

            console.log(res)
        } catch (error) {
            console.log(error)
        }
    } */

    useEffect(() => {
        getCategoria()
    }, [])


    const handleCategoryChange = (event) => {
        setCategories(event.target.value);
        setValue('idCategoria',event.target.value)
    }

    return (
        <Grid
            component={"form"}
            onSubmit={handleSubmit(submit)}
            sx={{
                /* border: '1px solid green', */
                border: '1px solid #ddd',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                margin: 0,
                ml: 1,
                padding: 2,
                width: { xs: '100%', md: '500px' },
            }}
        >
            <Typography sx={{
                fontFamily: 'revert',
                fontSize: '2em',
                textAlign: 'initial',
            }}>Productos</Typography>
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel 
                id="categoria-label">Categoría</InputLabel>
                <Select
                 {...register('idCategoria', { required: true })}
                    labelId="categoria-label"
                    id="idCategoria"
                    value={categories}
                    onChange={handleCategoryChange}
                    label="Categoría"
                    required
                >
                    {categoria.map((cat) => (
                        <MenuItem key={cat.IdCategoria} value={cat.IdCategoria}>
                            {cat.IdCategoria}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                {...register('nombre', { required: true })}
                id='nombre'
                label='Nombre'
                type='text'
                variant='outlined'
                autoFocus
                fullWidth
                helperText='Ingrese un nombre válido'
                error={false}
            />
            
            <TextField
                {...register('descripcion', { required: true })}
                id='descripcion'
                label='Descripción'
                type='text'
                variant='outlined'
                fullWidth
                helperText='Ingrese un descripcion válido'
                error={false}
            />
            <TextField
                {...register('stock', { required: true })}
                id='stock'
                label='Stock'
                type='number'
                variant='outlined'
                fullWidth
                helperText='Ingrese un stock válido'
                error={false}
            />
            <TextField
                {...register('precio', { required: true })}
                id='precio'
                label='Precio'
                type='number'
                variant='outlined'
                fullWidth
                helperText='Ingrese un precio válido'
                error={false}
            />
            <Button
                type='submit'
                variant='outlined'
                sx={{
                    mt: 2,
                    color: 'white',
                    backgroundColor: 'cornflowerblue',
                    '&:hover': {
                        backgroundColor: 'blueviolet',
                    },
                    borderRadius: '10px',
                }}>Registrarme</Button>
        </Grid>
    )
}
export default ProductoForm