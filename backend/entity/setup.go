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

	fmt.Printf("\nEnd Querry\n")
}
