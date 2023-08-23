/* eslint-disable react/prop-types */
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Titled from '../Header/Title';
import FormComputer from './FormComputer';

export default function ComputerTable(props) {
    const { api } = props;
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState('');
    const [editId, setEditId] = useState('');
    const [editData, setEditData] = useState('');
    const [name, setName] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [description, setDescription] = useState('');



    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const showComputer = useCallback(async () => {
        try {

            const response = await axios.get(`${api}ComputerAPI`);
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
                text: 'เกิดข้อผิดพลาดในการดึงข้อมูลคอมพิวเตอร์',
            });
        }
    }, [api]);


    useEffect(() => {
        showComputer();
    }, [showComputer]);

    const columns = [
        { field: 'runAutoId', headerName: 'ID', width: 70 },
        { field: 'computerId', headerName: 'รหัสคอมพิวเตอร์', width: 130 },
        { field: 'name', headerName: 'name', width: 160 },
        { field: 'serialNumber', headerName: 'serialNumber', width: 190 },
        { field: 'description', headerName: 'รายละเอียด', width: 250 },
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
        const computer = rows.find(row => row.id === id);
        setEditData(computer)
        setName(computer?.name)
        setSerialNumber(computer?.serialNumber)
        setDescription(computer?.discription)
        setEditId(id)
    }
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
                const response = await axios.delete(api + 'ComputerAPI/' + id);

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                showComputer();
            }
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }

    const handleSave = async () => {
        try {

            const data = {
                name: name,
                serialNumber: serialNumber,
                description: description
            }

            if (editId) {
                if (name && serialNumber && description) {
                    const response = await axios.put(api + 'ComputerAPI/' + editId, data);
                    if (response.status === 200) {
                        handleClose(); // ปิด Dialog 
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: response.data.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        showComputer();
                    }
                }
            } else {

                if (name && serialNumber && description) {

                    const response = await axios.post(api + 'ComputerAPI', data);
                    if (response.status === 200) {
                        handleClose(); // ปิด Dialog 
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: response.data.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        showComputer();
                    }

                }
            }

        } catch (error) {
            handleClose(); // ปิด Dialog 
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'เกิดข้อผิดพลาดในการดึงข้อมูลคอมพิวเตอร์',
            });
        }
    }

    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                    <Button variant="contained" onClick={() => { handleClickOpen(); handleEdit(null); }}>
                        เพิ่มข้อมูล
                    </Button>
                </div>
                <div>
                    <Titled>รายการข้อมูลComputer</Titled>
                </div>
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
            <FormComputer open={open} handleClose={handleClose} editId={editId} handleSave={handleSave} editData={editData} setName={setName}
                setSerialNumber={setSerialNumber} setDescription={setDescription} />
        </>
    );
}
