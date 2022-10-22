import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { STDInterface } from "../models/IStudent";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function Student() {
    const [std, setStd] = React.useState<STDInterface[]>([]);

    const getStd = async () => {
        const apiUrl = "http://localhost:8080/students";
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };

        await fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setStd(res.data);
                }
                else {console.log("NO DATA")}
            });
    };

    const columns: GridColDef[] = [
        { field: "ลำดับ", headerName: "ID", width: 50 },
        { field: "sfirstname", headerName: "ชื่อ", width: 200 },
        { field: "slastname", headerName: "นามสกุล", width: 200 },
        { field: "elname", headerName: "ระดับการศึกษา", width: 200 },
    ];

    useEffect(() => {
        getStd();
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
                            Student
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/StudentCreate"
                            variant="contained"
                            color="primary"
                        >
                            เพิ่มข้อมูลนักศึกษา
                        </Button>
                    </Box>
                </Box>
                <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
                    <DataGrid
                        rows={std}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </Container>
        </div>
    );
}

export default Student;