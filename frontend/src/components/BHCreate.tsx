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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BHCreate() {
    const [date, setDate] = React.useState<Date | null>(null);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const [admin, setAdmin] = React.useState<AdminInterface[]>([]);
    const [pointType, setPointType] = React.useState<PointTypeInterface[]>([]);
    const [behaviorType, setBehaviorType] = React.useState<BehaviorTypeInterface[]>([]);
    const [behaviorPoint, setBehaviorPoint] = React.useState<BHInterface>({ 
        Point: 0,
        Detail:"",
        Date_Rec: new Date(),
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
        const id = event.target.id as keyof typeof BHCreate;
        const { value } = event.target;
        setBehaviorPoint({ ...behaviorPoint, [id]: value });
    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof behaviorPoint;
        setBehaviorPoint({
            ...behaviorPoint,
            [name]: event.target.value,
        });
    };

    const getPointType = async () => {
        fetch(`${apiUrl}/point_types`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setPointType(res.data);
                }
                else { console.log("NO DATA") }
            });
    };
    
    const getBehaviorType = async () => {
        fetch(`${apiUrl}/behavior_types`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setBehaviorType(res.data);
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
        getBehaviorType();
        getPointType();
        getAdmin();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
            Point: typeof behaviorPoint.Point === "string" ? parseInt(behaviorPoint.Point) : 0,
            Detail: behaviorPoint.Detail ?? "",
            Date_Rec: date,
            AdminID: convertType(behaviorPoint.AdminID),
            PointTypeID: convertType(behaviorPoint.PointTypeID),
            BehaviorTypeID: convertType(behaviorPoint.BehaviorTypeID),
            StudentID: behaviorPoint.StudentID ?? "",
        };

        console.log(data)

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };

        fetch(`${apiUrl}/behavior_points`, requestOptions)
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
                            Create Behavior Point
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>Detail</p>
                            <TextField
                                id="LastName"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={behaviorPoint.Detail}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>Point</p>
                            <TextField
                                id="Point"
                                variant="outlined"
                                type="number"
                                size="medium"
                                InputProps={{ inputProps: { min: 1 } }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={behaviorPoint.Point || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>Admin</p>
                            <Select
                                native
                                value={behaviorPoint.AdminID + ""}
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
                            <p>PointType</p>
                            <Select
                                native
                                value={behaviorPoint.PointTypeID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "PointTypeID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    Select Point Type
                                </option>
                                {pointType.map((item: PointTypeInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Ptname}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>BehaviorType</p>
                            <Select
                                native
                                value={behaviorPoint.BehaviorTypeID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "BehaviorTypeID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    Select Behavior Type
                                </option>
                                {behaviorType.map((item: BehaviorTypeInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Btname}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>StudentID</p>
                            <TextField
                                id="LastName"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={behaviorPoint.StudentID}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>Record Date</p>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={date}
                                    onChange={(newValue) => {
                                        setDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
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
