import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { AcInterface } from "../models/IActivity";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function Activity() {
    const [activity, setAc] = React.useState<AcInterface[]>([]);

    const getAc = async () => {
        const apiUrl = "http://localhost:8080/Activities";
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
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
        { field: "id", headerName: "ID", width: 50 },
        { field: "Acname", headerName: "Name", width: 150 },
        { field: "date_s", headerName: "Date start", width: 150 },
        { field: "date_e", headerName: "Date end", width: 150 },
        { field: "time_s", headerName: "Time start", width: 150 },
        { field: "time_e", headerName: "Time end", width: 150 },
        { field: "Lname", headerName: "Location", width: 100 },
        { field: "TfirstName", headerName: "Teacher name", width: 150 },
        { field: "aname", headerName: "Admin Name", width: 150 },
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
                            Activity
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/Activitycreate"
                            variant="contained"
                            color="primary"
                        >
                            Create Activity
                        </Button>
                    </Box>
                </Box>
                <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
                    <DataGrid
                        rows={activity}
                        getRowId={(row) => row.ID}
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