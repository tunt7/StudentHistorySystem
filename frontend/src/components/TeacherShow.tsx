import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TInterface } from "../models/ITeacher";

function Teacher() {
    const [bh, setT] = React.useState<TInterface[]>([]);

    const getT = async () => {
        const apiUrl = "http://localhost:8080/Teachers_show";
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        await fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setT(res.data);
                }
                else {console.log("NO DATA")}
            });
    };

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "short_name", headerName: "Prefix", width: 80 },
        { field: "tfirst_name", headerName: "First Name", width: 160 },
        { field: "tlast_name", headerName: "Last Name", width: 160 },
        { field: "temail", headerName: "Email", width: 180 },
        { field: "tcontact", headerName: "Contact", width: 130 },
        { field: "brname", headerName: "Branch", width: 180 },
        { field: "aname", headerName: "Admin", width: 200 },
    ];

    useEffect(() => {
        getT();
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
                            Teacher
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/TCreate"
                            variant="contained"
                            color="primary"
                        >
                            Create Teacher
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

export default Teacher;
