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

export default function FormPosition(props) {
    const { open, handleClose, handleSave, editId, editData, setP_Name, setDv_ID, divisionList } = props;


    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="xl">
                <DialogTitle> {editId ? 'แก้ไขข้อมูลตำแหน่งงาน' : 'เพิ่มข้อมูลตำแหน่งงาน'}</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} >
                            <FormControl fullWidth variant="standard">
                                <InputLabel id="demo-simple-select-label">แผนก</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue={editData?.dV_ID ?? undefined}
                                    label="แผนก"
                                    onChange={(e) => setDv_ID(e.target.value)}
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
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="ตำแหน่ง"
                                type="text"
                                fullWidth
                                variant="standard"
                                defaultValue={editData?.p_Name ?? undefined}
                                onChange={(e) => setP_Name(e.target.value)}
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