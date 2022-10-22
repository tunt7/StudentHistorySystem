import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container"; 
import Box from "@mui/material/Box";
import { BranchInterface } from "../models/IBranch";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
 
function Branch() {
    const [Br, setBranch] = React.useState<BranchInterface[]>([]);

    const getBranch = async () => {
        const apiUrl = "http://localhost:8080/branches";
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
                setBranch(res.data);
            }
            else { console.log("NO DATA") }
        });
    }; 

    const columns: GridColDef[] = [  
        { field: "id", headerName: "ID", width: 50 },
        { field: "brname", headerName: "Branch", width: 260},
        { field: "contact", headerName: "Contact", width: 150 },        
        { field: "acaname", headerName: "Academy", width: 140 },     
        { field: "rname", headerName: "Room", width: 310 },
        { field: "aname", headerName: "Admin", width: 220},
       
    ];

    useEffect(() => {
        getBranch();
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
                            Branch
                        </Typography>
                    </Box>
                    <Box> 
                        <Button
                            component={RouterLink}
                            to="/branchcreate"
                            variant="contained"
                            color="primary"
                        >
                            Create Branch
                        </Button>
                    </Box>
                </Box>
                <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
                    <DataGrid
                        rows={Br}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </Container>
        </div>
    );
}

export default Branch;