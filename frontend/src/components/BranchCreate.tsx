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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { BHInterface } from "../models/IBehavior_Point";
import { PointTypeInterface } from "../models/IPoint_Type";
import { BehaviorTypeInterface } from "../models/IBehavior_Type";
import { AdminInterface } from "../models/IAdmin";
import { BranchInterface } from "../models/IBranch";
import { CourseInterface } from "../models/ICourse";
import { AcademyInterface } from "../models/IAcademy";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BHCreate() {
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const [admin, setAdmin] = React.useState<AdminInterface[]>([]);
    const [academy, setAcademy] = React.useState<AcademyInterface[]>([]);
    const [course, setCourse] = React.useState<CourseInterface[]>([]);
    const [branch, setBranch] = React.useState<BranchInterface>({});
    
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
        const id = event.target.id as keyof typeof BHCreate;
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
    
    const getCourse = async () => {
        fetch(`${apiUrl}/course`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setCourse(res.data);
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
        getCourse();
        getAdmin();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
            
            brname: branch.Brname ?? "",
            contact: branch.Contact ?? "",
            AdminID: convertType(branch.AcademyID),
            course: convertType(branch.CourseID),
            academies: convertType(branch.AcademyID),
        };

        console.log(data)

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };

        fetch(`${apiUrl}/Branches`, requestOptions)
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

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>Name</p>
                            <TextField
                                id="brname"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={branch.Brname}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>Contact</p>
                            <TextField
                                id="contact"
                                variant="outlined"
                                type="number"
                                size="medium"
                                value={branch.Contact}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>Admin</p>
                            <Select
                                native
                                value={branch.AdminID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "AdminID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    Select Admin
                                </option>
                                {admin.map((item: AdminInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Aname}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>Academy</p>
                            <Select
                                native
                                value={branch.AcademyID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "AcademyID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    Select Academy
                                </option>
                                {academy.map((item: AcademyInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Acaname}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>Course</p>
                            <Select
                                native
                                value={branch.CourseID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "CourseID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    Select Course
                                </option>
                                {course.map((item: CourseInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Cname}
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

export default BHCreate;