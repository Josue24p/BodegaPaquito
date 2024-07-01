import { Button, Grid, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import { useSalidaProduct } from '../context/SalidaProdContext';


function SalidaProdForm({salida}) {
    const { register, handleSubmit, reset } = useForm();
    const { createSalidaP } = useSalidaProduct();

    const submit = async (data) => {
        try {
            await createSalidaP(data);
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
          width: {xs: '100%', md:'500px'},
        }}
        >
          <Typography sx={{
            fontFamily:'revert',
            fontSize: '2em',
            textAlign: 'initial',
            }}>Salida Productos</Typography>
            <TextField
            {...register('IdProveedor', { required: true })}
            id='IdProveedor'
            label='IdProveedor'
            type='text'
            variant='outlined'
            fullWidth
            helperText='Ingrese un IdProveedor válido'
            error={false}
            />
            <TextField
            {...register('IdProducto', { required: true })}
            id='IdProducto'
            label='IdProducto'
            type='number'
            variant='outlined'
            fullWidth
            helperText='Ingrese un IdProducto válido'
            error={false}
            />
            <TextField
            {...register('IdCategoria', { required: true })}
            id='IdCategoria'
            label='IdCategoria'
            type='text'
            variant='outlined'
            autoFocus
            fullWidth
            helperText='Ingrese una categoría válida'
            error={false}
            />
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
            {...register('FechaSalida', { required: true })}
            id='FechaSalida'
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
export default SalidaProdForm