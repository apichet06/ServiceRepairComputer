/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Rating, Step, StepLabel, Stepper, Typography } from "@mui/material";
import axios from "axios";
import { DateTime } from 'luxon';
import { useCallback, useEffect } from "react";
import { useState } from "react";

export default function FormReview(props) {
    const { dataIssue, handleClose, open, api } = props;
    const [enumName, setEnumName] = useState([]);
    const [enumValue, setEnumValue] = useState([]);
    const [value, setValue] = useState(0);

    const [commentText, setCommentText] = useState([]);
    // หา Index ปัจจุบันของ Status ที่กำลังแสดงอยู่
    const currentIndex = enumName.indexOf(dataIssue?.status_Name);
    // console.log(dataIssue?.computer?.com_image);
    // หา Index ของ Status ถัดไป 
    const nextIndex = (currentIndex + 1) % enumName.length;

    // นำ Index ของ Status ถัดไปมาใช้ในการค้นหาชื่อ Status และ Values 
    const nextStatusValue = nextIndex === 0 ? 6 : enumValue[nextIndex];

    const fetchEnum = useCallback(async () => {
        try {
            const response = await axios.get(api + 'IssueAPI/enumvalues');
            if (response.data.isSuccess) {
                setEnumName(response.data.result.names);
                setEnumValue(response.data.result.values)
            }
        } catch (error) {
            console.error('Error fetching enum values:', error);
        }
    }, [api]);

    const fetchComments = useCallback(async () => {
        await axios.get(api + 'CommentAPI/' + dataIssue?.i_ID)
            .then((response) => {
                // console.log(response.data.result);
                setCommentText(response.data.result)
                setValue(response.data.result.score)
            }).catch((error) => {
                setValue(0)
            })
    }, [api, dataIssue?.i_ID])

    useEffect(() => {
        fetchEnum()
        fetchComments()
    }, [fetchEnum, fetchComments]);

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="lg">
                <DialogTitle> ID: {dataIssue?.i_ID}</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Box sx={{ width: '100%' }}>
                                <Stepper activeStep={nextStatusValue} alternativeLabel>
                                    {enumName.map((label) => (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
                        <Grid item xs={11} sm={11}>
                            <h2> เรื่อง : {dataIssue?.title} </h2>
                        </Grid>
                        <Grid item xs={5} >
                            <Typography gutterBottom>
                                <strong>คอมพิวเตอร์:</strong> {dataIssue.computer?.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={5} sm={5}>
                            <Typography gutterBottom>
                                <strong>S/N:</strong> {dataIssue.computer?.serialNumber}
                            </Typography>
                        </Grid>
                        <Grid item xs={5} sm={5}>
                            <Typography gutterBottom>
                                <strong>รายละเอียด:</strong> {dataIssue.computer?.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography gutterBottom>
                                <strong>อาการเสีย:</strong> {dataIssue.category?.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography gutterBottom>
                                <strong>อารการเพิ่มเติม:</strong> {dataIssue?.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography gutterBottom>
                                <strong >วันที่แจ้งซ่อม:</strong> {DateTime.fromISO(dataIssue?.createdAt).setLocale('th').toFormat('dd/MM/yyyy HH:mm:ss')}
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography gutterBottom>
                                <strong>สถานะ:</strong> {dataIssue?.status_Name}
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography gutterBottom>
                                <strong>รายละเอียดการซ่อม:</strong> {dataIssue?.comment ? dataIssue?.comment : "-"}
                            </Typography>
                        </Grid>
                    </Grid>
                    <hr />
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
                        <Grid item xs={5} >

                            <strong > ผู้แจ้ง :</strong> {dataIssue.employee?.fullname}

                        </Grid>
                        <Grid item xs={5}>

                            <strong >แผนก :</strong> {dataIssue.employee?.dV_Name}

                        </Grid>
                        <Grid item xs={5}>

                            <strong >รับงานซ่อมโดย :</strong> {dataIssue.technician?.fullname ? dataIssue.technician?.fullname : "-"}

                        </Grid>
                        <Grid item xs={5}>

                            <strong >แผนก :</strong> {dataIssue.technician?.dV_Name ? dataIssue.technician?.dV_Name : "-"}

                        </Grid>
                    </Grid>
                    <hr />
                    <Grid container direction="row" alignItems="center" style={{ fontSize: '14px' }} spacing={1}>
                        <Grid item xs={3}>
                            รับงาน:{dataIssue?.receiveAt ? DateTime.fromISO(dataIssue?.receiveAt).setLocale('th').toFormat('dd/MM/yyyy HH:mm:ss') : "-"}
                        </Grid>
                        <Grid item xs={3}>
                            เริ่มงาน:{dataIssue?.startJobAt ? DateTime.fromISO(dataIssue?.startJobAt).setLocale('th').toFormat('dd/MM/yyyy HH:mm:ss') : "-"}
                        </Grid>
                        <Grid item xs={3}>
                            ปิดงาน:{dataIssue?.endJobAt ? DateTime.fromISO(dataIssue?.endJobAt).setLocale('th').toFormat('dd/MM/yyyy HH:mm:ss') : "-"}
                        </Grid>
                        <Grid item xs={3}>
                            ส่งงาน:{dataIssue?.sendJobAt ? DateTime.fromISO(dataIssue?.sendJobAt).setLocale('th').toFormat('dd/MM/yyyy HH:mm:ss') : "-"}
                        </Grid>
                    </Grid>
                    <hr />
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
                        <Grid item xs={6}>
                            <Box sx={{ color: 'success.main' }}>รูปภาพทรัพย์สิน</Box>
                            <Typography gutterBottom>

                                {dataIssue?.computer?.com_image != "null" ? (
                                    <img src={api + 'IssueAPI/' + dataIssue?.computer?.com_image} width="40%" alt={`Issue Image for ${dataIssue?.i_ID}`} />
                                ) : (<img src="./image/noimage.jpg" width="40%" />)}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ color: 'secondary.main' }}>รูปภาพที่ผู้ใช้แจ้งซ่อม</Box>
                            <Typography gutterBottom>

                                {dataIssue?.path_Images ? (
                                    <img src={api + 'IssueAPI/' + dataIssue?.path_Images} width="40%" alt={`Issue Image for ${dataIssue?.i_ID}`} />
                                ) : <img src="./image/noimage.jpg" width="40%" />}
                            </Typography>
                        </Grid>
                    </Grid>

                    {nextStatusValue === 6 && (
                        <>
                            <hr />
                            <Grid container justifyContent="center" direction="row" spacing={{ xs: 2, md: 1 }}>
                                <Grid item xs={10}>
                                    <Box sx={{ width: '100%' }}>
                                        <Typography component="legend">Rating</Typography>
                                        <Rating name="read-only" value={value} readOnly />
                                    </Box>
                                </Grid>

                                <Grid item xs={10}>
                                    ความคิดเห็น: {commentText?.contents ? commentText?.contents : '-'}
                                </Grid>

                            </Grid>

                        </>
                    )}

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