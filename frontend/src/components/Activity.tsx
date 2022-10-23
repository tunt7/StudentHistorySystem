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
                else { console.log("NO DATA") }
            });
    };

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 30 },
        { field: "acname", headerName: "Name", width: 120 },
        { field: "date_s", headerName: "Date start", width: 200 },
        { field: "date_e", headerName: "Date end", width: 200 },
        { field: "lname", headerName: "Location", width: 100 },
        { field: "tfirst_name", headerName: "Teacher firstname", width: 140 },
        { field: "tlast_name", headerName: "Teacher lastname", width: 140 },
        { field: "aname", headerName: "Admin Name", width: 200 },
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
                            <div className="good-font">
                                Activity
                            </div>
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/Activitycreate"
                            variant="contained"
                            color="primary"
                        >
                            <div className="good-font">
                                Create Activity
                            </div>
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