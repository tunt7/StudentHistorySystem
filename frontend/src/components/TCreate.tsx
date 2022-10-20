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

import { TInterface } from "../models/ITeacher";
import { AdminInterface } from "../models/IAdmin";
import { BranchInterface } from "../models/IBranch";
import { PreInterface } from "../models/IPrefix";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TCreate() {
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const [admin, setAdmin] = React.useState<AdminInterface[]>([]);
    const [prefix, setPrefix] = React.useState<PreInterface[]>([]);
    const [branch, setBranch] = React.useState<BranchInterface[]>([]);
    const [teacher, setTeacher] = React.useState<TInterface>({ 
        FirstName:"",
        LastName:"",
        Email:"",
        Contact:"",
    });

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
        const id = event.target.id as keyof typeof TCreate;
        const { value } = event.target;
        setTeacher({ ...teacher, [id]: value });
    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof teacher;
        setTeacher({
            ...teacher,
            [name]: event.target.value,
        });
    };

    const getPrefix = async () => {
        fetch(`${apiUrl}/prefixes`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setPrefix(res.data);
                }
                else { console.log("NO DATA") }
            });
    };
    
    const getBranch = async () => {
        fetch(`${apiUrl}/branches`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setBranch(res.data);
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
        getBranch();
        getPrefix();
        getAdmin();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
            FirstName: teacher.FirstName ?? "",
            LastName: teacher.LastName ?? "",
            Email: teacher.Email ?? "",
            Contact: teacher.Contact ?? "",
            
            AdminID: convertType(teacher.AdminID),
            PrefixID: convertType(teacher.PrefixID),
            BranchID: convertType(teacher.BranchID),
        };

        console.log(data)

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };

        fetch(`${apiUrl}/teachers`, requestOptions)
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
                            Create Teacher
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>

                    <Grid item xs={2}>
                        <FormControl fullWidth variant="outlined">
                            <p> Title Of Name </p>
                            <Select
                                native
                                value={teacher.PrefixID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "PrefixID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    -title-
                                </option>
                                {prefix.map((item: PreInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.short_name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={5}>
                        <FormControl fullWidth variant="outlined">
                            <p>First Name</p>
                            <TextField
                                id="firstname"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={teacher.FirstName}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={5}>
                        <FormControl fullWidth variant="outlined">
                            <p>Last Name</p>
                            <TextField
                                id="lastname"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={teacher.LastName}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={7}>
                        <FormControl fullWidth variant="outlined">
                            <p>Email</p>
                            <TextField
                                id="email"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={teacher.Email}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={5}>
                        <FormControl fullWidth variant="outlined">
                            <p>Contact</p>
                            <TextField
                                id="contact"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={teacher.Contact}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>Branch</p>
                            <Select
                                native
                                value={teacher.BranchID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "BranchID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    ---Select Branch---
                                </option>
                                {branch.map((item: BranchInterface) => (
                                    <option value={item.BrID} key={item.BrID}>
                                        {item.BrName}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>Admin</p>
                            <Select
                                native
                                value={teacher.AdminID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "AdminID",
                                }}
                            >
                                <option aria-label="None" value="">
                                ---Select Admin---
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
                        <Button component={RouterLink} to="/teacher" variant="contained">
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

export default TCreate;