import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import { useEntradaProduct } from '../context/EntradaProdContex';
import { useProveedor } from '../context/ProveedorContext';
import { useProduct } from '../context/ProductContext';
import { useCategoria } from '../context/CategoriaContext';
import { useEffect, useState } from 'react';


function EntradaProdForm(/* {entrada} */) {
    const { register, handleSubmit, reset, setValue } = useForm();
    const { createEntradaP, getEntradaP } = useEntradaProduct();


    const {proveedor, getProveedor} = useProveedor();
    const [proveedores, setProveedores] = useState('');

    const {product, getProduct} = useProduct();
    const [productos, setProductos] = useState('');

    const { categoria, getCategoria } = useCategoria();
    const [categories, setCategories] = useState('')

    const submit = async (data) => {
        try {
            console.log(data)
            data.cantidad = parseInt(data.cantidad, 10);
            data.FechaEntrada = new Date(data.FechaEntrada);
            await createEntradaP(data);
            setCategories('');
            setProveedores('');
            setProductos('');
            await getEntradaP();
            reset();
        } catch (error) {
            console.log(error)
        }
    }

    const handleProveedorChange = (event) => {
        setProveedores(event.target.value);
        setValue('IdProveedor', event.target.value)
    }
    const handleProductoChange = (event) => {
        setProductos(event.target.value);
        setValue('IdProducto', event.target.value)
    }
    const handleCategoryChange = (event) => {
        setCategories(event.target.value);
        setValue('IdCategoria', event.target.value)
    }

    useEffect(()=>{
        getProveedor();
        getProduct();
        getCategoria();
    },[])
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
          width: {xs: '100%', md:'500px'},
        }}
        >
          <Typography sx={{
            fontFamily:'revert',
            fontSize: '2em',
            textAlign: 'initial',
            }}>Entrada Productos</Typography>
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel 
                id="proveedor-label">Proveedor</InputLabel>
                <Select
                 {...register('IdProveedor', { required: true })}
                    labelId="proveedor-label"
                    id="IdProveedor"
                    value={proveedores}
                    onChange={handleProveedorChange}
                    label="Proveedor"
                    required
                >
                    {proveedor.map((pro) => (
                        <MenuItem key={pro.IdProveedor} value={pro.IdProveedor}>
                            {pro.Nombre}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel 
                id="producto-label">Producto</InputLabel>
                <Select
                 {...register('IdProducto', { required: true })}
                    labelId="producto-label"
                    id="IdProducto"
                    value={productos}
                    onChange={handleProductoChange}
                    label="Producto"
                    required
                >
                    {product.map((prod) => (
                        <MenuItem key={prod.IdProducto} value={prod.IdProducto}>
                            {prod.Nombre}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel 
                id="categoria-label">Categoria</InputLabel>
                <Select
                 {...register('IdCategoria', { required: true })}
                    labelId="categoria-label"
                    id="IdCategoria"
                    value={categories}
                    onChange={handleCategoryChange}
                    label="categoria"
                    required
                >
                    {categoria.map((cat) => (
                        <MenuItem key={cat.IdCategoria} value={cat.IdCategoria}>
                            {cat.Nombre}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
            {...register('cantidad', { required: true })}
            id='cantidad'
            label='Cantidad'
            type='number'
            variant='outlined'
            fullWidth
            helperText='Ingrese una cantidad válida'
            error={false}
            />
            <TextField
            {...register('FechaEntrada', { required: true })}
            id='FechaEntrada'
            type='date'
            variant='outlined'
            fullWidth
            helperText='Ingrese un Fecha válida'
            error={false}
            />
            <Button
            type='submit'
            variant='outlined'
            sx={{
              mt:2,
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
export default EntradaProdForm