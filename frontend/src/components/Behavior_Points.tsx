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

    const getBehaviorPoint = async () => {
        const apiUrl = "http://localhost:8080/behavior_points_show";
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
                    setBh(res.data);
                }
                else { console.log("NO DATA") }
            });
    };

    useEffect(() => {
        getBehaviorPoint();
    }, []);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ลำดับ", width: 50 },
        { field: "sfirstname", headerName: "ชื่อ", width: 120 },
        { field: "slastname", headerName: "นามสกุล", width: 120 },
        { field: "ptname", headerName: "ประเภทคะแนน", width: 150 },
        { field: "bppoint", headerName: "คะแนน", width: 150 },
        { field: "bpdetail", headerName: "รายละเอียด", width: 200 },
        { field: "btname", headerName: "ประเภท", width: 110 },
        { field: "aname", headerName: "ผู้บันทึก", width: 210 },
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
                            <div className="good-font">
                                คะแนนวินัย
                            </div>
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/Behavior_pointsCreate"
                            variant="contained"
                            color="primary"
                        >
                            <div className="good-font">
                                บันทึกคะแนนวินัย
                            </div>
                        </Button>
                    </Box>
                </Box>
                <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
                    <DataGrid
                        rows={bh}
                        // getRowId={(row) => row.ID}
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