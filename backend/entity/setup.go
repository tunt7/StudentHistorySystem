package entity

import (
	"fmt"
	"time"

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
	database.AutoMigrate(
		&Admin{},
		&Point_Type{},
		&Behavior_Type{},
		&Student{},
		&Behavior_Point{},

		&Academy{},
		&Teacher{},
		&Branch{},
	)

	db = database

	// -------SETUP DATA-------
	// Admin
	thanadet := Admin{
		Aname:     "Thanadet Choedaimueang",
		Aemail:    "tun@gmail.com",
		Apassword: "asdfg123456",
	}
	theerawat := Admin{
		Aname:     "Theerawat Goodking",
		Aemail:    "theerawatG@gmail.com",
		Apassword: "123456",
	}
	db.Model(&Admin{}).Create(&thanadet)
	db.Model(&Admin{}).Create(&theerawat)
	// PointType
	positive := Point_Type{
		Ptname: "เพิ่มคะแนน",
		Sign:   "+",
	}
	negative := Point_Type{
		Ptname: "ลดคะแนน",
		Sign:   "-",
	}
	db.Model(&Point_Type{}).Create(&positive)
	db.Model(&Point_Type{}).Create(&negative)
	// Behavior_Type
	dress := Behavior_Type{
		Btname: "การแต่งกาย",
	}
	gambit := Behavior_Type{
		Btname: "การพนัน",
	}
	traffic := Behavior_Type{
		Btname: "กฎจราจร",
	}
	db.Model(&Behavior_Type{}).Create(&dress)
	db.Model(&Behavior_Type{}).Create(&gambit)
	db.Model(&Behavior_Type{}).Create(&traffic)
	// Student
	vanessa := Student{
		Sfirstname:      "Vanessa",
		Slastname:       "Goth",
		Sparent:         "James Goth",
		Address:         "17/4 Phetchabun",
		Phone_Number:    "0945157242",
		Graduate_School: "Suranaree Wittaya School",
		Grade:           3.17,
		Sdob:            time.Now(),
		Admission_Date:  time.Now(),
	}
	maria := Student{
		Sfirstname:      "Maria",
		Slastname:       "Wind",
		Sparent:         "Sarah Goth",
		Address:         "14/3 Phetchabun",
		Phone_Number:    "0845134888",
		Graduate_School: "Suranaree Wittaya School",
		Grade:           3.45,
		Sdob:            time.Now(),
		Admission_Date:  time.Now(),
	}
	db.Model(&Student{}).Create(&vanessa)
	db.Model(&Student{}).Create(&maria)
	// Behavior_Point
	db.Model(&Behavior_Point{}).Create(&Behavior_Point{
		Bppoint:       10,
		Bpdetail:      "ใส่เสื่อบอลมาสอบ",
		Date_Rec:      time.Now(),
		Admin:         thanadet,
		Point_Type:    negative,
		Behavior_Type: dress,
		Student:       vanessa,
	})
	db.Model(&Behavior_Point{}).Create(&Behavior_Point{
		Bppoint:       20,
		Bpdetail:      "ไม่สวมหมวกกันน็อก",
		Date_Rec:      time.Now(),
		Admin:         theerawat,
		Point_Type:    negative,
		Behavior_Type: traffic,
		Student:       vanessa,
	})

	//////////////////branch//////////////////////////////////

	///////////////// Academy /////////

	Engineering := Academy{
		Name:          "Engineering",
		Building_name: "Engineering building",
	}
	db.Model(&Academy{}).Create(&Engineering)

	Science := Academy{
		Name:          "Science",
		Building_name: "Science building",
	}
	db.Model(&Academy{}).Create(&Science)

	/////////////// branch /////////////
	b1 := Branch{
		Name:    "Computer Engineering",
		Contact: "333-777-111",
		Academy: Engineering,
		Admin:   theerawat,
	}
	b2 := Branch{
		Name:    "Bachelor of Science (Chemistry)",
		Contact: "666-999-555",
		Academy: Science,
		Admin:   thanadet,
	}
	db.Model(&Branch{}).Create(&b1)
	db.Model(&Branch{}).Create(&b2)

	p1 := Prefix{
		FullName:  "ศาสตรา์จารย์",
		ShortName: "ศ.",
	}
	p2 := Prefix{
		FullName:  "รองศาสตรา์จารย์",
		ShortName: "รศ.",
	}
	p3 := Prefix{
		FullName:  "ผู้ช่วยศาสตรา์จารย์",
		ShortName: "ผศ.",
	}
	db.Model(&Prefix{}).Create(&p1)
	db.Model(&Prefix{}).Create(&p2)
	db.Model(&Prefix{}).Create(&p3)

	Pornsak := Teacher{
		TfirstName: "Pornsak",
		TlastName:  "Songsang",
		Temail:     "pornsakS@gmail.com",
		Tcontact:   "111-222-3333",
		Prefix:     p1,
		Admin:      theerawat,
		Branch:     b1,
	}
	db.Model(&Teacher{}).Create(&Pornsak)

	Bird := Teacher{
		TfirstName: "Bird",
		TlastName:  "Thongchai",
		Temail:     "birdT@hotmail.com",
		Tcontact:   "444-555-6666",
		Prefix:     p2,
		Admin:      thanadet,
		Branch:     b2,
	}
	db.Model(&Teacher{}).Create(&Bird)

	fmt.Printf("\nEnd Querry\n")
}
