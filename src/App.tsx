import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/NavBar';


function App() {
  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Navbar />
          <Typography variant="h6">Fit Client Manager</Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
    </Container>
  )
}

export default App
