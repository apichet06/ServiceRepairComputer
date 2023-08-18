/* eslint-disable react/prop-types */

import { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import FormDivision from './FormDivision';
import Titled from '../Header/Title';
import Swal from 'sweetalert2';
export default function DivisionTable(props) {

    const { api } = props;
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState(null);

    const [dV_name, setDV_Name] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const fetchDivisionData = useCallback(async () => {
        try {
            const response = await axios.get(`${api}DivisionAPI`);
            const result = response.data.result;

            if (result) {
                const formattedData = result.map((item, index) => ({
                    ...item,
                    AutoId: index + 1,
                }));

                setRows(formattedData);
            }
        } catch (error) {
            console.error('Error fetching division data:', error);
            // สามารถเพิ่มการจัดการข้อผิดพลาดเพิ่มเติมตามที่ต้องการ
        }
    }, [api]);


    const handleSave = async () => {

        try {
            if (!editId) {
                // ส่งข้อมูลไปยัง API เพื่อบันทึก
                const response = await axios.post(api + 'DivisionApi', { 'dV_name': dV_name });

                handleClose(); // ปิด Dialog

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });

                fetchDivisionData();
            } else {
                // ส่งข้อมูลไปยัง API เพื่อแก้ไข
                const response = await axios.put(api + 'DivisionApi/' + editId, { 'dV_name': dV_name });

                handleClose(); // ปิด Dialog

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });

                // อัปเดตข้อมูลใน DataGrid
                fetchDivisionData();
            }
        } catch (error) {
            console.error('Error saving data:', error);

            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
            });
        }


    }

    const handleEdit = ((id) => {
        const division = (rows.find(row => row.id === id));
        setEditData(division);
        // console.log(division.dV_Name);
        setDV_Name(division?.dV_Name)
        setEditId(id)
    })


    const handleDelete = (async (id) => {
        try {
            const result = await Swal.fire({
                title: 'ยืนยันการลบ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'ปิด',
                confirmButtonText: 'ลบ!'
            });

            if (result.isConfirmed) {
                const response = await axios.delete(api + 'DivisionApi/' + id);

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });

                fetchDivisionData();
            }
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    });

    const columns = [
        { field: 'AutoId', headerName: 'ID', width: 70 },
        { field: 'dV_ID', headerName: 'รหัสแผนก', width: 130 },
        { field: 'dV_Name', headerName: 'ชื่อแผนก', width: 130 },
        {
            field: 'actions',
            headerName: 'การจัดการ',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => { handleEdit(params.id), handleClickOpen() }} aria-label="edit">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.id)} aria-label="delete">
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </>
            ),
        },
    ];

    useEffect(() => {
        fetchDivisionData();
    }, [fetchDivisionData]);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <Button variant="contained" onClick={() => { handleClickOpen(); handleEdit(null); }}>
                    เพิ่มข้อมูล
                </Button>
            </div>
            <div>
                <Titled>รายการข้อมูลแผนก</Titled>
            </div>
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
            <FormDivision open={open} handleClose={handleClose} handleSave={handleSave} editData={editData} editId={editId} setDV_Name={setDV_Name}></FormDivision>
        </>
    );
}