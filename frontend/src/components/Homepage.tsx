import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import "../styles.css"

function Homepage(): JSX.Element {
    return (
        <h1>
            <div className="header">
                <h3>ยินดีต้อนรับสู่</h3>
                <h1>ระบบประวัตินักศึกษา</h1>
                <p>สมาชิก</p>

            </div>

            <div className="container">
                <div className="column">
                    <a href="https://www.facebook.com/profile.php?id=100023727782783" className="fa">
                        <img src="https://sv1.picz.in.th/images/2022/10/24/vkIj0V.png" alt="รถ" width="230" height="260" className="avatar"></img>
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
                    <a href="https://www.facebook.com/teerawat3g/" className="fa">
                        <img src="https://cdn.discordapp.com/attachments/996739649596821574/1034064629929885736/unknown.png" alt="เก่ง" width="230" height="260" className="avatar"></img>
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
                        <img src="https://sv1.picz.in.th/images/2022/10/24/vkmm8V.jpg" alt="พล" width="230" height="260" className="avatar"></img>
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
                    <a href="https://www.facebook.com/profile.php?id=100002751064253" className="fa">
                        <img src="https://sv1.img.in.th/7iGBu.jpg" alt="ฟิวส์" width="230" height="260" className="avatar"></img>
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
                        <img src="https://cdn.discordapp.com/attachments/1008950151068532797/1034075266122797136/FB_IMG_1625732381864.jpg" alt="เฟิร์น" width="230" height="260" className="avatar"></img>
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
                    <a href="https://www.facebook.com/gurocke.sus/" className="fa">
                        <img src="https://m.media-amazon.com/images/I/71NelQtDtmL._AC_SL1500_.jpg" alt="กัปตัน" width="230" height="260" className="avatar"></img>
                        <Button color="primary" variant="contained">
                            <Typography
                                variant="button"
                                color="white">
                                <div className="devname">นายธนเดช เชิดในเมือง</div>
                            </Typography>
                        </Button>
                    </a>
                </div>
                <h1> <br/></h1>
            </div>
            
        </h1>
        
    )



}
export default Homepage;