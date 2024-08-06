import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import { useProduct } from '../context/ProductContext';
import { useEffect, useState } from 'react';
import { useCategoria } from '../context/CategoriaContext';
import { useProveedor } from '../context/ProveedorContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext';
import { useSnackbar } from '../context/SnackbarContext';


function InventarioForm() {
    const { register, handleSubmit, reset, setValue } = useForm();

    const { getInventario, getInventarioById, createInventario, updateInventario } = useInventario();

    const { product, getProduct } = useProduct();
    const [productos, setProductos] = useState('');

    const { categoria, getCategoria } = useCategoria();
    const [categories, setCategories] = useState('');

    const { proveedor, getProveedor } = useProveedor();
    const [proveedores, setProveedores] = useState('');

    const {id: paramId } = useParams();

    const navigate = useNavigate();
    //Usar la función showSnackbar para mostrar mensaje de actualizar, crear o eliminar.
    const { showSnackbar } = useSnackbar();
    
    const submit = async (data) => {
        try {
            //validar los datos.
            if (paramId) {
                await updateInventario(paramId, data)
                showSnackbar('Actualizado con éxito','success');
            } else {
                await createInventario(data)
                showSnackbar('Creado con éxito','success');
                setProductos('');
                setCategories('');
                setProveedores('');
                await getInventario();
                reset();
            }
            navigate('/inventario')
            
        } catch (error) {
            showSnackbar('No se puede crear el producto, ingrese bien los datos.', 'error');
        }
    }

    /*Función para poder guardar el estado del Producto*/
    const handleProductoChange = (event) => {
        setProductos(event.target.value);
        setValue('IdProducto', event.target.value)
    }

    /*Función para poder guardar el estado de la Categoría*/
    const handleCategoryChange = (event) => {
        setCategories(event.target.value);
        setValue('IdCategoria', event.target.value)
    }

    /*Función para poder guardar el estado del Proveedor*/
    const handleProveedorChange = (event) => {
        setProveedores(event.target.value);
        setValue('IdProveedor', event.target.value)
    }

    /*Función para formatear la fecha a UTC*/
    const formatISODate = (isoDate) => {
        return isoDate.split('T')[0];
    };


    /*Función para cargar los datos del Inventario al editar*/
    useEffect(() => {
        async function cargarDatos() {
            if (paramId) {
                const inventario = await getInventarioById(paramId)
                setValue('IdProducto', inventario.IdProducto)
                setValue('IdCategoria', inventario.IdCategoria)
                setValue('IdProveedor', inventario.IdProveedor)
                setValue('Stock', inventario.StockActual)
                setValue('Fecha', formatISODate(inventario.Fecha))
                setProductos(inventario.IdProducto)
                setCategories(inventario.IdCategoria)
                setProveedores(inventario.IdProveedor)
            }
        }
        cargarDatos()
    }, [])

    useEffect(() => {
        getProduct();
        getCategoria();
        getProveedor();
    }, [])
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
                ml: 0,
                mt: 2,
                padding: 2,
                width: { xs: '100%', md: '500px' },
                height: { xs: '100%', md: '550px' }
            }}
        >
            <Typography sx={{
                fontFamily: 'revert',
                fontSize: '2em',
                textAlign: 'initial',
            }}>Inventario
            </Typography>

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
                    {product.map((pro) => (
                        <MenuItem key={pro.IdProducto} value={pro.IdProducto}>
                            {pro.Nombre}
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
                    label="Categoria"
                    required
                >
                    {categoria.map((cat) => (
                        <MenuItem key={cat.IdCategoria} value={cat.IdCategoria}>
                            {cat.Nombre}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
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
                    sx={{ mb: 2 }}
                >
                    {proveedor.map((pro) => (
                        <MenuItem key={pro.IdProveedor} value={pro.IdProveedor}>
                            {pro.Nombre}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                {...register('Stock', { required: true })}
                id='Stock'
                label='Stock'
                type='number'
                variant='outlined'
                fullWidth
                helperText='Ingrese una cantidad válida'
                error={false}
                sx={{ mb: 2 }}
            />
            <TextField
                {...register('Fecha', { required: true })}
                id='Fecha'
                type='date'
                variant='outlined'
                fullWidth
                helperText='Ingrese un Fecha válida'
                error={false}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0 }}>
                <Button
                    type="submit"
                    variant="outlined"
                    sx={{
                        mt: 1,
                        color: 'white',
                        backgroundColor: 'cornflowerblue',
                        '&:hover': {
                            backgroundColor: 'blueviolet',
                        },
                        borderRadius: '10px',
                    }}
                >
                    Registrar
                </Button>
            </Box>
        </Grid>
    )
}

export default InventarioForm
