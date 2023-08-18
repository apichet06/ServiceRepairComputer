/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import SendIcon from '@mui/icons-material/Send';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDivision(props) {
    const { open, handleClose, handleSave, editId, editData, setDV_Name } = props;

    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth="lg">
                <DialogTitle> {editId ? 'แก้ไขข้อมูลแผนก' : 'เพิ่มข้อมูลแผนก'}</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="ชื่อแผนก"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={editData?.dV_Name ?? undefined}
                        onChange={(e) => setDV_Name(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="success" endIcon={<SendIcon />} onClick={handleSave}>{editId ? "อับเดท" : "บันทึก"}</Button>
                    <Button variant="contained" onClick={handleClose}>ยกเลิก</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}