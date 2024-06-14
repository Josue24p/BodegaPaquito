
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
import MenuItem from '@mui/material/MenuItem';
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

function createData(IdProducto, categoria, nombre, descripcion, stock, precio) {
  return { IdProducto, categoria, nombre, descripcion, stock, precio };
}

const rows = [
  createData(1, 'Electrodomésticos', 'Laptop', 24, 4.0, 5),
  createData(2, 'Tecnología', 'Silla', 37, 4.3, 5),
  createData(3, 'Ropa', 'Camisa', 24, 6.0, 5),
  createData(4, 'Alimentos', 'Cereal', 67, 4.3, 5),
  createData(5, 'Deportes', 'Muñeca', 49, 3.9, 5),
];

function createCategoria(IdCategoria, nombre, descripcion ){
  return {IdCategoria, nombre, descripcion}
}

const categorias = [
  createCategoria(1,'Electrodomésticos', 'Dispositivos eléctricos para el hogar'),
  createCategoria(2,'Tecnología', 'Dispositivos y accesorios tecnológicos'),
  createCategoria(3,'Ropa', 'Prendas de vestir para hombres, mujeres y niños'),
  createCategoria(4,'Alimentos', 'Productos alimenticios comestibles'),
  createCategoria(5,'Deportes', 'Equipamiento y accesorios deportivos'),
];

const handleSubmit = (e) => {
  e.preventDefault()
  console.log('submit')
}

function Producto() {
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
          p: { xs: 2, md: 2 },
          width: { xs: '100%', md: '100%' },
        }}
      >
        <Grid
          sx={{
            /* border: '1px solid red', */
            margin: { xs: 0, md: 0 },
            p: { xs: 1, md: 2 },
            width: { xs: '100%', md: '900px' }
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>IdProducto</StyledTableCell>
                  <StyledTableCell align="right">Categoría</StyledTableCell>
                  <StyledTableCell align="right">Nombre</StyledTableCell>
                  <StyledTableCell align="right">Descripción</StyledTableCell>
                  <StyledTableCell align="right">Stock</StyledTableCell>
                  <StyledTableCell align="right">Precio</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.IdProducto}>
                    <StyledTableCell component="th" scope="row">
                      {row.IdProducto}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.categoria}</StyledTableCell>
                    <StyledTableCell align="right">{row.nombre}</StyledTableCell>
                    <StyledTableCell align="right">{row.descripcion}</StyledTableCell>
                    <StyledTableCell align="right">{row.stock}</StyledTableCell>
                    <StyledTableCell align="right">{row.precio}</StyledTableCell>
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
            width: { xs: '100%', md: '500px' },
          }}
        >
          <Typography sx={{
            fontFamily: 'revert',
            fontSize: '2em',
            textAlign: 'initial',
          }}>Productos</Typography>
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
            id='categoria'
            label='Categoría'
            select
            variant='outlined'
            autoFocus
            fullWidth
            helperText='Ingrese una categoria válida'
            error={false}
          >{categorias.map((cat)=>(
            <MenuItem key={cat.IdCategoria} value={cat.IdCategoria}>
              {cat.nombre}
            </MenuItem>
          ))}</TextField>
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
              mt: 2,
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

export default Producto
