import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import { useEntradaProduct } from '../context/EntradaProdContex';
import { useProveedor } from '../context/ProveedorContext';
import { useProduct } from '../context/ProductContext';
import { useCategoria } from '../context/CategoriaContext';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


function EntradaProdForm(/* {entrada} */) {
    const { register, handleSubmit, reset, setValue } = useForm();
    const { createEntradaP, getEntradaP, updateEntradaP, getEntradaById } = useEntradaProduct();


    const { proveedor, getProveedor } = useProveedor();
    const [proveedores, setProveedores] = useState('');

    const { product, getProduct } = useProduct();
    const [productos, setProductos] = useState('');

    const { categoria, getCategoria } = useCategoria();
    const [categories, setCategories] = useState('')

    const params = useParams()
    const navigate = useNavigate()

    /*Función de confirmar el registro, la funcionalidad se basa en traer la data
        como parametro. Primero se parsea la cantidad a int, luego se valida una 
        condicional, si se recibe un parametro id, quiere decir, si 
        se edita una entrada de producto especifico, se ejecuta la función de actualizar,
        en caso no, se ejecuta la función de crear una nueva entrada de productos que recibe el 
        parametro de la data que se está enviando en el formulario, luego de crear, se 
        actualiza el estado de la categoria, proveedor, producto seleccionada a null, 
        también se ejecuta la función de listar todos los productos, luego se limpia los
        valores escritos en el formulario. Por último redirige a la vista /entradaProducto.
        */
    const submit = async (data) => {
        try {
            // Validar los datos
            data.cantidad = parseInt(data.cantidad, 10);//convertir a entero
            if (params.id) {
                await updateEntradaP(params.id, data);
            } else {
                await createEntradaP(data);
                setCategories('');
                setProveedores('');
                setProductos('');
                await getEntradaP();
                reset();
            }
            navigate('/entradaProducto')
        } catch (error) {
            console.log(error)
        }
    }

    /*Función para poder guardar el estado del Proveedor*/
    const handleProveedorChange = (event) => {
        setProveedores(event.target.value);
        setValue('IdProveedor', event.target.value)
    }

    /*Función para poder guardar el estado del Producto*/
    const handleProductoChange = (event) => {
        setProductos(event.target.value);
        setValue('IdProducto', event.target.value)
    }

    /*Función para poder guardar el estado de la Categoria*/
    const handleCategoryChange = (event) => {
        setCategories(event.target.value);
        setValue('IdCategoria', event.target.value)
    }

    /*Función para formatear la fecha a UTC*/
    const formatISODate = (isoDate) => {
        return isoDate.split('T')[0];
    };

    /* Usar useEffect con una función de cargar la entrada del producto seleccionado,
        esto va relacionado con el botón de editar de la tabla de Entrada de Productos,
        al editar una fila, se carga sus datos, con esta función.
    */
    useEffect(() => {
        async function cargarDatos() {
            if (params.id) {
                const entrada = await getEntradaById(params.id)
                console.log(entrada)
                //ver los valores obtenidos
                setValue('IdProveedor', entrada.IdProveedor)
                setValue('IdProducto', entrada.IdProducto)
                setValue('IdCategoria', entrada.IdCategoria)
                setValue('Cantidad', entrada.Cantidad)
                setValue('FechaEntrada', formatISODate(entrada.FechaEntrada))
                setProveedores(entrada.IdProveedor)
                setProductos(entrada.IdProducto)
                setCategories(entrada.IdCategoria)
            }
        }
        cargarDatos()
    }, [])

    /* Usar useEffect con una función de cargar la lista de proveedores,
        esto va relacionado con el desplegable de Proveedores en el formulario.
        al crear una nueva entrada de producto, se carga la lista de proveedores,
        igualmente productos y categoria.
    */
    useEffect(() => {
        getProveedor();
        getProduct();
        getCategoria();
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
                padding: 2,
                width: { xs: '100%', md: '500px' },
                height: { xs: '100%', md: '550px' }
            }}
        >
            <Typography sx={{
                fontFamily: 'revert',
                fontSize: '2em',
                textAlign: 'initial',
            }}>Entrada Productos
            </Typography>

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
                    sx={{ mb: 2 }}
                >
                    {categoria.map((cat) => (
                        <MenuItem key={cat.IdCategoria} value={cat.IdCategoria}>
                            {cat.Nombre}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                {...register('Cantidad', { required: true })}
                id='Cantidad'
                label='Cantidad'
                type='number'
                variant='outlined'
                fullWidth
                helperText='Ingrese una cantidad válida'
                error={false}
                sx={{ mb: 2 }}
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
export default EntradaProdForm