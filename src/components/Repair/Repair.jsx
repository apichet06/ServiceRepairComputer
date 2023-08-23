/* eslint-disable react/prop-types */
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
import RepairForm from './RepairForm';


const defaultTheme = createTheme();

export default function Computer(props) {
    const { api } = props;

    if (api) {
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
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        <RepairForm api={api} />
                                    </Paper>
                                </Grid>
                            </Grid>

                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        );
    }


}
