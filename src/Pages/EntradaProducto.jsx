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

function createData(IdEntradaProducto, IdProveedor, IdProducto, IdCategoria, cantidad, FechaEntrada) {
  return {IdEntradaProducto, IdProveedor, IdProducto, IdCategoria, cantidad, FechaEntrada };
}

const rows = [
  createData(1, 1, 1, 1, 100, '2024-05-30'),
  createData(2, 1, 1, 1, 50, '2024-05-30'),
  createData(3, 1, 1, 1, 10, '2024-05-30'),
  createData(4, 2, 2, 2, 50, '2024-05-30'),
  createData(5, 4, 4, 4, 50, '2024-05-30'),
];

const handleSubmit = (e) => {
  e.preventDefault()
  console.log('submit')
}

function EntradaProducto() {
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
                {rows.map((row) => (
                  <StyledTableRow key={row.IdEntradaProducto}>
                    <StyledTableCell component="th" scope="row">
                      {row.IdEntradaProducto}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.IdProveedor}</StyledTableCell>
                    <StyledTableCell align="right">{row.IdProducto}</StyledTableCell>
                    <StyledTableCell align="right">{row.IdCategoria}</StyledTableCell>
                    <StyledTableCell align="right">{row.cantidad}</StyledTableCell>
                    <StyledTableCell align="right">{row.FechaEntrada}</StyledTableCell>
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
          ml: 1,
          padding: 2,
          width: {xs: '100%', md:'500px'},
          ml: 20
        }}
        >
          <Typography sx={{
            fontFamily:'revert',
            fontSize: '2em',
            textAlign: 'initial',
            }}>Entrada Productos</Typography>
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
            id='descripcion'
            label='Descripción'
            type='text'
            variant='outlined'
            fullWidth
            helperText='Ingrese un descripcion válido'
            error={false}
            />
            <TextField
            id='stock'
            label='Stock'
            type='number'
            variant='outlined'
            fullWidth
            helperText='Ingrese un stock válido'
            error={false}
            />
            <TextField
            id='precio'
            label='Precio'
            type='number'
            variant='outlined'
            fullWidth
            helperText='Ingrese un precio válido'
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

export default EntradaProducto
