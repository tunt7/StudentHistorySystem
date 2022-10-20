import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"; 
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { AdminInterface } from "../models/IAdmin";
import { BranchInterface } from "../models/IBranch";
import { RoomInterface } from "../models/IRoom";
import { AcademyInterface } from "../models/IAcademy";
import { Avatar } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BrCreate() {
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const [admin, setAdmin] = React.useState<AdminInterface[]>([]);
    const [academy, setAcademy] = React.useState<AcademyInterface[]>([]);
    const [room, setRoom] = React.useState<RoomInterface[]>([]);
    const [branch, setBranch] = React.useState<BranchInterface>({});
    const [brname, setBrname] = React.useState<string>("");
    const [contact, setContact] = React.useState<string>("");
    
    const apiUrl = "http://localhost:8080";
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    }; 

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof BrCreate;
        const { value } = event.target;
        setBranch({ ...branch, [id]: value });
    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof branch;
        setBranch({
            ...branch,
            [name]: event.target.value,
        });
    };
         
    const getAcademy = async () => {
        fetch(`${apiUrl}/academies`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setAcademy(res.data);
                }
                else { console.log("NO DATA") }
            });
    };
    
    const getRoom = async () => {
        fetch(`${apiUrl}/rooms`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setRoom(res.data);
                }
                else { console.log("NO DATA") }
            });
    };

    const getAdmin = async () => {
        fetch(`${apiUrl}/admins`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setAdmin(res.data);
                }
                else { console.log("NO DATA") }
            });
    };
    
    useEffect(() => {
        getAcademy();
        getRoom();
        getAdmin();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
        
            Brname: brname,
            Contact: contact,
            AdminID: convertType(branch.AdminID), 
            AcademyID: convertType(branch.AcademyID),
            RoomID: convertType(branch.RoomID),
            
        };

        console.log(JSON.stringify(data))

        const requestOptions = { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };

        fetch(`${apiUrl}/branches`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setSuccess(true);
                    setErrorMessage("")
                } else {
                    setError(true);
                    setErrorMessage(res.error)
                }
            });
    }

    return (
        <Container maxWidth="md">                      
            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity="success">
                    บันทึกข้อมูลสำเร็จ
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    บันทึกข้อมูลไม่สำเร็จ
                </Alert>
            </Snackbar>
            <Paper>
                <Box
                    display="flex"
                    sx={{
                        marginTop: 2,
                    }}
                >
                    <Box sx={{ paddingX: 2, paddingY: 1 }}>
                        <Typography
                            component="h2"
                            variant="h6"
                            color="primary"
                            gutterBottom
                        >
                            Create Branch
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>สาขา</p>
                            <TextField
                                id="brname"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={branch.Brname}
                                onChange={(event) => setBrname(event.target.value)}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>ช่องทางติดต่อ</p>
                            <TextField
                                id="brname"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={branch.Contact}
                                onChange={(event) => setContact(event.target.value)}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>ผู้บันทึก</p>
                            <Select
                                native
                                value={branch.AdminID + ""}
                                onChange={handleChange} 
                                inputProps={{
                                    name: "AdminID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    เลือกผู้บันทึก
                                </option>
                                {admin.map((item: AdminInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Aname}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>สำนักวิชา</p>
                            <Select
                                native
                                value={branch.AcademyID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "AcademyID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    เลือกสำนักวิชา
                                </option>
                                {academy.map((item: AcademyInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Acaname}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>ห้องประจำสาขา</p>
                            <Select
                                native
                                value={branch.RoomID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "RoomID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    เลือกห้องประจำสาขา
                                </option>
                                {room.map((item: RoomInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Rname}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                   

                    <Grid item xs={12}>
                        <Button component={RouterLink} to="/" variant="contained">
                            Back
                        </Button>
                        <Button
                            style={{ float: "right" }}
                            onClick={submit}
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default BrCreate;