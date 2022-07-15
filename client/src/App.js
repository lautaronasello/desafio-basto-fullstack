import { Box, ThemeProvider } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { theme } from './utils/theme';
import Home from './views/Home/Home';
import Layout from './views/Layout/Layout';
import Management from './views/Management/Management';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='admin/home' element={<Home />} />
          <Route path='admin/management' element={<Management />} />
          <Route path='*' element={<Navigate to='/admin/home' replace />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
