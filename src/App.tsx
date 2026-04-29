import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Button, Stack } from '@mui/material';
import { NavLink, Outlet } from 'react-router';


function App() {
  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Fit Client Manager</Typography>
        </Toolbar>
      </AppBar>

      {/** navigaatio*/}
      <Box>
        <Stack direction="row" justifyContent="center">
          <NavLink
            to="/"
            end
            style={{ textDecoration: "none" }}>
            {({ isActive }) => (
              <Button
                sx={{ fontWeight: isActive ? "bold" : "normal" }}>
                Home</Button>
            )}
          </NavLink>

          <NavLink
            to="/customers"
            style={{ textDecoration: "none" }}>
            {({ isActive }) => (
              <Button
                sx={{ fontWeight: isActive ? "bold" : "normal" }}>
                Customers</Button>
            )}
          </NavLink>

          <NavLink
            to="/trainings"
            style={{ textDecoration: "none" }}>
            {({ isActive }) => (
              <Button
                sx={{ fontWeight: isActive ? "bold" : "normal" }}>
                Trainings</Button>
            )}
          </NavLink>

        </Stack>
      </Box>

      <Outlet />


      <CssBaseline />
    </Container>
  )
}

export default App
