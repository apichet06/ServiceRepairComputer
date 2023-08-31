/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button } from '@mui/material';
import axios from 'axios';
import { DateTime } from 'luxon';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import RepairForm from '../Repairwork/RepairForm';
import Title from '../Header/Title';
import { DataGrid } from '@mui/x-data-grid';
import CommentIcon from '@mui/icons-material/Comment';
import CommentForm from './CommentForm';
import Swal from 'sweetalert2';
export default function CommentTable(props) {
    const { api } = props;
    const [rows, setRows] = useState([]);
    const [dataIssue, setDataIssue] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [open, setOpen] = useState(false);
    const [opencomment, setOpencomment] = useState(false);
    const [score, setScore] = useState(4);
    const [comment, setComment] = useState(false);

    const currentUtcTime = DateTime.utc(); // เวลา UTC ปัจจุบัน
    const thaiTime = currentUtcTime.setZone('Asia/Bangkok');



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const handleClickOpencomment = () => {
        setOpencomment(true);
    };

    const handleClosecomment = () => {
        setOpencomment(false);
    };



    const columns = [
        { field: 'AutoId', headerName: 'ID', width: 30 },
        { field: 'i_ID', headerName: 'หมายเลขแจ้งซ่อม', width: 130 },
        { field: 'title', headerName: 'เรื่อง', width: 130 },
        {
            field: 'categoryId'
            , headerName: 'อาการ',
            width: 190,
            valueGetter: (params) => {
                return params.row.category?.name
            }
        },
        {
            field: 'computerId', headerName: 'คอมพิวเตอร์', width: 180,
            valueGetter: (params) => {
                return params.row.computer?.name
            }
        },
        { field: 'description', headerName: 'รายละเอียด', width: 200 },
        {
            field: 'createdAt',
            headerName: 'วันที่แจ้ง',
            width: 200,
            valueGetter: (params) => {
                return DateTime.fromISO(params.row.createdAt).setLocale('th').toFormat('dd/MM/yyyy HH:mm:ss')
            },
        },
        { field: 'status_Name', headerName: 'status', width: 100 },
        {
            field: 'Review',
            headerName: 'Review',
            width: 90,
            sortable: false,
            renderCell: (params) => (
                <>
                    <Button onClick={() => { Review(params.row.i_ID), handleClickOpen() }} aria-label="Review">
                        <VisibilityIcon />
                    </Button>
                </>
            ),
        },
        {
            field: 'Comments',
            headerName: 'Comments',
            width: 90,
            sortable: false,
            renderCell: (params) => (
                <>
                    <Button onClick={() => { Rating(params.row.i_ID), handleClickOpencomment() }} aria-label="Review">
                        <CommentIcon />
                    </Button>
                </>
            ),
        },

    ];


    const Rating = async (i_ID) => {
        const data = await rows.find(row => row.i_ID === i_ID);
        setDataIssue(data);
    }

    const Review = async (i_ID) => {
        const data = await rows.find(row => row.i_ID === i_ID);
        setDataIssue(data);
    }

    const ShowData = useCallback(async () => {
        const response = await axios.get(api + 'IssueAPI');
        const result = response.data.result
        if (response.status === 200) {
            const filteredData = result.filter(item => item.employeeId === userData?.employeeId && item.status === '4'); // กรองข้อมูลเฉพาะ technicianId ที่เป็น null
            const data = filteredData.map((item, index) => ({
                ...item,
                AutoId: index + 1
            }));

            setRows(data)
        }

    }, [api, userData?.employeeId]);

    const handleSave = async () => {

        // console.log(score, comment, dataIssue.i_ID);
        const formData = new FormData();
        formData.append('status', 5);

        const date = thaiTime.setZone('Asia/Bangkok').toFormat('yyyy-MM-dd HH:mm:ss')

        const FormDataComment = new FormData();
        FormDataComment.append('score', score)
        FormDataComment.append('Contents', comment)
        FormDataComment.append('EmployeeId', dataIssue.employeeId)
        FormDataComment.append('I_ID', dataIssue.i_ID)
        FormDataComment.append('CreatedAt', date)

        await axios.put(api + 'IssueAPI/' + dataIssue.id, formData)
        await axios.post(api + 'CommentAPI', FormDataComment)
            .then((response) => {

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                handleClosecomment()
                ShowData();
                setScore(4)
            }).catch((error) => {
                console.log(error.message);
            });

    }

    useEffect(() => {
        ShowData();
    }, [ShowData]);
    return (
        <>
            <CommentForm handleClosecomment={handleClosecomment} opencomment={opencomment}
                score={score} setScore={setScore} setComment={setComment} handleSave={handleSave}></CommentForm>
            <RepairForm open={open} handleClose={handleClose} dataIssue={dataIssue} api={api} ShowData={ShowData} ></RepairForm>
            <Title>งานซ่อมของฉัน</Title>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>
        </>);
}