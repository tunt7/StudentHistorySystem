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
import { GetCurrentAdmin } from "../services/HttpClientService";

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

    const [admin, setAdmin] = React.useState<AdminInterface>();
    const [prefix, setPrefix] = React.useState<PreInterface[]>([]);
    const [branch, setBranch] = React.useState<BranchInterface[]>([]);
    const [teacher, setTeacher] = React.useState<TInterface>({
        TfirstName: "",
        TlastName: "",
        Temail: "",
        Tcontact: "",
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
        fetch(`${apiUrl}/Prefixes`, requestOptions)
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
        let res = await GetCurrentAdmin();
        teacher.AdminID = res.ID;
        if (res) {
            setAdmin(res);
            console.log(res)
        }
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
            TfirstName: teacher.TfirstName ?? "",
            TlastName: teacher.TlastName ?? "",
            Temail: teacher.Temail ?? "",
            Tcontact: teacher.Tcontact ?? "",

            AdminID: convertType(teacher.AdminID),
            PrefixID: convertType(teacher.PrefixID),
            BranchID: convertType(teacher.BranchID),
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

        fetch(`${apiUrl}/Teachers`, requestOptions)
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
                            fontSize={32}
                            gutterBottom
                        >
                            <div className="font-thai">
                                บันทึกข้อมูลอาจารย์
                            </div>
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>

                    <Grid item xs={2}>
                        <FormControl fullWidth variant="outlined">
                            <p className="font-thai">คำนำหน้า</p>
                            <Select
                                native
                                value={teacher.PrefixID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "PrefixID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    <div className="font-thai">
                                        -เลือก-
                                    </div>
                                </option>
                                {prefix.map((item: PreInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.ShortName}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={5}>
                        <FormControl fullWidth variant="outlined">
                            <p className="font-thai">ชื่อจริง</p>
                            <TextField
                                id="TfirstName"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={teacher.TfirstName}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={5}>
                        <FormControl fullWidth variant="outlined">
                            <p className="font-thai">นามสกุล</p>
                            <TextField
                                id="TlastName"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={teacher.TlastName}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={7}>
                        <FormControl fullWidth variant="outlined">
                            <p className="font-thai">อีเมล</p>
                            <TextField
                                id="Temail"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={teacher.Temail}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={5}>
                        <FormControl fullWidth variant="outlined">
                            <p className="font-thai">เบอร์โทรติดต่อ</p>
                            <TextField
                                id="Tcontact"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={teacher.Tcontact}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="font-thai">สาขา</p>
                            <Select
                                native
                                value={teacher.BranchID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "BranchID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    ---โปรดเลือกสาขา---
                                </option>
                                {branch.map((item: BranchInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Brname}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="font-thai">Admin</p>
                            <Select
                                native
                                value={teacher.AdminID + ""}
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

                    <Grid item xs={12}>
                        <Button component={RouterLink} to="/TeacherShow" variant="contained">
                            <div className="font-thai">
                                ย้อนกลับ
                            </div>
                        </Button>
                        <Button
                            style={{ float: "right" }}
                            onClick={submit}
                            variant="contained"
                            color="primary"
                        >
                            <div className="font-thai">
                                บันทึกข้อมูล
                            </div>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default TCreate;