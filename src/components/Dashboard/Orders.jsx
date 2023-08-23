/* eslint-disable react/prop-types */

import { useCallback, useEffect, useState } from 'react';
import Title from '../Header/Title';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button } from '@mui/material';
import FormReview from './FormReview';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Orders(props) {
    const { api } = props;
    const [rows, setRows] = useState([]);
    const [dataIssue, setDataIssue] = useState([]);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columns = [
        { field: 'AutoId', headerName: 'ID', width: 70 },
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
        { field: 'description', headerName: 'รายละเอียด', width: 270 },
        { field: 'status', headerName: 'status', width: 130 },
        {
            field: 'actions',
            headerName: 'Review',
            width: 150,
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

    const Review = async (i_ID) => {
        const data = await rows.find(row => row.i_ID === i_ID);
        console.log(data);
        setDataIssue(data);
    }


    const ShowData = useCallback(async () => {
        const response = await axios.get(api + 'IssueAPI');
        const result = response.data.result
        if (response.status === 200) {
            const data = result.map((item, index) => ({
                ...item,
                AutoId: index + 1
            }));

            setRows(data)
        }

    }, [api]);

    useEffect(() => {
        ShowData();
    }, [ShowData]);
    return (
        <>
            <FormReview open={open} handleClose={handleClose} dataIssue={dataIssue}></FormReview>
            <Title>Recent Orders</Title>
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

        </>
    );
}