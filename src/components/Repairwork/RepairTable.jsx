/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useCallback, useEffect, useState } from 'react';
import Title from '../Header/Title';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button } from '@mui/material';
import RepairForm from './RepairForm';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DateTime } from 'luxon';

export default function RepairTable(props) {
    const { api } = props;
    const [rows, setRows] = useState([]);
    const [dataIssue, setDataIssue] = useState([]);
    const [commentText, setCommentText] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                return DateTime.fromISO(dataIssue?.createdAt).setLocale('th').toFormat('dd/MM/yyyy HH:mm:ss')
            },
        },
        { field: 'status_Name', headerName: 'status', width: 100 },
        {
            field: 'actions',
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

    ];


    const fetchComments = useCallback(async (i_ID) => {
        try {
            const response = await axios.get(api + 'CommentAPI/' + i_ID);
            console.log(response.data.result);
            setCommentText(response.data.result);
        } catch (error) {
            console.log(error.message);
        }
    }, [api]);


    const Review = async (i_ID) => {
        const data = await rows.find(row => row.i_ID === i_ID);
        setDataIssue(data);
    }

    // ในส่วนของ ShowData
    const ShowData = useCallback(async () => {
        const response = await axios.get(api + 'IssueAPI');
        const result = response.data.result
        if (response.status === 200) {
            const filteredData = result.filter(item => item.technicianId === null);
            const data = filteredData.map((item, index) => ({
                ...item,
                AutoId: index + 1
            }));

            setRows(data);
        }
    }, [api]);

    useEffect(() => {
        ShowData();
    }, [ShowData]);
    return (
        <>
            <RepairForm open={open} handleClose={handleClose} dataIssue={dataIssue} api={api} ShowData={ShowData} ></RepairForm>
            <Title>รายการแจ้งซ่อม</Title>
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