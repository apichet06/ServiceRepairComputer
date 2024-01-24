import React, { useEffect, useState } from 'react';
import {
    Divider,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Category as CategoryIcon,
    Layers as LayersIcon,
    Diversity2 as Diversity2Icon,
    ListAlt as ListAltIcon,
    ImportantDevices as ImportantDevices,
    Construction as ConstructionIcon,
    PrecisionManufacturing as PrecisionManufacturingIcon,
    Comment as CommentIcon
} from '@mui/icons-material';

import { Link } from 'react-router-dom';

const MainListItems = () => {
    const [Sessionlogin, setSessionlogin] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        setSessionlogin(userData);
    }, []);

    return (
        <>
            <ListItemButton component={Link} to="/Dashboard">
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <Divider />
            <ListSubheader component="div" inset>
                ผู้แจ้ง
            </ListSubheader>
            <ListItemButton component={Link} to="/Repair">
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="แจ้งซ่อม" />
            </ListItemButton>
            <ListItemButton component={Link} to="/Comment">
                <ListItemIcon>
                    <CommentIcon />
                </ListItemIcon>
                <ListItemText primary="ประเมินงานซ่อม" />
            </ListItemButton>
            <Divider />
            {Sessionlogin?.status == "Admin" || Sessionlogin?.status == "พนักงานซ่อม" ?
                <>
                    <ListSubheader component="div" inset>
                        งานซ่อม
                    </ListSubheader>
                    <ListItemButton component={Link} to="/Repairwork">
                        <ListItemIcon>
                            <ConstructionIcon />
                        </ListItemIcon>
                        <ListItemText primary="รับงานซ่อม" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/OwnWork">
                        <ListItemIcon>
                            <PrecisionManufacturingIcon />
                        </ListItemIcon>
                        <ListItemText primary="งานที่รับ" />
                    </ListItemButton>
                    <Divider />
                </> : ""}
            {Sessionlogin?.status === "Admin" ?
                <>
                    <ListSubheader component="div" inset>
                        ผู้ดูแลระบบ
                    </ListSubheader>
                    <ListItemButton component={Link} to="/Division">
                        <ListItemIcon>
                            <Diversity2Icon />
                        </ListItemIcon>
                        <ListItemText primary="แผนก" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Position">
                        <ListItemIcon>
                            <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="ตำแหน่ง" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Employee" >
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="ผู้ใช้ระบบ" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Computer" >
                        <ListItemIcon>
                            <ImportantDevices />
                        </ListItemIcon>
                        <ListItemText primary="คอมพิวเตอร์" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Category" >
                        <ListItemIcon>
                            <CategoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="หัวข้อปัญหา" />
                    </ListItemButton>
                </> : ""}
        </>
    );
};

export default MainListItems;




