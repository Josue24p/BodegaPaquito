import { Button, Grid, TextField, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import { useForm } from 'react-hook-form';
import { useProduct } from '../context/ProductContext';

function ProductoForm(/* { product } */) {
    const { register, handleSubmit, reset } = useForm();
    const { createProduct } = useProduct();

    const submit = async (data) => {
        try {
            await createProduct(data);
            reset();
        } catch (error) {
            console.log(error)
        }
    }

    /*   const obtenerCategoria = async()=>{
          try {
              let res = await getProduct();
              let categoria = res.map((cat)=>(
                  cat.IdCategoria
              ))
              console.log(categoria)
          } catch (error) {
              console.log(error)
          }
      } */

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
                {...register('categoria', { required: true })}
                id='categoria'
                label='Categoría'
                select
                variant='outlined'
                autoFocus
                fullWidth
                helperText='Ingrese una categoria válida'
                error={false}
            >
                 {/* {product.map((cat)=>( */}
                <MenuItem /* key={cat.IdProducto} value={cat.IdCategoria} */>
                    {/* {cat.IdCategoria} */}
                </MenuItem>
                {/*  ))} */}
            </TextField>
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