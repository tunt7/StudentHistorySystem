import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { AcHisInterface } from "../models/IAc_his";
import { DataGrid, GridColDef } from "@mui/x-data-grid";


function Activity_His_sum() {
    const [Ac_his, setAc_his] = React.useState<AcHisInterface[]>([]);

    const getAc_his = async () => {
        const apiUrl = "http://localhost:8080/Ac_his_sum";
        const requestOptions = {
            method: "GET",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" },
        };

        await fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setAc_his(res.data);
                }
                else {console.log("NO DATA")}
            });
    };

    const columns: GridColDef[] = [
        { field: "id", headerName: "ลำดับ", width: 120 },
        { field: "sfirstname", headerName: "ชื่อ", width: 330 },
        { field: "slastname", headerName: "นามสกุล", width: 330 },
        { field: "achour", headerName: "จำนวนชั่วโมงรวม", width: 130 },
        
    ];

    useEffect(() => {
        getAc_his();
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
                            รวมชั่วโมงจิตอาสา
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/Ac_his"
                            variant="contained"
                            color="primary"
                        >
                            <div className="good-font-white">
                                กลับ
                            </div>
                        </Button>
                    </Box>
                </Box>
                <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
                    <DataGrid
                        rows={Ac_his}
                        // getRowId={(row: any) =>  row.id}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </Container>
        </div>
    );
}

export default Activity_His_sum;