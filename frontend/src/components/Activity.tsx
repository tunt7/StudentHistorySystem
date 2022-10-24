import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { AcInterface } from "../models/IActivity";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import moment from 'moment'

function Activity() {
    const [activity, setAc] = React.useState<AcInterface[]>([]);

    const getAc = async () => {
        const apiUrl = "http://localhost:8080/Activities_show";
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
        };

        await fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setAc(res.data);
                }
                else {console.log("NO DATA")}
            });
    };

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 30 },
        { field: "acname", headerName: "ชื่อกิจกรรม", width: 150 },
        { field: "date_s", headerName: "วันเริ่มกิจกรรม", width: 200, 
            renderCell:(params) => moment(params.row.date_s).format('yyyy-MM-DD-dd HH:mm')},
        { field: "date_e", headerName: "วันสิ้นสุดกิจกรรม", width: 200,
            renderCell:(params) => moment(params.row.date_e).format('yyyy-MM-DD-dd HH:mm')},
        { field: "lname", headerName: "สถานที่", width: 120 },
        { field: 'Full name',
            headerName: 'อาจารย์ที่ดูแลกิจกรรม',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params: GridValueGetterParams) =>
              `${params.row.tfirst_name || ''} ${params.row.tlast_name || ''}`,},
        { field: "aname", headerName: "ผู้บันทึก", width: 200 },
        
    ];

    useEffect(() => {
        getAc();
    }, []);

    return (
        <div>
            <Container maxWidth="lg">
                <Box
                    display="flex"
                    sx={{
                        marginTop: 2,
                    }}
                >
                    <Box flexGrow={1}>
                        <Typography
                            component="h2"
                            variant="h6"
                            color="primary"
                            gutterBottom
                        >
                            ข้อมูลกิจกรรม
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/Activitycreate"
                            variant="contained"
                            color="primary"
                        >
                            เพิ่มกิจกรรม
                        </Button>
                    </Box>
                </Box>
                <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
                    <DataGrid
                        rows={activity}
                        //getRowId={(row) => row.ID}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </Container>
        </div>
    );
}

export default Activity;
