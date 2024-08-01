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
import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import { useInventario } from '../context/InventarioContext';
import InventarioForm from '../components/InventarioForm';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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


function Inventario() {
  const { inventario, getInventario, deleteInventario  } = useInventario();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleDelete = async(id) => {
    try {
      await deleteInventario(id);
      setSnackbarMessage('Eliminado con éxito');
      setSnackbarSeverity('success');
      await getInventario();
    } catch (error) {
      setSnackbarMessage(`No se puede eliminar el producto con ID ${id}, primero elimine las relaciones en la otra tabla.`);
      setSnackbarSeverity('error');
    }finally{
      setSnackbarOpen(true);
    }
    
  }

  useEffect(() => {
    getInventario();
  }, [])
  if (inventario.length === 0) return <h1>No hay ingreso de Inventarios</h1>
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
                  <StyledTableCell>IdInventario</StyledTableCell>
                  <StyledTableCell align="right">Producto</StyledTableCell>
                  <StyledTableCell align="right">Categoria</StyledTableCell>
                  <StyledTableCell align="right">Proveedor</StyledTableCell>
                  <StyledTableCell align="right">Stock</StyledTableCell>
                  <StyledTableCell align="right">Fecha</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventario.map((inventario) => (
                  <StyledTableRow key={`${inventario.IdInventario}`}>
                    <StyledTableCell component="th" scope="row">
                      {inventario.IdInventario}
                    </StyledTableCell>
                    <StyledTableCell align="right">{inventario.Producto}</StyledTableCell>
                    <StyledTableCell align="right">{inventario.Categoria}</StyledTableCell>
                    <StyledTableCell align="right">{inventario.Proveedor}</StyledTableCell>
                    <StyledTableCell align="right">{inventario.Stock}</StyledTableCell>
                    <StyledTableCell align="right">
                      {(() => {
                        const date = new Date(inventario.Fecha);
                        const year = date.getUTCFullYear();
                        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // getUTCMonth() es cero-indexado
                        const day = date.getUTCDate().toString().padStart(2, '0');
                        return `${day}/${month}/${year}`;
                      })()}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                    <Link to={`/inventario/${inventario.IdInventario}`}>
                    <Button sx={{
                        minWidth: '30px',
                        backgroundColor: 'green',
                        color: 'black',
                        ':hover':{
                          backgroundColor: 'orange'
                        }
                      }}    
                      variant='contained'><EditIcon/>
                      </Button>
                    </Link>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button sx={{
                        minWidth: '30px',
                        backgroundColor: 'blueviolet',
                        color: 'white',
                        ':hover':{
                          backgroundColor: 'red'
                        }
                      }}
                      onClick={()=>
                        handleDelete(inventario.IdInventario)
                      }
                        variant='contained'><DeleteIcon/>
                      </Button>
                      </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <InventarioForm/>
      </Grid>
      <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={()=> setSnackbarOpen(false)}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      >
        <Alert 
        onClose={()=> setSnackbarOpen(false)}
        severity={snackbarSeverity}
        sx={{width:'100%'}}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </Box>
  );
}

export default Inventario
