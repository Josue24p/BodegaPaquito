import { Box, Button, FormControl, Grid, InputLabel, Select, TextField, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import { useForm } from 'react-hook-form';
import { useProduct } from '../context/ProductContext';
import { useCategoria } from '../context/CategoriaContext';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';


function ProductoForm(/* { product } */) {
    const { register, handleSubmit, reset, setValue } = useForm();
    const { createProduct, getProduct, getProductoById, updateProduct } = useProduct();
    const { categoria, getCategoria } = useCategoria();
    const [categories, setCategories] = useState('')
    const params = useParams()
    const navigate = useNavigate()

    //Usar la función showSnackbar para mostrar mensaje de actualizar, crear o eliminar.
    const { showSnackbar } = useSnackbar();

    /*Función de confirmar el registro, la funcionalidad se basa en traer la data
    como parametro. Primero se parsea el stock y precio a int y decimal,
    luego se valida una condicional, si se recibe un parametro id, quiere decir, si 
    se edita un producto especifico, se ejecuta la función de actualizar, en caso no,
    se ejecuta la función de crear un nuevo producto que recibe el parametro de la 
    data que se está enviando en el formulario, luego de crear, se actualiza el estado
    de la categoria seleccionada a null, también se ejecuta la función de listar
    todos los productos, luego se limpia los valores escritos en el formulario.
    Por último redirige a la vista producto.
    */
    const submit = async (data) => {
        // Validar los datos
        try {
            data.stock = parseInt(data.stock, 10); // Convertir a entero
            data.precio = parseFloat(data.precio, 10.2); // Convertir a flotante

            if (params.id) {
                await updateProduct(params.id, data)
                showSnackbar('Actualizado con éxito', 'success');
            } else {
                await createProduct(data);
                showSnackbar('Creado con éxito', 'success');
                setCategories('')
                await getProduct()
                reset();
            }
            navigate('/producto');

        } catch (error) {
            console.log(error)
            showSnackbar('No se puede crear el producto, ingrese bien los datos.', 'error');
        }
    }

    /*Función para poder guardar el estado de la Categoria*/
    const handleCategoryChange = (event) => {
        setCategories(event.target.value);
        setValue('idCategoria', event.target.value)
    }

    /* Usar useEffect con una función de cargar el producto seleccionado,
    esto va relacionado con el botón de editar de la tabla de productos,
    al editar un producto, se carga sus datos con esta función.
    */
    useEffect(() => {
        async function cargarProducto() {
            if (params.id) {
                const producto = await getProductoById(params.id)
                /* console.log(producto) */
                //ver los valores obtenidos
                setValue('idCategoria', producto.IdCategoria)
                setValue('nombre', producto.Nombre)
                setValue('descripcion', producto.Descripcion)
                setValue('stock', producto.Stock)
                setValue('precio', producto.Precio)
                setCategories(producto.IdCategoria)
            }
        }
        cargarProducto()
    }, [])


    useEffect(() => {
        getCategoria()
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
                height: { xs: '100%', md: '100%' }
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
                {...register('nombre', { required: true })}
                id='nombre'
                label='Nombre'
                type='text'
                variant='outlined'
                autoFocus
                fullWidth
                helperText='Ingrese un nombre válido'
                error={false}
                sx={{ mb: 2 }}
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
                sx={{ mb: 2 }}
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
                sx={{ mb: 2 }}
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
                inputProps={{
                    step: "0.01" // Permite la entrada de decimales
                }}
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
export default ProductoForm