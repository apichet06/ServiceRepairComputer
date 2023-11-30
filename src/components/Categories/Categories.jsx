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
import CategoriesTable from './CategoriesTable';



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Categories(props) {
    const { api } = props;
    // console.log(api);
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
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* Recent Orders */}
                            <Grid item xs={7}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <CategoriesTable api={api} />
                                </Paper>
                            </Grid>
                        </Grid>

                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}