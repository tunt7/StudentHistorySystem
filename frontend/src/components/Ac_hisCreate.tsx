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

import { STDInterface } from "../models/IStudent";
import { AcInterface } from "../models/IActivity";
import { AdminInterface } from "../models/IAdmin";
import { AcHisInterface } from "../models/IAc_his";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Ac_hisCreate() {
    const [date, setDate] = React.useState<Date | null>(null);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const [admin, setAdmin] = React.useState<AdminInterface[]>([]);
    const [student, setStudent] = React.useState<STDInterface[]>([]);
    const [activity, setActivity] = React.useState<AcInterface[]>([]);
    const [activityHis, setActivityHis] = React.useState<AcHisInterface>({ });
    
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
        const id = event.target.id as keyof typeof Ac_hisCreate;
        const { value } = event.target;
        setActivityHis({ ...activityHis, [id]: value });
    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof activityHis;
        setActivityHis({
            ...activityHis,
            [name]: event.target.value,
        });
    };

    const getStudent = async () => {
        fetch(`${apiUrl}/students`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setStudent(res.data);
                }
                else { console.log("NO DATA") }
            });
    };
    
    const getActivity = async () => {
        fetch(`${apiUrl}/Activities`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setActivity(res.data);
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
        getStudent();
        getActivity();
        getAdmin();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
            ACHOUR: typeof activityHis.ACHOUR === "string" ? parseInt(activityHis.ACHOUR) : 0,
            ADMINID: convertType(activityHis.ADMIN_ID),
            StudentID: convertType(activityHis.STUDENT_ID),
            ACtivityID: convertType(activityHis.ACTIVITY_ID),
            // BehaviorTypeID: convertType(activityHis.BehaviorTypeID),
            // StudentID: activityHis.StudentID ?? "",
        };

        console.log(data)

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };

        fetch(`${apiUrl}/Ac_his`, requestOptions)
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
                            Add Activity To Student
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>

                <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>Student</p>
                            <Select
                                native
                                value={activityHis.STUDENT_ID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "STUDENT_ID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    Select Student
                                </option>
                                {student.map((item: STDInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Sfirstname} {item.Slastname}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>Hour</p>
                            <TextField
                                id="ACHOUR"
                                variant="outlined"
                                type="number"
                                size="medium"
                                InputProps={{ inputProps: { min: 1 } }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={activityHis.ACHOUR || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>Admin</p>
                            <Select
                                native
                                value={activityHis.ADMIN_ID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "ADMIN_ID",
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

                    

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>Activity</p>
                            <Select
                                native
                                value={activityHis.ACTIVITY_ID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "ACTIVITY_ID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    Select Activity
                                </option>
                                {activity.map((item: AcInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Acname}
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

export default Ac_hisCreate;
