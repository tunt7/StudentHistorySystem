import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import "../styles.css"

function Homepage(): JSX.Element {
    return (
        <h1>
            <div className="header">
                <br />
                <div className="border">
                    <h3>ยินดีต้อนรับสู่</h3>
                    <h1>ระบบประวัตินักศึกษา</h1>
                </div>
                    <br/>
                <div className="member">สมาชิก</div>
            </div>
            <div className="container">
                <div className="column">
                    <a href="https://www.facebook.com/profile.php?id=100023727782783" className="fa">
                        <img src="https://i.pinimg.com/originals/a4/11/4f/a4114ffbc99e01069a7e188d927cf94d.gif" alt="รถ" width="270" height="260" className="avatar"></img>
                        <Button color="primary" variant="contained">
                            <Typography
                                variant="button"
                                color="white">
                                <div className="devname">นายพีรพล นนทคําจันทร์</div>
                            </Typography>
                        </Button>
                    </a>
                </div>
                <div className="column">
                    <a href="https://www.facebook.com/kengneeha" className="fa">
                        <img src="https://cdn.discordapp.com/attachments/996739649596821574/1034382144010715176/meme-gif-pfp-1.gif" alt="เก่ง" width="270" height="260" className="avatar"></img>
                        <Button color="primary" variant="contained">
                            <Typography
                                variant="button"
                                color="white">

                                <div className="devname">นายธีรวัฒน์ กูดกิ่ง</div>
                            </Typography>
                        </Button>
                    </a>
                </div>
                <div className="column">
                    <a href="https://www.facebook.com/poln.jongketkam" className="fa">
                        <img src="https://media.tenor.com/LGCS8U0fTFkAAAAd/gojo-satoru-jjk.gif" alt="พล" width="270" height="260" className="avatar"></img>
                        <Button color="primary" variant="contained">
                            <Typography
                                variant="button"
                                color="white">
                                <div className="devname">ณัฐพล จงเกษกรรม</div>

                            </Typography>
                        </Button>
                    </a>
                </div>
                <div className="column">
                    <a href="https://www.facebook.com/gurocke.sus/" className="fa">
                        <img src="https://64.media.tumblr.com/ba41c54bc2342048c76ab1f04b7207d9/1cdf0f61bb8cf4e6-97/s500x750/61bde33934c020b9407225bdab9fad3b83fe3f2d.gif" alt="ฟิวส์" width="270" height="260" className="avatar"></img>
                        <Button color="primary" variant="contained">
                            <Typography
                                variant="button"
                                color="white">
                                <div className="devname">นายอภิสิทธิ์ วงศ์วิศิษฐ์</div>

                            </Typography>
                        </Button>
                    </a>
                </div>
                <div className="column">
                    <a href="https://www.facebook.com/profile.php?id=100007795003184" className="fa">
                        <img src="https://media.tenor.com/vKk3Mb2hAVcAAAAC/fgo-fgo-learing-with-manga.gif" alt="เฟิร์น" width="270" height="260" className="avatar"></img>
                        <Button color="primary" variant="contained">
                            <Typography
                                variant="button"
                                color="white">
                                <div className="devname">นางสาววันวิสา เถาโท</div>
                            </Typography>
                        </Button>
                    </a>
                </div>
                <div className="column">
                    <a href="https://www.facebook.com/profile.php?id=100002751064253" className="fa">
                        <img src="https://media.tenor.com/sydpTQRcX6kAAAAd/beast-titan-titan.gif" alt="กัปตัน" width="270" height="260" className="avatar"></img>
                        <Button color="primary" variant="contained">
                            <Typography
                                variant="button"
                                color="white">
                                <div className="devname">นายธนเดช เชิดในเมือง</div>
                            </Typography>
                        </Button>
                    </a>
                </div>
                <h1> <br /></h1>
            </div>

        </h1>

    )



}
export default Homepage;