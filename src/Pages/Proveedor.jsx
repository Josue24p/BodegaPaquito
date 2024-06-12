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
import { Button, Grid, TextField, Typography } from '@mui/material';
import {getProveedorRequest} from '../api/proveedor';


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

const handleSubmit = (e) => {
  e.preventDefault()
  console.log('submit')
}

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
},[])
  
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
        <Grid 
        component={"form"}
        onSubmit={handleSubmit}
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
            id='ruc'
            label='Ruc'
            type='text'
            variant='outlined'
            fullWidth
            helperText='Ingrese un ruc válido'
            error={false}
            />
            <TextField
            id='direccion'
            label='Dirección'
            type='text'
            variant='outlined'
            fullWidth
            helperText='Ingrese una dirección válida'
            error={false}
            />
            <TextField
            id='telefono'
            label='Teléfono'
            type='text'
            variant='outlined'
            fullWidth
            helperText='Ingrese un teléfono válido'
            error={false}
            />
            <TextField
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
      </Grid>

    </Box>
  );
}

export default Proveedor
