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

import { GetCurrentAdmin } from "../services/HttpClientService"
import { BHInterface } from "../models/IBehavior_Point";
import { PointTypeInterface } from "../models/IPoint_Type";
import { BehaviorTypeInterface } from "../models/IBehavior_Type";
import { AdminInterface } from "../models/IAdmin";
import { STDInterface } from "../models/IStudent";
import Autocomplete from "@mui/material/Autocomplete";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Behavior_PointCreate() {
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const [admin, setAdmin] = React.useState<AdminInterface>();
    const [student, setStudent] = React.useState<[]>([]);
    const [std, setStd] = React.useState<STDInterface>();
    const [pointType, setPointType] = React.useState<PointTypeInterface[]>([]);
    const [behaviorType, setBehaviorType] = React.useState<BehaviorTypeInterface[]>([]);
    const [behaviorPoint, setBehaviorPoint] = React.useState<BHInterface>({
        Date_Rec: new Date(),
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
        const id = event.target.id as keyof typeof Behavior_PointCreate;
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

    const handleChangeNEW = (event: SelectChangeEvent) => {
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

    const getAdmin = async () => {
        let res = await GetCurrentAdmin();
        behaviorPoint.AdminID = res.ID;
        if (res) {
            setAdmin(res);
            console.log(res)
        }
    };

    useEffect(() => {
        getBehaviorType();
        getPointType();
        getAdmin();
        getStudent();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
            bppoint: typeof behaviorPoint.bppoint === "string" ? parseInt(behaviorPoint.bppoint) : 0,
            bpdetail: behaviorPoint.bpdetail ?? "",
            Date_Rec: behaviorPoint.Date_Rec,
            AdminID: convertType(behaviorPoint.AdminID),
            PointTypeID: convertType(behaviorPoint.PointTypeID),
            BehaviorTypeID: convertType(behaviorPoint.BehaviorTypeID),
            StudentID: convertType(behaviorPoint.StudentID),
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
                                บันทึกคะแนนวินัย
                            </div>
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">รายละเอียด</p>
                            <TextField
                                id="bpdetail"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={behaviorPoint.bpdetail || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">คะแนน</p>
                            <TextField
                                id="bppoint"
                                variant="outlined"
                                type="number"
                                size="medium"
                                InputProps={{ inputProps: { min: 1 } }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={behaviorPoint.bppoint || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">ผู้บันทึก</p>
                            <Select
                                native
                                value={behaviorPoint.AdminID + ""}
                                onChange={handleChange}
                                disabled
                                inputProps={{
                                    name: "AdminID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    เลือก
                                </option>
                                <option value={admin?.ID} key={admin?.ID}>
                                    {admin?.Aname}
                                </option>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">ประเภทคะแนน</p>
                            <Autocomplete
                                disablePortal
                                id="PointTypeID"
                                getOptionLabel={(item: PointTypeInterface) => `${item.Ptname}`}
                                options={pointType}
                                sx={{ width: 'auto' }}
                                isOptionEqualToValue={(option, value) =>
                                    option.ID === value.ID}
                                onChange={(e, value) => { behaviorPoint.PointTypeID = value?.ID }}
                                renderInput={(params) => <TextField {...params} label="เลือกประเภทคะแนน" />}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">ประเภท</p>
                            <Autocomplete
                                disablePortal
                                id="BehaviorTypeID"
                                getOptionLabel={(item: BehaviorTypeInterface) => `${item.Btname}`}
                                options={behaviorType}
                                sx={{ width: 'auto' }}
                                isOptionEqualToValue={(option, value) =>
                                    option.ID === value.ID}
                                onChange={(e, value) => { behaviorPoint.BehaviorTypeID = value?.ID }}
                                renderInput={(params) => <TextField {...params} label="เลือกประเภท" />}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">นักศึกษา</p>
                            <Autocomplete
                                disablePortal
                                id="StudentID"
                                getOptionLabel={(item: STDInterface) => `${item.Sfirstname} ${item.Slastname}`}
                                options={student}
                                sx={{ width: 'auto' }}
                                isOptionEqualToValue={(option, value) =>
                                    option.ID === value.ID}
                                onChange={(e, value) => { behaviorPoint.StudentID = value?.ID }}
                                renderInput={(params) => <TextField {...params} label="เลือกนักศึกษา" />}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">วันเดิอนปี</p>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={behaviorPoint.Date_Rec}
                                    onChange={(newValue) => {
                                        setBehaviorPoint({
                                            ...behaviorPoint,
                                            Date_Rec: newValue,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button component={RouterLink} to="/Behavior_points" variant="contained">
                            <div className="good-font">
                                กลับ
                            </div>
                        </Button>
                        <Button
                            style={{ float: "right" }}
                            onClick={submit}
                            variant="contained"
                            color="primary"
                        >
                            <div className="good-font">
                                บันทึกข้อมูล
                            </div>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default Behavior_PointCreate;
