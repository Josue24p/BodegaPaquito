import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import { useSalidaProduct } from '../context/SalidaProdContext';
import { useProduct } from '../context/ProductContext';
import { useEffect, useState } from 'react';
import { useCategoria } from '../context/CategoriaContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useCliente } from '../context/ClienteContext';


function SalidaProdForm() {


    const { register, handleSubmit, reset, setValue } = useForm();

    /*Se trae las funciones a utilizar del contexto de SalidaProduct */
    const { createSalidaP, getSalidaP, getSalidaId, updateSalidaP } = useSalidaProduct();

    /* Se trae el estado del producto (product) y la función de getProduct para utilizarlo 
    en el formulario, cargar la data en un input despegable que muestre los datos*/
    const { product, getProduct } = useProduct();

    /* Se crea un nuevo estado 'productos' y setProductos para guardar el estado,
    en este caso se usa este estado para guardar el valor seleccionado de la lista
    de los productos que se obtienen en el despegable, cada vez que se cambia el producto
    seleccionado, se actualiza el estado*/
    const [productos, setProductos] = useState('');


    /* Se trae el estado de la categoria (categoria) y la función de getCategoria para utilizarlo 
    en el formulario, cargar la data en un input despegable que muestre los datos*/
    const { categoria, getCategoria } = useCategoria();

    /* Se crea un nuevo estado 'categories' y setCategories para guardar el estado,
    en este caso se usa este estado para guardar el valor seleccionado de la lista
    de las categorias que se obtienen en el despegable, cada vez que se cambia la categoria
    seleccionada, se actualiza el estado*/
    const [categories, setCategories] = useState('')

    /* Se trae el estado del cliente (cliente) y la función de getCliente para utilizarlo 
    en el formulario, cargar la data en un input despegable que muestre los datos*/
    const { cliente, getCliente } = useCliente();

    /* Se crea un nuevo estado 'clientes' y setClientes para guardar el estado,
    en este caso se usa este estado para guardar el valor seleccionado de la lista
    de los clientes que se obtienen en el despegable, cada vez que se cambia el cliente
    seleccionado, se actualiza el estado*/
    const [clientes, setClientes] = useState('');

    /* Se declara una variable params que hace uso de useParams, con el fin de permitir obtener
    el id de la fila seleccionada, tiene relación con el botón de editar de la tabla, en este 
    caso de Salida Producto.*/
    const params = useParams()

    /* Se hace uso de navigate para poder redirigir a otro vista*/
    const navigate = useNavigate()

    const submit = async (data) => {
        try {
            //validar los datos
            if (params.id) {
                await updateSalidaP(params.id, data)
            } else {
                await createSalidaP(data);
                setClientes('');
                setProductos('');
                setCategories('');
                await getSalidaP();
                reset();
            }
            navigate('/salidaProducto')
        } catch (error) {
            console.log(error)
        }
    }

    /*Función para poder guardar el estado del Cliente*/
    const handleClienteChange = (event) => {
        setClientes(event.target.value);
        setValue('IdCliente', event.target.value)
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

    /* Usar useEffect con una función de cargar la salida del producto seleccionado,
        esto va relacionado con el botón de editar de la tabla de Salida de Productos,
        al editar una fila, se carga sus datos, con esta función.
    */
    useEffect(() => {
        async function cargarDatos() {
            if (params.id) {
                const salida = await getSalidaId(params.id);
                console.log(salida)
                setValue('IdCliente', salida.IdCliente);
                setValue('IdProducto', salida.IdProducto);
                setValue('IdCategoria', salida.IdCategoria);
                setValue('Cantidad', salida.Cantidad);
                setValue('Precio', salida.Precio);
                setValue('FechaSalida', formatISODate(salida.FechaSalida));
                setClientes(salida.IdCliente)
                setProductos(salida.IdProducto)
                setCategories(salida.IdCategoria)
            }
        }
        cargarDatos()
    }, [])
    /* Usar useEffect con una función de cargar la lista de clientes,
        esto va relacionado con el desplegable de clientes en el formulario.
        al crear una nueva entrada de producto, se carga la lista de clientes,
        igualmente productos y categoria.
    */
    useEffect(() => {
        getCliente();
        getProduct();
        getCategoria();
    }, [])

    /*2da Forma traer los datos con TextField, en vez de FormControl y Select como las otras vistas*/
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
                mb: 1
            }}>Salida Productos
            </Typography>

            <TextField
                {...register('IdCliente', { required: true })}
                id='IdCliente'
                label='IdCliente'
                type='text'
                variant='outlined'
                value={clientes}
                onChange={handleClienteChange}
                select
                fullWidth
                helperText='Ingrese un IdCliente válido'
                error={false}
                sx={{ mb: 2 }}
            > {
                    cliente.map((clt) => (
                        <MenuItem key={clt.IdCliente} value={clt.IdCliente}>
                            {clt.Nombres}
                        </MenuItem>
                    ))
                }
            </TextField>

            <TextField
                {...register('IdProducto', { required: true })}
                id='IdProducto'
                label='IdProducto'
                type='text'
                variant='outlined'
                value={productos}
                onChange={handleProductoChange}
                select
                fullWidth
                helperText='Ingrese un producto válido'
                error={false}
                sx={{ mb: 2 }}
            >
                {
                    product.map((pro) => (
                        <MenuItem key={pro.IdProducto} value={pro.IdProducto}>
                            {pro.Nombre}
                        </MenuItem>
                    ))
                }
            </TextField>

            <TextField
                {...register('IdCategoria', { required: true })}
                id='IdCategoria'
                label='IdCategoria'
                type='text'
                variant='outlined'
                value={categories}
                onChange={handleCategoryChange}
                select
                fullWidth
                helperText='Ingrese una categoría válido'
                error={false}
                sx={{ mb: 2 }}
            > {
                    categoria.map((cat) => (
                        <MenuItem key={cat.IdCategoria} value={cat.IdCategoria}>
                            {cat.Nombre}
                        </MenuItem>
                    ))
                }
            </TextField>
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
                {...register('FechaSalida', { required: true })}
                id='FechaSalida'
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
export default SalidaProdForm