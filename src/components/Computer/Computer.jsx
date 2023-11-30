import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    CssBaseline,
    Box,
    Toolbar,
    Container,
    Grid,
    Paper
} from '@mui/material';
import Header from '../Header/Header';
import PropTypes from 'prop-types'; // ต้องนำเข้า PropTypes
import ComputerTeble from './ComputerTable';


const defaultTheme = createTheme();

export default function Computer(props) {
    const { api } = props;

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* Recent EmployeeTable */}
                            <Grid item xs={10}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <ComputerTeble api={api} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>

                </Box>
            </Box>
        </ThemeProvider>
    );



}
Computer.propTypes = {
    api: PropTypes.any, // ประเภทของ props api
};