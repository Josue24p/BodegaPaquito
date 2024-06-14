import * as React from 'react';
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
import { Grid, } from '@mui/material';
import {getProveedorRequest} from '../api/proveedor';
import ProveedorForm from '../components/ProveedorForm';


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


/* function createData(IdProveedor, nombre, ruc, direccion, telefono, correo) {
  return { IdProveedor, nombre, ruc, direccion, telefono, correo };
} */

/* const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 5),
  createData('Eclair', 262, 16.0, 24, 6.0, 5),
  createData('Cupcake', 305, 3.7, 67, 4.3, 5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 5),
]; */





function Proveedor() {
const [proveedor, setProveedor] = React.useState([]);

const getProveedor = async () =>{
  try {
    const res = await getProveedorRequest()
    setProveedor(res.data)
  } catch (error) {
    console.log(error)
  }
}

React.useEffect(()=>{
getProveedor()
},[proveedor])
  
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
                  <StyledTableCell>IdProveedor</StyledTableCell>
                  <StyledTableCell align="right">Nombre</StyledTableCell>
                  <StyledTableCell align="right">Ruc</StyledTableCell>
                  <StyledTableCell align="right">Direccion</StyledTableCell>
                  <StyledTableCell align="right">Telefono</StyledTableCell>
                  <StyledTableCell align="right">Correo</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {proveedor.map((pro) => (
                  <StyledTableRow key={pro.IdProveedor}>
                    <StyledTableCell component="th" scope="row">
                      {pro.IdProveedor}
                    </StyledTableCell>
                    <StyledTableCell align="right">{pro.Nombre}</StyledTableCell>
                    <StyledTableCell align="right">{pro.RUC}</StyledTableCell>
                    <StyledTableCell align="right">{pro.Direccion}</StyledTableCell>
                    <StyledTableCell align="right">{pro.Telefono}</StyledTableCell>
                    <StyledTableCell align="right">{pro.Correo}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
              <ProveedorForm/>
      </Grid>

    </Box>
  );
}

export default Proveedor
