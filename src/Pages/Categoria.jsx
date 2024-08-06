
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Sidebar from '../components/Sidebar';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Grid, } from '@mui/material';
import CategoriaForm from '../components/CategoriaForm';
import { useCategoria } from '../context/CategoriaContext';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSnackbar } from '../context/SnackbarContext';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function Categoria() {
  const { getCategoria, deleteCategoria, categoria } = useCategoria();

  //Usar la función showSnackbar para mostrar mensaje de actualizar, crear o eliminar.
  const { showSnackbar } = useSnackbar();

  const handleDelete = async (id) => {
    try {
      const response = await deleteCategoria(id);
      /* console.log(response) */
      if (response) {
        showSnackbar('Eliminado con éxito', 'success');
        await getCategoria();
      } else {
        showSnackbar(`Error al eliminar la categoria con ID ${id}. El registro a eliminar, está registrado en la tabla de Productos`, 'error');
      }
    } catch (error) {
      console.log(error);
      showSnackbar(`Error al eliminar la categoria con ID ${id}. El registro a eliminar, está registrado en la tabla de Productos`, 'error');
    }
  };

  useEffect(() => {
    getCategoria()
  }, [])
  if (categoria.length === 0) return <h1>No Categorias</h1>
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },

      }}
    >

      <Sidebar />
      <Grid
        component={'main'}
        container spacing={2}
        sx={{
          /* border: '1px solid blue', */
          mt: { xs: 9, md: 9 },
          ml: { xs: 10, md: 1 },
          mr: { xs: 1, md: 1 },
          p: { xs: 1, md: 2 },
          width: { xs: '100%', md: '100%' },
          height: { xs: '100%', md: '100%' },
        }}
      >
        <Grid
          sx={{
            /* border: '1px solid red', */
            margin: { xs: 0, md: 0 },
            p: { xs: 1, md: 2 },
            width: { xs: '100%', md: '1000px' },
            height: { xs: '400px', md: '100%' },
            ml: { xs: 0, md: 0 },
            mr: { xs: 2, md: 15 },
            mb: { xs: 2, md: 2 }
          }}
        >
          <TableContainer sx={{ width: { xs: '100%' }, height: { xs: '380px', md: '100%' } }} component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>IdCategoria</StyledTableCell>
                  <StyledTableCell align="right">Nombre</StyledTableCell>
                  <StyledTableCell align="right">Descripcion</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoria.map((categoria) => (
                  <StyledTableRow key={`${categoria.IdCategoria}`}>
                    <StyledTableCell component="th" scope="row">
                      {categoria.IdCategoria}
                    </StyledTableCell>
                    <StyledTableCell align="right">{categoria.Nombre}</StyledTableCell>
                    <StyledTableCell align="right">{categoria.Descripcion}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Link to={`/categoria/${categoria.IdCategoria}`}>
                        <Button sx={{
                          minWidth: '30px',
                          backgroundColor: 'green',
                          color: 'black',
                          ':hover': {
                            backgroundColor: 'orange'
                          }
                        }}
                          variant='contained'><EditIcon />
                        </Button>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button sx={{
                        minWidth: '30px',
                        backgroundColor: 'blueviolet',
                        color: 'white',
                        ':hover': {
                          backgroundColor: 'red'
                        }
                      }}
                        onClick={async () => {
                          handleDelete(categoria.IdCategoria)
                        }}
                        variant='contained'><DeleteIcon />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <CategoriaForm key={categoria.IdCategoria} categoria={categoria} />
      </Grid>

    </Box>
  );
}

export default Categoria
