import { Button, Grid, TextField, Typography } from '@mui/material'
import { useCliente } from '../context/ClienteContext';

import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSnackbar } from '../context/SnackbarContext';

function ClienteForm() {

  const { register, handleSubmit, reset, setValue } = useForm();
  const {createCliente, getCliente,getClienteById, updateCliente}= useCliente();
  const params = useParams()
  const navigate = useNavigate()

  //Usar la función showSnackbar para mostrar mensaje de actualizar, crear o eliminar.
  const { showSnackbar } = useSnackbar();

  /*Función de confirmar el registro, la funcionalidad se basa en traer la data
    como parametro. Se valida una condicional, si se recibe un parametro id, quiere decir, si 
    se edita un Cliente especifico, se ejecuta la función de actualizar, en caso no,
    se ejecuta la función de crear un nuevo Cliente que recibe el parametro de la 
    data que se está enviando en el formulario, luego de crear, también se ejecuta la función de listar
    todos los Clientees, luego se limpia los valores escritos en el formulario.
    Por último redirige a la vista Cliente.
    */
  const submit = async(data) => {
    // Validar los datos
    try {
      if(params.id){
        await updateCliente(params.id, data)
        showSnackbar('Actualizado con éxito', 'success');
      }else{
        await createCliente(data);
        showSnackbar('Creado con éxito', 'success');
        await getCliente()
        reset()
      }
      navigate('/Cliente')
    } catch (error) {
      console.error(error);
      showSnackbar('No se puede crear el producto, ingrese bien los datos.', 'error');
    }
  };

  /* Usar useEffect con una función de cargar el Cliente seleccionado,
    esto va relacionado con el botón de editar de la tabla de Clientees,
    al editar un Cliente, se carga sus datos con esta función.
    */
  //los nombres del setValue tiene que ser lo mismo que el id de cada input(TextField)
  useEffect(()=>{
    async function cargarCliente(){
        if(params.id){
            const Cliente = await getClienteById(params.id)
            //ver los valores obtenidos
            setValue('nombre', Cliente.Nombres)
            setValue('apellido', Cliente.Apellidos)
            setValue('dni', Cliente.DNI)
            setValue('direccion', Cliente.Direccion)
            setValue('telefono', Cliente.Telefono)
            setValue('correo', Cliente.Correo)
        }
    }
    cargarCliente()
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
        ml: 2,
        mt: 4,
        mr: 1,
        padding: 4,
        width: { xs: '100%', md: '500px' },
        height: { xs: '100%', md: '550px' }
      }}
    >
      <Typography sx={{
        fontFamily: 'revert',
        fontSize: '2em',
        textAlign: 'initial',
      }}>Cliente</Typography>
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
        {...register('apellido', { required: true })}
        id='apellido'
        label='Apellido'
        type='text'
        variant='outlined'
        autoFocus
        fullWidth
        helperText='Ingrese un nombre válido'
        error={false}
      />
      <TextField
        {...register('dni', { required: true })}
        id='dni'
        label='Dni'
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

export default ClienteForm
