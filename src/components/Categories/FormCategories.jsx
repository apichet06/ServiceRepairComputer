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
import { Grid } from '@mui/material';

export default function FormDivision(props) {
    const { open, handleClose, handleSave, editId, editData, setName } = props;

    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth="xl">
                <DialogTitle> {editId ? 'แก้ไขข้อมูลอาการเสีย' : 'เพิ่มข้อมูลอาการเสีย'}</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}  >
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="อาการเสีย"
                                type="text"
                                fullWidth
                                sx={{ m: 1, width: '60ch' }}
                                variant="standard"
                                defaultValue={editData?.name ?? undefined}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="success" endIcon={<SendIcon />} onClick={handleSave}>{editId ? "อับเดท" : "บันทึก"}</Button>
                    <Button variant="contained" onClick={handleClose}>ยกเลิก</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}