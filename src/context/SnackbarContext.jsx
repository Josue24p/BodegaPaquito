import { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarContext = createContext();

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar no puede ser usado sin un SnackbarProvider");
  }
  return context;
};

export const SnackbarProvider = ({ children }) => {

  /* Manejar estados para que se muestre el mensaje, estado para guardar el mensaje y el tipo si es success o error*/
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  /* Función para mostrar el mensaje y su tipo y que se visualice.*/
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  /* Función para cerrar el mensaje */
  const handleClose = () => {
    setSnackbarOpen(false);
  };

  /* Retornar el contexto con las funciones para mostrar el mensaje y cerrarlo */
  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
