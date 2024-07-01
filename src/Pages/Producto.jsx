
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
import { Grid  } from '@mui/material';
import ProductoForm from '../components/ProductoForm';
import { useProduct } from '../context/ProductContext';
import { useEffect } from 'react';


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
} */

function Producto() {
  const {getProduct, product} = useProduct();

  useEffect(() => {
    getProduct();
  }, []);

  if(product.length === 0) return <h1>No productos</h1>
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
            width: { xs: '100%', md: '900px' },
            ml: {xs: 1, md:0},
            mr: {xs:1,md:15}
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
                {product.map((product) => (
                  <StyledTableRow key={product.IdProducto}>
                    <StyledTableCell component="th" scope="row">
                      {product.IdProducto}
                    </StyledTableCell>
                    <StyledTableCell align="right">{product.IdCategoria}</StyledTableCell>
                    <StyledTableCell align="right">{product.Nombre}</StyledTableCell>
                    <StyledTableCell align="right">{product.Descripcion}</StyledTableCell>
                    <StyledTableCell align="right">{product.Stock}</StyledTableCell>
                    <StyledTableCell align="right">{product.Precio}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
                <ProductoForm key={product.IdProducto} product ={product}/>
      </Grid>

    </Box>
  );
}

export default Producto
