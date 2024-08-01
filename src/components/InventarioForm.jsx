import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import { useProduct } from '../context/ProductContext';
import { useEffect, useState } from 'react';
import { useCategoria } from '../context/CategoriaContext';
import { useProveedor } from '../context/ProveedorContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext';


function InventarioForm() {
    const { register, handleSubmit, reset, setValue } = useForm();

    const { getInventario, getInventarioById, createInventario, updateInventario } = useInventario();

    const { product, getProduct } = useProduct();
    const [productos, setProductos] = useState('');

    const { categoria, getCategoria } = useCategoria();
    const [categories, setCategories] = useState('');

    const { proveedor, getProveedor } = useProveedor();
    const [proveedores, setProveedores] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    /*Agregar mensaje de confirmación que se creo el registro*/
    /*snackbarOpen será para poder mostrar el mensaje, setSnackbarOpen maneja el estado
    del mensaje, si es true se muestra, si es false se quita*/
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    /*Estado para poder almacenar el mensaje a mostrar*/
    const [snackbarMessage, setSnackbarMessage] = useState('');

    /*Estado para guardar el tipo de mensaje si es success o error, entre otros.*/
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    
    const submit = async (data) => {

        try {
            //validar los datos
            if (params.id) {
                await updateInventario(params.id, data)
                setSnackbarMessage('Actualizado con éxito');
                setSnackbarSeverity('success');
            } else {
                await createInventario(data)
                setSnackbarMessage('Creado con éxito');
                setSnackbarSeverity('success');
                setProductos('');
                setCategories('');
                setProveedores('');
                await getInventario();
                reset();
            }
            setSnackbarOpen(true);
            navigate('/inventario');
        } catch (error) {
            setSnackbarMessage(`No se puede crear el producto, ingrese bien los datos.`);
            setSnackbarSeverity('error');
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
            if (params.id) {
                const inventario = await getInventarioById(params.id)
                console.log(inventario)
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
                ml: 1,
                mt: 4,
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
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Grid>
    )
}

export default InventarioForm
