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
import { Grid } from '@mui/material';
import { useEntradaProduct } from '../context/EntradaProdContex';
import { useEffect } from 'react';
import EntradaProdForm from '../components/EntradaProdForm';


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

/* const handleSubmit = (e) => {
  e.preventDefault()
  console.log('submit')
}
 */
function EntradaProducto() {
const {getEntradaP, entrada} = useEntradaProduct();

useEffect(()=>{
getEntradaP();
},[])
if(entrada.length === 0) return <h1>No hay ingreso de productos</h1>
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
          ml: {xs: 10, md: 1},
          mr: {xs: 1, md: 1},
          p: {xs: 2, md: 2},
          width: {xs: '100%', md:'100%'},
        }}
      >
        <Grid 
        sx={{
          /* border: '1px solid red', */
          margin: {xs: 0, md: 0},
          p: {xs: 1, md: 2},
          width: {xs: '100%', md:'900px'}
        }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>IdEntradaProducto</StyledTableCell>
                  <StyledTableCell align="right">IdProveedor</StyledTableCell>
                  <StyledTableCell align="right">IdProducto</StyledTableCell>
                  <StyledTableCell align="right">IdCategoria</StyledTableCell>
                  <StyledTableCell align="right">Cantidad</StyledTableCell>
                  <StyledTableCell align="right">FechaEntrada</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entrada.map((entrada) => (
                  <StyledTableRow key={entrada.IdEntrada}>
                    <StyledTableCell component="th" scope="row">
                      {entrada.IdEntrada}
                    </StyledTableCell>
                    <StyledTableCell align="right">{entrada.IdProveedor}</StyledTableCell>
                    <StyledTableCell align="right">{entrada.IdProducto}</StyledTableCell>
                    <StyledTableCell align="right">{entrada.IdCategoria}</StyledTableCell>
                    <StyledTableCell align="right">{entrada.Cantidad}</StyledTableCell>
                    <StyledTableCell align="right">
                    {new Date(entrada.FechaEntrada).toLocaleDateString()}
                      </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
                <EntradaProdForm entrada={entrada}/>
      </Grid>

    </Box>
  );
}

export default EntradaProducto
