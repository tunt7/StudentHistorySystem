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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

//npm install dayjs --save
import { GetCurrentAdmin } from "../services/HttpClientService"
import { AcInterface } from "../models/IActivity";
import { LInterface } from "../models/ILocation";
import { TInterface } from "../models/ITeacher";
import { AdminInterface } from "../models/IAdmin";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ActivityCreate() {
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const [location, setLocation] = React.useState<LInterface[]>([]);
    const [teacher, setTeacher] = React.useState<TInterface[]>([]);
    const [admin, setAdmin] = React.useState<AdminInterface>();
    const [activity, setActivity] = React.useState<AcInterface>({
        Date_s: new Date(),
        Date_e: new Date(),
        Time_s: new Date(),
        Time_e: new Date(),

    });

    const apiUrl = "http://localhost:8080";
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
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
        const id = event.target.id as keyof typeof ActivityCreate;
        const { value } = event.target;
        setActivity({ ...activity, [id]: value });
    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof activity;
        setActivity({
            ...activity,
            [name]: event.target.value,
        });
    };

    const getLocation = async () => {
        fetch(`${apiUrl}/Locations`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setLocation(res.data);
                }
                else { console.log("NO DATA") }
            });
    };

    const getT = async () => {
        fetch(`${apiUrl}/Teachers`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setTeacher(res.data);
                }
                else { console.log("NO DATA") }
            });
    };

    const getAdmin = async () => {
        let res = await GetCurrentAdmin();
        activity.AdminID = res.ID;
        if (res) {
            setAdmin(res);
            console.log(res)
        }
    };

    useEffect(() => {
        getLocation();
        getT();
        getAdmin();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
            Acname: activity.Acname ?? "",
            Date_s: activity.Date_s,
            Date_e: activity.Date_e,
            LocationID: convertType(activity.LocationID),
            TeacherID: convertType(activity.TeacherID),
            AdminID: convertType(activity.AdminID),

        };

        console.log(data)

        const requestOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        };

        fetch(`${apiUrl}/Activities`, requestOptions)
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
                    <div className="good-font">
                        บันทึกข้อมูลสำเร็จ
                    </div>
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    <div className="good-font">
                        บันทึกข้อมูลไม่สำเร็จ
                    </div>
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
                            <div className="good-font">
                                Create Activity
                            </div>
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">ชื่อกิจกรรม</p>
                            <TextField
                                id="Acname"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={activity.Acname}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">Admin</p>
                            <Select
                                native
                                value={activity.AdminID + ""}
                                onChange={handleChange}
                                disabled
                                inputProps={{
                                    name: "AdminID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    Select
                                </option>
                                <option value={admin?.ID} key={admin?.ID}>
                                    {admin?.Aname}
                                </option>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">สถานที่</p>
                            <Select
                                native
                                value={activity.LocationID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "LocationID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    Select
                                </option>
                                {location.map((item: LInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Lname}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">อาจารย์ที่ดูแลกิจกรรม</p>
                            <Select
                                native
                                value={activity.TeacherID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "TeacherID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    Select
                                </option>
                                {teacher.map((item: TInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.TfirstName} {item.TlastName}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">วันเวลาเริ่มกิจกรรม</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    value={activity.Date_s}
                                    onChange={(newValue) => {
                                        setActivity({
                                            ...activity,
                                            Date_s: newValue,
                                        });
                                    }}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">วันเวลาสิ้นสุดกิจกรรม</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    value={activity.Date_e}
                                    onChange={(newValue) => {
                                        setActivity({
                                            ...activity,
                                            Date_e: newValue,
                                        });
                                    }}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>



                    <Grid item xs={12}>
                        <Button component={RouterLink} to="/Activity" variant="contained">
                            <div className="good-font">
                                Back
                            </div>
                        </Button>
                        <Button
                            style={{ float: "right" }}
                            onClick={submit}
                            variant="contained"
                            color="primary"
                        >
                            <div className="good-font">
                                Submit
                            </div>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default ActivityCreate;