/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import SendIcon from '@mui/icons-material/Send';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';

export default function FormComputer(props) {
    const { open, handleClose, handleSave, editId, editData, setName, setSerialNumber, setDescription } = props;


    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="xl">
                <DialogTitle> {editId ? 'แก้ไขข้อมูลคอมพิวเตอร์' : 'เพิ่มข้อมูลคอมพิวเตอร์'}</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs={6} sm={6} >
                            <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
                                <InputLabel id="demo-simple-select-label">คอมพิวเตอร์</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='Name'
                                    defaultValue={editData?.name ?? undefined}
                                    label="คอมพิวเตอร์"
                                    onChange={e => setName(e.target.value)}
                                >
                                    <MenuItem value="คอมพิวเตอร์ตั้งโต๊ะ(PC)">คอมพิวเตอร์ตั้งโต๊ะ(PC)</MenuItem>
                                    <MenuItem value="จอคอมพิวเตอร์">จอคอมพิวเตอร์</MenuItem>
                                    <MenuItem value="Notebook">Notebook</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="serialNumber"
                                type="text"
                                fullWidth
                                variant="standard"
                                defaultValue={editData?.serialNumber ?? undefined}
                                onChange={(e) => setSerialNumber(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="description"
                                type="text"
                                fullWidth
                                variant="standard"
                                defaultValue={editData?.description ?? undefined}
                                onChange={(e) => setDescription(e.target.value)}
                            />
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