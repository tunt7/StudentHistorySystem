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
import { BTInterface } from "../models/IBlood_Type";
import { ELInterface } from "../models/IEducation_Level";
import { EQInterface } from "../models/IEducation_Qualification";
import { AcademyInterface } from "../models/IAcademy";
import { BranchInterface } from "../models/IBranch";
import { TInterface } from "../models/ITeacher";
import { AdminInterface } from "../models/IAdmin";
import Student from "./Student";



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function StudentCreate() {
    const [date, setDate] = React.useState<Date | null>(null);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const [bloodType, setBloodType] = React.useState<BTInterface[]>([]);
    const [eLevel, setEl] = React.useState<ELInterface[]>([]);
    const [eQuali, setEq] = React.useState<EQInterface[]>([]);
    const [academy, setAc] = React.useState<AcademyInterface[]>([]);
    const [branch, setBranch] = React.useState<BranchInterface[]>([]);
    const [teacher, setTeacher] = React.useState<TInterface[]>([]);
    const [std, setStd] = React.useState<STDInterface>({
        Sdob: new Date(),
        Admission_Date: new Date(),
    });

    const apiUrl = "http://localhost:8080";
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },    };

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
        const id = event.target.id as keyof typeof StudentCreate;
        const { value } = event.target;
        setStd({ ...std, [id]: value });
    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof std;
        setStd({
            ...std,
            [name]: event.target.value,
        });
    };

    const getBloodType = async () => {
        fetch(`${apiUrl}/blood_types`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setBloodType(res.data);
                }
                else { console.log("NO DATA") }
            });
    };

    const getEducationL = async () => {
        fetch(`${apiUrl}/els`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setEl(res.data);
                }
                else { console.log("NO DATA") }
            });
    };

    const getEducationQ = async () => {
        fetch(`${apiUrl}/eqs`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setEq(res.data);
                }
                else { console.log("NO DATA") }
            });
    };

    const getTeacher = async () => {
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

    const getAcadamy = async () => {
        fetch(`${apiUrl}/academies`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setAc(res.data);
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

    useEffect(() => {
        getBloodType();
        getEducationL();
        getEducationQ();
        getTeacher();
        getBranch();
        getAcadamy();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
            Sfirstname: std.Sfirstname ?? "",
            Slastname: std.Slastname ?? "",
            Sdob: std.Sdob ?? "",
            Sparent: std.Sparent ?? "",
            Admission_Date: std.Admission_Date ?? "",
            Address: std.Address ?? "",
            Phone_Number: std.Phone_Number ?? "",
            Graduate_School: std.Graduate_School ?? "",
            Grade: typeof std.Grade === "string" ? parseFloat(std.Grade) : 0,
            Sidentity_number: std.Sidentity_number ?? "",

            BTID: convertType(std.BTID),
            ELID: convertType(std.ELID),
            EQID: convertType(std.EQID),
            AcademyID: convertType(std.AcademyID),
            BranchID: convertType(std.BranchID),
            TeacherID: convertType(std.TeacherID),
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

        fetch(`${apiUrl}/students`, requestOptions)
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
                            กรอกประวัตินักศึกษา
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>ชื่อ</p>
                            <TextField
                                id="Sfirstname"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={std.Sfirstname || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>นามสกุล</p>
                            <TextField
                                id="Slastname"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={std.Slastname || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>วันเดือนปีเกิด</p>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={std.Sdob}
                                    onChange={(newValue) => {
                                        setStd({
                                            ...std,
                                            Sdob: newValue,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>กลุ่มเลือด</p>
                            <Select
                                native
                                value={std.BTID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "BTID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    เลือกกลุ่มเลือด
                                </option>
                                {bloodType.map((item: BTInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Btname}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>เลขประจำตัวประชาชน</p>
                            <TextField
                                id="Sidentity_number"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={std.Sidentity_number || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>เบอร์โทรศัพท์</p>
                            <TextField
                                id="Phone_Number"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={std.Phone_Number || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>


                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>ที่อยู่</p>
                            <TextField
                                id="Address"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={std.Address || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>ชื่อผู้ปกครอง</p>
                            <TextField
                                id="Sparent"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={std.Sparent || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>ระดับการศึกษา</p>
                            <Select
                                native
                                value={std.ELID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "ELID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    เลือกระดับการศึกษา
                                </option>
                                {eLevel.map((item: ELInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Elname}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>วัน/เดือน/ปีที่เข้าศึกษา</p>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={std.Admission_Date}
                                    onChange={(newValue) => {
                                        setStd({
                                            ...std,
                                            Admission_Date: newValue,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>วุฒิก่อนเข้าศึกษา</p>
                            <Select
                                native
                                value={std.EQID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "EQID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    เลือกวุฒิก่อนเข้าศึกษา
                                </option>
                                {eQuali.map((item: EQInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Eqname}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>จบการศึกษาจาก</p>
                            <TextField
                                id="Graduate_School"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={std.Graduate_School || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>เกรดเฉลี่ยก่อนเข้าศึกษา</p>
                            <TextField
                                id="Grade"
                                variant="outlined"
                                type="number"
                                size="medium"
                                InputProps={{ inputProps: { min: 1 } }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={std.Grade || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>สำนักวิชา</p>
                            <Select
                                native
                                value={std.AcademyID + ""}
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

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>สาขาวิชา</p>
                            <Select
                                native
                                value={std.BranchID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "BranchID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    เลือกสาขาวิชา
                                </option>
                                {branch.map((item: BranchInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Brname}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>อาจารย์ที่ปรึกษา</p>
                            <Select
                                native
                                value={std.TeacherID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "TeacherID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    เลือกอาจารย์ที่ปรึกษา
                                </option>
                                {teacher.map((item: TInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.TfirstName}
                                        {" "}
                                        {item.TlastName}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* ****                         */}
                    <Grid item xs={12}>
                        <Button component={RouterLink} to="/Student" variant="contained">
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

export default StudentCreate;
