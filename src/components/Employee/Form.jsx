/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
export default function Form(props) {
    const { handleClose, open, api, editId, editData, handleSave, setEmail, setUsername, setLastName, setFirstName, setselectedPosition, setselectedDivision, setStatus, setTitle } = props;


    const [divisionList, setDivisionList] = useState([]);
    const [positionList, setPositionList] = useState([]);
    const [filteredPositionList, setFilteredPositionList] = useState([]);
    //console.log(editData.firstName);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Division data
                const divisionResponse = await axios.get(api + 'DivisionAPI');
                setDivisionList(divisionResponse.data.result);

                // Fetch Position data
                const positionResponse = await axios.get(api + 'PositionAPI');
                setPositionList(positionResponse.data.result);

                if (editId) {
                    const filteredPositions = positionList.filter((position) => position.dV_ID === editData?.dV_ID);
                    setFilteredPositionList(filteredPositions);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [api, editId]);

    const handleChange = (event) => {
        setTitle(event.target.value);
    };
    // const handleStatusChange = (event) => {
    //     setStatus(event.target.value);
    // }

    const handleDivisionChange = (event) => {
        const selectedDivisionId = event.target.value;

        setselectedDivision(selectedDivisionId);

        const filteredPositions = positionList.filter((position) => position.dV_ID === selectedDivisionId);
        setFilteredPositionList(filteredPositions);

        // Reset selected position
        setselectedPosition('');
    };

    const handlePositionChange = (event) => {
        setselectedPosition(event.target.value);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" >
                <DialogTitle> {editId ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3} >
                            <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
                                <InputLabel id="demo-simple-select-label">คำนำหน้า</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='Title'
                                    defaultValue={editData?.title ?? undefined}
                                    label="Title"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="นาย">นาย</MenuItem>
                                    <MenuItem value="นาง">นาง</MenuItem>
                                    <MenuItem value="นางสาว">นางสาว</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                margin="dense"
                                name="Firstname"
                                label="ชื่อ"
                                type="text"
                                fullWidth
                                variant="standard"
                                defaultValue={editData?.firstName ?? undefined}// ใช้ค่าจาก state ที่เก็บค่าชื่อ
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                margin="dense"
                                name="lastName"
                                label="นามสกุล"
                                type="text"
                                fullWidth
                                variant="standard"
                                defaultValue={editData?.lastName ?? undefined} // ใช้ค่าจาก state ที่เก็บค่าชื่อ
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                name="Username"
                                label="ชื่อล็อกอิน"
                                type="text"
                                fullWidth
                                variant="standard"
                                defaultValue={editData?.username ?? undefined} // ใช้ค่าจาก state ที่เก็บค่าชื่อ
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                name="email"
                                label="อีเมล"
                                type="text"
                                fullWidth
                                variant="standard"
                                defaultValue={editData?.email ?? undefined} // ใช้ค่าจาก state ที่เก็บค่าชื่อ
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            {/* Division Dropdown */}
                            <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
                                <InputLabel id="division-label">แผนก</InputLabel>
                                <Select
                                    labelId="division-label"
                                    id="division-select"

                                    defaultValue={editData?.dV_ID ?? undefined}
                                    label="แผนก"
                                    onChange={handleDivisionChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {divisionList.map((division) => (
                                        <MenuItem key={division.id} value={division.dV_ID}>
                                            {division.dV_Name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            {/* Position Dropdown */}
                            <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
                                <InputLabel id="position-label">ตำแหน่ง</InputLabel>
                                <Select
                                    labelId="position-label"
                                    id="position-select"
                                    defaultValue={editData?.p_ID ?? undefined}
                                    name="position"
                                    label="ตำแหน่ง"
                                    onChange={handlePositionChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {filteredPositionList.map((position) => (
                                        <MenuItem key={position.id} value={position.p_ID}>
                                            {position.p_Name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* Add other TextField components for username, email, password, dV_ID, dV_Name, p_ID, and p_Name */}
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
                                <InputLabel id="demo-simple-select-label">สถานะ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    name='Status'
                                    defaultValue={editData?.status ?? undefined}
                                    label="Status"
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="พนักงาน">พนักงาน</MenuItem>
                                    <MenuItem value="พนักงานซ่อม">พนักงานซ่อม</MenuItem>
                                    <MenuItem value="พ้นสภาพ">พ้นสภาพ</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="success" endIcon={<SendIcon />} onClick={handleSave}>{editId ? "อับเดท" : "บันทึก"}</Button>
                    <Button variant="contained" onClick={handleClose}>ยกเลิก</Button>
                </DialogActions>

            </Dialog>
        </>
    );
}
