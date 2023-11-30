/* eslint-disable react/prop-types */
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    CssBaseline,
    Box,
    Toolbar,
    Container,
    Grid,
    Paper,
    TextField, Alert, Collapse, Fab, Typography
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Header from '../Header/Header';
import { useCallback } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import CloseIcon from '@mui/icons-material/Close';

const defaultTheme = createTheme();

export default function Profile(props) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const { api } = props;
    const [data, setData] = useState("");
    const [passwordOrgn, setPasswordOrgn] = useState('');
    const [passwordNew, setPasswordNew] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showAlert, setShowAlert] = useState("");
    const [open, setOpen] = useState(true);

    const fetchData = useCallback(async () => {

        const response = await axios.get(api + 'EmployeeAPI');

        const newData = response.data.result.find(data => data.employeeId === userData?.employeeId)

        setData(newData);

    }, [api, userData?.employeeId])


    const handleSave = async () => {
        if (passwordOrgn && passwordNew && passwordConfirm) {
            setOpen(false);
            if (passwordNew == passwordConfirm) {
                const data = { password: passwordNew };
                try {
                    const response = await axios.put(api + 'EmployeeAPI/ChangPassword/' + userData?.id + '/' + passwordOrgn, data);
                    if (response.data.isSuccess === true) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: response.data.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setPasswordOrgn("")
                        setPasswordNew("")
                        setPasswordConfirm("")
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: response.data.message,
                        });
                    }
                    // ทำอย่างไรกับ response นี้ต่อไป
                } catch (error) {
                    // กรณีเกิด error ในการเรียก API
                    console.error("Error:", error);
                }
                setShowAlert("")
            } else {
                setShowAlert("รหัสผ่านไม่ตรงกัน")
                setOpen(true);
            }
        } else {

            setShowAlert("กรุณากรอกข้อมูลให้ครบด้วยครับ")
            setOpen(true);
        }
    };
    const handlePasswordOrgnChange = (e) => {
        // ให้กรอกได้เฉพาะอักษรภาษาอังกฤษและตัวเลข
        const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
        setPasswordOrgn(value);
    };

    const handlePasswordNewChange = (e) => {
        // ให้กรอกได้เฉพาะอักษรภาษาอังกฤษและตัวเลข
        const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
        setPasswordNew(value);
    };

    const handlePasswordConfirmChange = (e) => {
        // ให้กรอกได้เฉพาะอักษรภาษาอังกฤษและตัวเลข
        const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
        setPasswordConfirm(value);
    };

    useEffect(() => {
        fetchData()
    }, [fetchData])
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
                            <Grid item xs={3} md={5} sm={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <h2>ข้อมูลส่วนตัว</h2>
                                    <Typography sx={{ marginTop: 1 }}>  {data.fullname} </Typography>
                                    <Typography sx={{ marginTop: 1 }}>  แผนก: {data.dV_Name}</Typography>
                                    <Typography sx={{ marginTop: 1 }}>  ตำแหน่ง: {data.p_Name}</Typography>
                                    <Typography sx={{ marginTop: 1 }}>  Email: {data.email}</Typography>
                                    <Typography sx={{ marginTop: 1 }}>  สถานะ: {data.status}</Typography>
                                    <Typography sx={{ marginTop: 1 }}> <hr /></Typography>
                                    {showAlert && (
                                        <Collapse in={open}>
                                            <Alert
                                                severity="warning"
                                                action={
                                                    <IconButton
                                                        aria-label="close"
                                                        color="inherit"
                                                        size="small"
                                                        onClick={() => {
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        <CloseIcon fontSize="inherit" />
                                                    </IconButton>
                                                }
                                                sx={{ mb: 2 }}
                                            >
                                                {showAlert}
                                            </Alert>
                                        </Collapse>
                                    )}
                                    <TextField
                                        label="รหัสผ่านเดิม*"
                                        type="password"
                                        autoComplete="off"
                                        autoFocus
                                        variant="standard"
                                        onChange={handlePasswordOrgnChange}
                                        value={passwordOrgn}
                                    />
                                    <TextField
                                        margin="normal"
                                        label="รหัสผ่านใหม่*"
                                        type="password"
                                        autoComplete="off"
                                        variant="standard"
                                        onChange={handlePasswordNewChange}
                                        value={passwordNew}
                                    />
                                    <TextField
                                        margin="normal"
                                        label="ยืนยันรหัสผ่าน"
                                        type="password"
                                        autoComplete="off"
                                        required
                                        variant="standard"
                                        onChange={handlePasswordConfirmChange}
                                        value={passwordConfirm}
                                    />
                                    {/* <Button variant="contained" color="success" onClick={handleSave} endIcon={<SendIcon />} >เปลี่ยนรหัสผ่าน</Button> */}
                                    <Fab variant="extended" color="secondary" size="medium" onClick={handleSave} endIcon={<SendIcon />} sx={{ marginTop: 1 }} >
                                        เปลี่ยนรหัสผ่าน <SendIcon sx={{ ml: 1 }} />
                                    </Fab>
                                </Paper>

                            </Grid>
                        </Grid>

                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );



}
