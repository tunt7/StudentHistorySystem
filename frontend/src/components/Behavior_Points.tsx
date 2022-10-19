import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { BHInterface } from "../models/IBehavior_Point";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function Behavior_Points() {
    const [bh, setBh] = React.useState<BHInterface[]>([]);

    const getBh = async () => {
        const apiUrl = "http://localhost:8080/behavior_points_show";
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };

        await fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setBh(res.data);
                }
                else {console.log("NO DATA")}
            });
        };
        
        useEffect(() => {
            getBh();
        }, []);
        
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "sfirstname", headerName: "First Name", width: 120 },
        { field: "slastname", headerName: "Last Name", width: 120 },
        { field: "ptname", headerName: "Point Type", width: 100 },
        { field: "bppoint", headerName: "Point", width: 50 },
        { field: "bpdetail", headerName: "Detail", width: 150 },
        { field: "btname", headerName: "Behavior Type", width: 110 },
        { field: "aname", headerName: "Admin Name", width: 200 },
    ];


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
                            Behavior Points
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/BHcreate"
                            variant="contained"
                            color="primary"
                        >
                            Create Behavior Point
                        </Button>
                    </Box>
                </Box>
                <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
                    <DataGrid
                        rows={bh}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </Container>
        </div>
    );
}

export default Behavior_Points;
