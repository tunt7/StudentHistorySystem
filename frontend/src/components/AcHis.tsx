import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { AcHisInterface } from "../models/IAc_his";
import { DataGrid, GridColDef } from "@mui/x-data-grid";


function Activity_His() {
    const [Ac_his, setAc_his] = React.useState<AcHisInterface[]>([]);

    const getAc_his = async () => {
        const apiUrl = "http://localhost:8080/Ac_his";
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
        { field: "id", headerName: "ID", width: 120 },
        { field: "student_id", headerName: "SID", width: 120 },
        { field: "sfirstname", headerName: "First Name", width: 120 },
        { field: "slastname", headerName: "Last Name", width: 120 },
        { field: "acname", headerName: "Activity", width: 150 },
        { field: "achour", headerName: "Hour", width: 50 },
        { field: "date_s", headerName: "Date start", width: 200 },
        { field: "date_e", headerName: "Date end", width: 200 },
        
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
                            Activity History
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/Ac_hisCreate"
                            variant="contained"
                            color="primary"
                        >
                            Add Activity to student
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

export default Activity_His;