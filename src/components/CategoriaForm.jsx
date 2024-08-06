import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useCategoria } from '../context/CategoriaContext';

import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSnackbar } from '../context/SnackbarContext';

function CategoriaForm() {

  const { register, handleSubmit, reset, setValue } = useForm();
  const {createCategoria, getCategoria,getCategoriaById, updateCategoria}= useCategoria();
  const params = useParams()
  const navigate = useNavigate()

  //Usar la función showSnackbar para mostrar mensaje de actualizar, crear o eliminar.
  const { showSnackbar } = useSnackbar();

  /*Función de confirmar el registro, la funcionalidad se basa en traer la data
    como parametro. Se valida una condicional, si se recibe un parametro id, quiere decir, si 
    se edita un Categoria especifico, se ejecuta la función de actualizar, en caso no,
    se ejecuta la función de crear un nuevo Categoria que recibe el parametro de la 
    data que se está enviando en el formulario, luego de crear, también se ejecuta la función de listar
    todos los Categoriaes, luego se limpia los valores escritos en el formulario.
    Por último redirige a la vista Categoria.
    */
  const submit = async(data) => {
    // Validar los datos
    try {
      if(params.id){
        await updateCategoria(params.id, data)
        showSnackbar('Actualizado con éxito', 'success');
      }else{
        await createCategoria(data);
        showSnackbar('Creado con éxito', 'success');
        await getCategoria()
        reset()
      }
      navigate('/categoria')
    } catch (error) {
      console.error(error);
      showSnackbar('No se puede crear el producto, ingrese bien los datos.', 'error');
    }
  };

  /* Usar useEffect con una función de cargar el Categoria seleccionado,
    esto va relacionado con el botón de editar de la tabla de Categoriaes,
    al editar un Categoria, se carga sus datos con esta función.
    */
  //los nombres del setValue tiene que ser lo mismo que el id de cada input(TextField)
  useEffect(()=>{
    async function cargarCategoria(){
        if(params.id){
            const cat = await getCategoriaById(params.id)
            console.log(cat)
            //ver los valores obtenidos
            setValue('nombre', cat.Nombre)
            setValue('descripcion', cat.Descripcion)
        }
    }
    cargarCategoria()
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
        padding: 2,
        width: { xs: '100%', md: '500px' },
        height: { xs: '100%', md: '100%' }
      }}
    >
      <Typography sx={{
        fontFamily: 'revert',
        fontSize: '2em',
        textAlign: 'initial',
      }}>Categoria</Typography>
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
        label='Descripcion'
        type='text'
        variant='outlined'
        autoFocus
        fullWidth
        helperText='Ingrese una descripción válida'
        error={false}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0 }}>
      <Button
        type='submit'
        variant='outlined'
        sx={{
          mt: 1,
          color: 'white',
          backgroundColor: 'cornflowerblue',
          '&:hover': {
            backgroundColor: 'blueviolet',
          },
          borderRadius: '10px',
        }}>Registrar</Button>
        </Box>
    </Grid>
  )
}

export default CategoriaForm
