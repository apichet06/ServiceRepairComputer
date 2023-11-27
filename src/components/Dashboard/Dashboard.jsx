/* eslint-disable no-unused-vars */
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

import Chart from './Chart';
import ChartComplete from './ChartComplete';
import Orders from './Orders';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard(props) {
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
                            {/* Chart */}
                            <Grid item xs={12} md={8} lg={8}>

                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <Chart api={api} />
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={12} md={4} lg={4}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <ChartComplete api={api} />
                                </Paper>
                            </Grid>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Orders api={api} />
                                </Paper>
                            </Grid>
                        </Grid>

                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}