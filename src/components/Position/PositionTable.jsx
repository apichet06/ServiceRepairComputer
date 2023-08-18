/* eslint-disable react/prop-types */

import { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import FormPosition from './FormPosition';
import Titled from '../Header/Title';
import Swal from 'sweetalert2';
export default function PostionTable(props) {

    const { api } = props;
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState(null);
    const [divisionList, setDivisionList] = useState([]);


    const [P_name, setP_Name] = useState('');
    const [dV_ID, setDv_ID] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(`${api}PositionAPI`);
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

    const fetchDataDivisions = useCallback(async () => {
        try {
            const response = await axios.get(api + 'DivisionAPI');
            if (response) {
                setDivisionList(response.data.result)
            }
        } catch (error) {
            console.log(error);
        }

    }, [api]);


    const handleSave = async () => {
        try {

            const data = {
                dV_ID: dV_ID,
                P_name: P_name,
            }

            if (!editId) {
                // ส่งข้อมูลไปยัง API เพื่อบันทึก
                const response = await axios.post(api + 'PositionAPI', data);

                handleClose(); // ปิด Dialog
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });

                fetchData();
            } else {
                // ส่งข้อมูลไปยัง API เพื่อแก้ไข
                const response = await axios.put(api + 'PositionAPI/' + editId, data);

                handleClose(); // ปิด Dialog

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });

                // อัปเดตข้อมูลใน DataGrid
                fetchData();
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
        const position = (rows.find(row => row.id === id));
        setEditData(position);
        setP_Name(position?.p_Name);
        setDv_ID(position?.dV_ID)
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
                const response = await axios.delete(api + 'PositionAPI/' + id);

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });

                fetchData();
            }
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    });

    const columns = [
        { field: 'AutoId', headerName: 'ID', width: 70 },
        { field: 'p_ID', headerName: 'รหัสตำแหน่ง', width: 130 },
        { field: 'p_Name', headerName: 'ชื่อตำแหน่ง', width: 130 },
        { field: 'dV_ID', headerName: 'รหัสตำแหน่ง', width: 130 },
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
        fetchData();
        fetchDataDivisions();
    }, [fetchData, fetchDataDivisions]);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <Button variant="contained" onClick={() => { handleClickOpen(); handleEdit(null); }}>
                    เพิ่มข้อมูล
                </Button>
            </div>
            <div>
                <Titled>รายการข้อมูลตำแหน่งงาน</Titled>
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
            <FormPosition
                open={open} handleClose={handleClose} handleSave={handleSave} editData={editData}
                editId={editId} setP_Name={setP_Name} divisionList={divisionList} P_name={P_name} setDv_ID={setDv_ID}
            ></FormPosition>
        </>
    );
}