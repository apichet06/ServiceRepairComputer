/* eslint-disable react/prop-types */

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FormDialog from './Form';
import Swal from 'sweetalert2';
import Titled from '../Header/Title';
export default function DataTable(props) {
    const { api } = props;

    const [Title, setTitle] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Username, setUsername] = useState('');
    const [Email, setEmail] = useState('');
    const [Status, setStatus] = useState('');
    const [selectedDivision, setselectedDivision] = useState('');
    const [selectedPosition, setselectedPosition] = useState('');

    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    // แก้ไขข้อมูล
    const [editData, setEditData] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        if (selectedDivision && selectedPosition) {
            const newData = {
                Title: Title,
                FirstName: FirstName,
                LastName: LastName,
                Username: Username,
                Email: Email,
                DV_ID: selectedDivision, // ดึง DV_ID จาก selectedDivision
                P_ID: selectedPosition,
                Status: Status
            };

            try {
                if (!editId) {
                    // ส่งข้อมูลไปยัง API เพื่อบันทึก
                    const response = await axios.post(api + 'EmployeeApi', newData);

                    handleClose(); // ปิด Dialog

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    });

                    showUser();
                } else {
                    // ส่งข้อมูลไปยัง API เพื่อแก้ไข
                    const response = await axios.put(api + 'EmployeeApi/' + editId, newData);

                    handleClose(); // ปิด Dialog

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    });

                    // อัปเดตข้อมูลใน DataGrid
                    showUser();
                }
            } catch (error) {
                console.error('Error saving data:', error);

                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
                });
            }
        } else {
            console.log('กรุณาเลือกแผนกและตำแหน่ง');
        }
    };


    const showUser = useCallback(async () => {
        try {
            const response = await axios.get(`${api}EmployeeAPI`);
            const result = response.data.result;

            if (result) {
                const newData = result.map((item, index) => ({
                    ...item,
                    runAutoId: index + 1,
                }));
                setRows(newData);
            }
        } catch (error) {
            // console.error('Error fetching data:', error);
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้',
            });
        }
    }, [api]);


    useEffect(() => {
        showUser();
    }, [showUser]);

    const columns = [
        { field: 'runAutoId', headerName: 'ID', width: 70 },
        { field: 'employeeId', headerName: 'รหัสพนักงาน', width: 170 },
        { field: 'fullname', headerName: 'ชื่อเต็ม', width: 200 },
        { field: 'username', headerName: 'ชื่อผู้ใช้', width: 150 },
        { field: 'email', headerName: 'อีเมล', width: 200 },
        { field: 'dV_Name', headerName: 'แผนก', width: 150 },
        { field: 'p_Name', headerName: 'ตำแหน่ง', width: 150 },
        { field: 'status', headerName: 'สถานะ', width: 120 },
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

    const handleEdit = (id) => {
        const employee = (rows.find(row => row.id === id));
        setEditData(employee)
        setEditId(id)
        setTitle(employee?.title);
        setFirstName(employee?.firstName);
        setLastName(employee?.lastName);
        setUsername(employee?.username);
        setEmail(employee?.email);
        setStatus(employee?.status);
        setselectedDivision(employee?.dV_ID);
        setselectedPosition(employee?.p_ID);
    };

    const handleDelete = async (id) => {
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
                const response = await axios.delete(api + 'EmployeeApi/' + id);

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });

                showUser();
            }
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <Button variant="contained" onClick={() => { handleClickOpen(); handleEdit(null); }}>
                    เพิ่มข้อมูล
                </Button>
            </div>
            <div>
                <Titled>รายการข้อมูลพนักงาน</Titled>
            </div>
            <div style={{ height: '400px', width: '100%' }}>

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
            <FormDialog
                open={open}
                editData={editData}
                handleClose={handleClose}
                api={api}
                editId={editId}
                handleSave={handleSave}
                setTitle={setTitle}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setUsername={setUsername}
                setEmail={setEmail}
                setStatus={setStatus}
                setselectedDivision={setselectedDivision}
                setselectedPosition={setselectedPosition}
            />
        </>

    );
}
