
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
    Assignment as AssignmentIcon,
    Diversity2 as Diversity2Icon,
    ListAlt as ListAltIcon,
    ImportantDevices as ImportantDevices
} from '@mui/icons-material';



import { Link } from 'react-router-dom';

export const mainListItems = (
    <>
        <ListItemButton component={Link} to="/Dashboard">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Repair">
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="แจ้งซ่อม" />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
        <ListSubheader component="div" inset>
            ส่วนของผู้ดูแลระบบ
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
    </>
);

export const secondaryListItems = (
    <>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItemButton>
    </>
);