/* eslint-disable react/prop-types */
import { Button, DialogActions, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Send as SendIcon, CloudUpload as CloudUpload } from '@mui/icons-material';
import Swal from "sweetalert2";
import Titles from "../Header/Title";
import { DateTime } from 'luxon';


export default function RepairForm(props) {
    const { api } = props;
    const [categories, setCategories] = useState([]);
    const [computer, setComuputer] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [computerId, setComputerId] = useState('');
    const [C_ID, setCategoryId] = useState('');
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const currentUtcTime = DateTime.utc(); // เวลา UTC ปัจจุบัน
    const thaiTime = currentUtcTime.setZone('Asia/Bangkok');


    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();
        if (file) {
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            setSelectedFile(file);
            // console.log(file);
            reader.readAsDataURL(file);
        } else {
            setSelectedFile(null);
        }

    };

    // สร้างฟังก์ชันสำหรับรีเซ็ตค่าในฟอร์ม
    const resetForm = () => {
        setTitle('');
        setDescription('');
        setComputerId('');
        setCategoryId('');
        setImageUrl(null);
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('employeeId', userData.employeeId);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('status', 0);
            formData.append('createdAt', thaiTime.setZone('Asia/Bangkok').toFormat('yyyy-MM-dd HH:mm:ss'));
            formData.append('imageFile', selectedFile);
            formData.append('computerId', computerId);
            formData.append('C_ID', C_ID);
            if (description && computerId && C_ID) {
                const response = await axios.post(api + 'IssueAPI', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 200) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // รีเซ็ตค่าในฟอร์ม
                    resetForm();
                } else {
                    console.log(response);
                }

            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'กรอกข้อมูลให้ครบ!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const showComputer = useCallback(async () => {
        try {
            const response = await axios.get(`${api}ComputerAPI`);
            const result = response.data.result;
            if (result) {
                setComuputer(result);
            }

        } catch (e) {
            console.log(e);
        }

    }, [api]);

    const showCategories = useCallback(async () => {
        try {
            const response = await axios.get(`${api}CategoriesAPI`);
            const result = response.data.result;

            if (result) {

                setCategories(result);
            }
        } catch (error) {
            console.error('Error fetching division data:', error);
            // สามารถเพิ่มการจัดการข้อผิดพลาดเพิ่มเติมตามที่ต้องการ
        }

    }, [api])

    useEffect(() => {
        showCategories();
        showComputer();
    }, [showCategories, showComputer]);

    return (
        <>
            <Titles>แจ้งซ่อมคอมพิวเตอร์</Titles>
            <DialogContent dividers>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="หัวเรื่องแจ้งซ่อม"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={title || ''}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6} sm={5} >
                        <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
                            <InputLabel id="demo-simple-select-label">ปัญหาที่พบ</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name='Name'
                                value={C_ID || ''}
                                onChange={e => setCategoryId(e.target.value)}
                            >
                                {categories.map((c, index) => (
                                    <MenuItem key={index} value={c.c_ID}>
                                        {c.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="รายละเอียด"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={description || ''}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6} >
                        <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
                            <InputLabel id="demo-simple-select-label">คอมพิวเตอร์</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name='Name'
                                value={computerId || ''}
                                label="คอมพิวเตอร์"
                                onChange={e => setComputerId(e.target.value)}
                            >
                                {computer.map((c, index) => (
                                    <MenuItem key={index} value={c.computerId}>
                                        {c.name + " - " + c.serialNumber + " - " + c.description}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} sm={2} >
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ m: 2 }}>
                            <label htmlFor="upload-image">
                                <Button variant="outlined" component="span" startIcon={<CloudUpload />}>
                                    ภาพประกอบ
                                </Button>
                                <input
                                    id="upload-image"
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={handleFileUpload}
                                />
                            </label>
                        </Stack>
                    </Grid>
                    <Grid item xs={4} sm={4} >
                        {imageUrl && <img src={imageUrl} alt="Uploaded Image" height="200" />}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="success" endIcon={<SendIcon />} onClick={handleSave}>บันทึก</Button>
            </DialogActions>
        </>
    )
}
