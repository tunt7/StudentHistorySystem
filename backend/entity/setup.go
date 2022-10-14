package entity

import (
	"fmt"
	// "time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("history_student.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	// Migrate the schema
	// database.AutoMigrate(
	// 	&Admin{},
	// 	&Academy{},
	// 	&Prefix{},
	// 	&Blood_Type{},
	// 	&Education_Level{},
	// 	&Education_Qualification{},
	// 	&Point_Type{},
	// 	&Behavior_Type{},
	// 	&Behavior_Point{},
	// 	&Branch{},
	// 	&Teacher{},
	// 	&Student{},
	// )

	db = database

	// -------SETUP DATA-------
	//--------------------------Admin
	// thanadet := Admin{
	// 	Aname:     "Thanadet Choedaimueang",
	// 	Aemail:    "tun@gmail.com",
	// 	Apassword: "asdfg123456",
	// }
	// db.Model(&Admin{}).Create(&thanadet)
	// theerawat := Admin{
	// 	Aname:     "Theerawat Goodking",
	// 	Aemail:    "theerawatG@gmail.com",
	// 	Apassword: "123456",
	// }
	// db.Model(&Admin{}).Create(&theerawat)

	//---------------------------Branch
	// engineering := Academy{
	// 	Acaname:       "Engineering",
	// 	Building_name: "Engineering building",
	// }
	// db.Model(&Academy{}).Create(&engineering)

	// science := Academy{
	// 	Acaname:       "Science",
	// 	Building_name: "Science building",
	// }
	// db.Model(&Academy{}).Create(&science)

	// b1 := Branch{
	// 	Brname:  "Computer Engineering",
	// 	Contact: "333-777-111",
	// 	Academy: engineering,
	// 	Admin:   theerawat,
	// }
	// b2 := Branch{
	// 	Brname:  "Bachelor of Science (Chemistry)",
	// 	Contact: "666-999-555",
	// 	Academy: science,
	// 	Admin:   thanadet,
	// }
	// db.Model(&Branch{}).Create(&b1)
	// db.Model(&Branch{}).Create(&b2)

	// //--------------------------Teacher

	// p1 := Prefix{
	// 	FullName:  "ศาสตรา์จารย์",
	// 	ShortName: "ศ.",
	// }
	// p2 := Prefix{
	// 	FullName:  "รองศาสตรา์จารย์",
	// 	ShortName: "รศ.",
	// }
	// p3 := Prefix{
	// 	FullName:  "ผู้ช่วยศาสตรา์จารย์",
	// 	ShortName: "ผศ.",
	// }
	// db.Model(&Prefix{}).Create(&p1)
	// db.Model(&Prefix{}).Create(&p2)
	// db.Model(&Prefix{}).Create(&p3)

	// Pornsak := Teacher{
	// 	TfirstName: "Pornsak",
	// 	TlastName:  "Songsang",
	// 	Temail:     "pornsakS@gmail.com",
	// 	Tcontact:   "111-222-3333",
	// 	Prefix:     p1,
	// 	Admin:      theerawat,
	// 	Branch:     b1,
	// }
	// Bird := Teacher{
	// 	TfirstName: "Bird",
	// 	TlastName:  "Thongchai",
	// 	Temail:     "birdT@hotmail.com",
	// 	Tcontact:   "444-555-6666",
	// 	Prefix:     p2,
	// 	Admin:      thanadet,
	// 	Branch:     b2,
	// }
	// db.Model(&Teacher{}).Create(&Pornsak)
	// db.Model(&Teacher{}).Create(&Bird)

	// //---------------------------Student

	// blood_a := Blood_Type{
	// 	Btname: "A",
	// }
	// db.Model(&Blood_Type{}).Create(&blood_a)
	// blood_b := Blood_Type{
	// 	Btname: "B",
	// }
	// db.Model(&Blood_Type{}).Create(&blood_b)
	// blood_ab := Blood_Type{
	// 	Btname: "AB",
	// }
	// db.Model(&Blood_Type{}).Create(&blood_ab)
	// blood_o := Blood_Type{
	// 	Btname: "O",
	// }
	// db.Model(&Blood_Type{}).Create(&blood_o)

	// el_bd := Education_Level{
	// 	Elname: "ปริญญาตรี",
	// }
	// db.Model(&Education_Level{}).Create(&el_bd)
	// el_md := Education_Level{
	// 	Elname: "ปริญญาโท",
	// }
	// db.Model(&Education_Level{}).Create(&el_md)
	// el_dd := Education_Level{
	// 	Elname: "ปริญญาเอก",
	// }
	// db.Model(&Education_Level{}).Create(&el_dd)

	// eq_hs := Education_Qualification{
	// 	Eqname: "ม.6",
	// }
	// db.Model(&Education_Qualification{}).Create(&eq_hs)
	// eq_voc := Education_Qualification{
	// 	Eqname: "ปวช-ปวส",
	// }
	// db.Model(&Education_Qualification{}).Create(&eq_voc)

	// vanessa := Student{
	// 	Sfirstname:              "Vanessa",
	// 	Slastname:               "Goth",
	// 	Sdob:                    time.Now(),
	// 	Sparent:                 "James Goth",
	// 	Admission_Date:          time.Now(),
	// 	Address:                 "17/4 Phetchabun",
	// 	Phone_Number:            "0945157242",
	// 	Graduate_School:         "Suranaree Wittaya School",
	// 	Grade:                   3.17,
	// 	Sidentity_number:        "1114002200022",
	// 	Academy:                 engineering,
	// 	Branch:                  b1,
	// 	Teacher:                 Bird,
	// 	Blood_Type:              blood_a,
	// 	Education_Level:         el_bd,
	// 	Education_Qualification: eq_hs,
	// }
	// maria := Student{
	// 	Sfirstname:              "Maria",
	// 	Slastname:               "Wind",
	// 	Sdob:                    time.Now(),
	// 	Sparent:                 "Sarah Goth",
	// 	Admission_Date:          time.Now(),
	// 	Address:                 "14/3 Phetchabun",
	// 	Phone_Number:            "0845134888",
	// 	Graduate_School:         "Suranaree Wittaya School",
	// 	Grade:                   3.45,
	// 	Sidentity_number:        "2222002200022",
	// 	Academy:                 science,
	// 	Branch:                  b2,
	// 	Teacher:                 Pornsak,
	// 	Blood_Type:              blood_o,
	// 	Education_Level:         el_dd,
	// 	Education_Qualification: eq_voc,
	// }
	// db.Model(&Student{}).Create(&vanessa)
	// db.Model(&Student{}).Create(&maria)

	// //-----------------------Behavior_Point
	// positive := Point_Type{
	// 	Ptname: "เพิ่มคะแนน",
	// 	Sign:   "+",
	// }
	// negative := Point_Type{
	// 	Ptname: "ลดคะแนน",
	// 	Sign:   "-",
	// }
	// db.Model(&Point_Type{}).Create(&positive)
	// db.Model(&Point_Type{}).Create(&negative)

	// dress := Behavior_Type{
	// 	Btname: "การแต่งกาย",
	// }
	// gambit := Behavior_Type{
	// 	Btname: "การพนัน",
	// }
	// traffic := Behavior_Type{
	// 	Btname: "กฎจราจร",
	// }
	// db.Model(&Behavior_Type{}).Create(&dress)
	// db.Model(&Behavior_Type{}).Create(&gambit)
	// db.Model(&Behavior_Type{}).Create(&traffic)

	// db.Model(&Behavior_Point{}).Create(&Behavior_Point{
	// 	Bppoint:       10,
	// 	Bpdetail:      "ใส่เสื่อบอลมาสอบ",
	// 	Date_Rec:      time.Now(),
	// 	Admin:         thanadet,
	// 	Point_Type:    negative,
	// 	Behavior_Type: dress,
	// 	Student:       vanessa,
	// })
	// db.Model(&Behavior_Point{}).Create(&Behavior_Point{
	// 	Bppoint:       20,
	// 	Bpdetail:      "ไม่สวมหมวกกันน็อก",
	// 	Date_Rec:      time.Now(),
	// 	Admin:         theerawat,
	// 	Point_Type:    negative,
	// 	Behavior_Type: traffic,
	// 	Student:       vanessa,
	// })

	fmt.Printf("\nEnd Querry\n")
}
