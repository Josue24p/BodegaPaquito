import { Button, Grid, TextField, Typography } from '@mui/material'
import { useProveedor } from '../context/ProveedorContext';

import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSnackbar } from '../context/SnackbarContext';

function ProveedorForm() {

  const { register, handleSubmit, reset, setValue } = useForm();
  const {createProveedor, getProveedor,getProveedorById, updateProveedor}= useProveedor();
  const params = useParams()
  const navigate = useNavigate()

  //Usar la función showSnackbar para mostrar mensaje de actualizar, crear o eliminar.
  const { showSnackbar } = useSnackbar();

  /*Función de confirmar el registro, la funcionalidad se basa en traer la data
    como parametro. Se valida una condicional, si se recibe un parametro id, quiere decir, si 
    se edita un proveedor especifico, se ejecuta la función de actualizar, en caso no,
    se ejecuta la función de crear un nuevo proveedor que recibe el parametro de la 
    data que se está enviando en el formulario, luego de crear, también se ejecuta la función de listar
    todos los proveedores, luego se limpia los valores escritos en el formulario.
    Por último redirige a la vista proveedor.
    */
  const submit = async(data) => {
    // Validar los datos
    try {
      if(params.id){
        await updateProveedor(params.id, data)
        showSnackbar('Actualizado con éxito', 'success');
      }else{
        await createProveedor(data);
        showSnackbar('Creado con éxito', 'success');
        await getProveedor()
        reset()
      }
      navigate('/proveedor')
    } catch (error) {
      console.error(error);
      showSnackbar('No se puede crear el producto, ingrese bien los datos.', 'error');
    }
  };

  /* Usar useEffect con una función de cargar el proveedor seleccionado,
    esto va relacionado con el botón de editar de la tabla de proveedores,
    al editar un proveedor, se carga sus datos con esta función.
    */
  //los nombres del setValue tiene que ser lo mismo que el id de cada input(TextField)
  useEffect(()=>{
    async function cargarProveedor(){
        if(params.id){
            const proveedor = await getProveedorById(params.id)
            //ver los valores obtenidos
            setValue('nombre', proveedor.Nombre)
            setValue('ruc', proveedor.RUC)
            setValue('direccion', proveedor.Direccion)
            setValue('telefono', proveedor.Telefono)
            setValue('correo', proveedor.Correo)
        }
    }
    cargarProveedor()
},[])

  return (
    <Grid
      component={"form"}
      onSubmit={handleSubmit(submit)}
      encType='multipart/form-data'
      sx={{
        /* border: '1px solid green', */
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        margin: 0,
        ml: 0,
        mt: 2,
        padding: 4,
        width: { xs: '100%', md: '500px' },
        height: { xs: '100%', md: '550px' }
      }}
    >
      <Typography sx={{
        fontFamily: 'revert',
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
        {...register('telefono', { 
          required: true, 
        })}
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
          mt: 2,
          color: 'white',
          backgroundColor: 'cornflowerblue',
          '&:hover': {
            backgroundColor: 'blueviolet',
          },
          borderRadius: '10px',
        }}>Registrar</Button>
    </Grid>
  )
}

export default ProveedorForm
