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
import {  Button, Grid } from '@mui/material';
import { useSalidaProduct } from '../context/SalidaProdContext';
import { useEffect } from 'react';
import SalidaProdForm from '../components/SalidaProdForm';
import { Link } from 'react-router-dom';


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


function SalidaProducto() {
  const {getSalidaP, deleteSalidaP, salida} = useSalidaProduct();

  useEffect(()=>{
    getSalidaP();
    },[])
    if(salida.length === 0) return <h1>No hay ingreso de productos</h1>
    
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
          mt: {xs:9, md:9},
          ml: {xs: 10, md: 2},
          mr: {xs: 1, md: 1},
          p: {xs: 2, md: 1},
          width: {xs: '100%', md:'100%'},
          height: { xs: '100%', md: '100%' },
        }}
      >
        <Grid 
        sx={{
          /* border: '1px solid red', */
          margin: { xs: 0, md: 0 },
          p: { xs: 1, md: 1 },
          width: { xs: '100%', md: '1000px' },
          height: { xs: '400px', md: '100%' },
          ml: { xs: 0, md: 0 },
          mr: { xs: 2, md: 15 },
          mb: { xs: 2, md: 2 }
        }}
        >
          <TableContainer sx={{ width: { xs: '100%' }, height: { xs: '380px', md: '100%' } }} component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>IdSalida</StyledTableCell>
                  <StyledTableCell align="right">IdCliente</StyledTableCell>
                  <StyledTableCell align="right">IdProducto</StyledTableCell>
                  <StyledTableCell align="right">IdCategoria</StyledTableCell>
                  <StyledTableCell align="right">Cantidad</StyledTableCell>
                  <StyledTableCell align="right">FechaSalida</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {salida.map((salida) => (
                  <StyledTableRow key={`${salida.IdSalida}`}>
                    <StyledTableCell component="th" scope="row">
                      {salida.IdSalida}
                    </StyledTableCell>
                    <StyledTableCell align="right">{salida.Cliente}</StyledTableCell>
                    <StyledTableCell align="right">{salida.Producto}</StyledTableCell>
                    <StyledTableCell align="right">{salida.Categoria}</StyledTableCell>
                    <StyledTableCell align="right">{salida.Cantidad}</StyledTableCell>
                    <StyledTableCell align="right">
                    {(() => {
                        const date = new Date(salida.FechaSalida);
                        const year = date.getUTCFullYear();
                        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // getUTCMonth() es cero-indexado
                        const day = date.getUTCDate().toString().padStart(2, '0');
                        return `${day}/${month}/${year}`;
                      })()}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                      <Link to={`/salidaProducto/${salida.IdSalida}`}>
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
                          await deleteSalidaP(salida.IdSalida);
                          getSalidaP();
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
                <SalidaProdForm salida={salida}/>
      </Grid>

    </Box>
  );
}

export default SalidaProducto
