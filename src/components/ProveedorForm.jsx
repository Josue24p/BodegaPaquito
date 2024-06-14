import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import {createProveedorRequest} from '../api/proveedor';
import {useForm} from 'react-hook-form';

function ProveedorForm() {
    const { register, handleSubmit, reset } = useForm();
    const [proveedor, setProveedor] = React.useState([]);

      
      const createProveedor = async (provedors) => {
        try {
          const res = await createProveedorRequest(provedors)
          setProveedor([...proveedor,res.data])
          reset()
        } catch (error) {
          console.log(error)
        }
      }
      
      const onSubmit = handleSubmit ((data) => {
        createProveedor(data);
      });
  return (
           <Grid
        component={"form"}
        onSubmit={onSubmit}
        encType='multipart/form-data'
        sx={{
          /* border: '1px solid green', */
          border: '1px solid #ddd',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          margin: 0,
          ml: 20,
          mt:4,
          padding: 4,
          width: {xs: '100%', md:'500px'},
          height: {xs: '100%', md: '550px'}
        }}
        >
          <Typography sx={{
            fontFamily:'revert',
            fontSize: '2em',
            textAlign: 'initial',
            }}>Proveedor</Typography>
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
            {...register('ruc', { required: true })}
            id='ruc'
            label='Ruc'
            type='text'
            variant='outlined'
            fullWidth
            helperText='Ingrese un ruc válido'
            error={false}
            />
            <TextField
            {...register('direccion', { required: true })}
            id='direccion'
            label='Dirección'
            type='text'
            variant='outlined'
            fullWidth
            helperText='Ingrese una dirección válida'
            error={false}
            />
            <TextField
            {...register('telefono', { required: true })}
            id='telefono'
            label='Teléfono'
            type='text'
            variant='outlined'
            fullWidth
            helperText='Ingrese un teléfono válido'
            error={false}
            />
            <TextField
            {...register('correo', { required: true })}
            id='correo'
            label='Correo Electrónico'
            type='email'
            variant='outlined'
            fullWidth
            helperText='Ingrese un email válido'
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

export default ProveedorForm
