
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
import ProveedorForm from '../components/ProveedorForm';
import { useProveedor } from '../context/ProveedorContext';
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


function Proveedor() {
  const { getProveedor, deleteProveedor, proveedor } = useProveedor();

  //Usar la función showSnackbar para mostrar mensaje de actualizar, crear o eliminar.
  const { showSnackbar } = useSnackbar();

  const handleDelete = async(id) => {
    try {
      const response = await deleteProveedor(id);
      if (response) {
        showSnackbar('Eliminado con éxito', 'success');
        await getProveedor();
      } else {
        showSnackbar(`Error al eliminar el proveedor con ID ${id} está registrado en el Inventario o Entrada de Productos`,'error');
      }
    } catch (error) {
      console.log(error)
      showSnackbar(`Error al eliminar el proveedor con ID ${id} está registrado en el Inventario o Entrada de Productos`,'error');
    }
  }

  useEffect(() => {
    getProveedor()
  }, [])

  if (proveedor.length === 0) return <h1>No proveedores</h1>

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
                  <StyledTableCell>IdProveedor</StyledTableCell>
                  <StyledTableCell align="right">Nombre</StyledTableCell>
                  <StyledTableCell align="right">Ruc</StyledTableCell>
                  <StyledTableCell align="right">Direccion</StyledTableCell>
                  <StyledTableCell align="right">Telefono</StyledTableCell>
                  <StyledTableCell align="right">Correo</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {proveedor.map((proveedor) => (
                  <StyledTableRow key={`${proveedor.IdProveedor}`}>
                    <StyledTableCell component="th" scope="row">
                      {proveedor.IdProveedor}
                    </StyledTableCell>
                    <StyledTableCell align="right">{proveedor.Nombre}</StyledTableCell>
                    <StyledTableCell align="right">{proveedor.RUC}</StyledTableCell>
                    <StyledTableCell align="right">{proveedor.Direccion}</StyledTableCell>
                    <StyledTableCell align="right">{proveedor.Telefono}</StyledTableCell>
                    <StyledTableCell align="right">{proveedor.Correo}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Link to={`/proveedor/${proveedor.IdProveedor}`}>
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
                          handleDelete(proveedor.IdProveedor)
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
        <ProveedorForm key={proveedor.IdProveedor} proveedor={proveedor} />
      </Grid>

    </Box>
  );
}

export default Proveedor
