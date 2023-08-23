/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material";

export default function FormReview(props) {
    const { dataIssue, handleClose, open } = props;

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="lg">
                <DialogTitle> ID: {dataIssue?.i_ID}</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography gutterBottom>
                                เรื่อง : {dataIssue?.title}
                            </Typography>
                            <Typography gutterBottom>
                                เครื่องคอมพิวเตอร์: {dataIssue.category?.name}
                            </Typography>
                            <Typography gutterBottom>
                                อาการเสีย: {dataIssue.category?.name}
                            </Typography>
                            <Typography gutterBottom>
                                รายละเอียด: {dataIssue?.description}
                            </Typography>
                            <Typography gutterBottom>
                                สถานะ: {dataIssue?.status}
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography gutterBottom>
                                ผู้แจ้ง : {dataIssue.employee?.fullname}
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography gutterBottom>
                                แผนก : {dataIssue.employee?.dV_Name}
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        ปิด
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}