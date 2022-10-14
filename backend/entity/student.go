package entity

import (
	"time"

	"gorm.io/gorm"
)

type Student struct {
	gorm.Model
<<<<<<< HEAD
	Sfirstname       string
	Slastname        string
	Sdob             time.Time
	Sparent          string
	Admission_Date   time.Time
	Address          string
	Phone_Number     string
	Graduate_School  string
	Grade            float64
	Sidentity_number string

	// BTID                    *uint
	// Blood_Type              Blood_Type
	// ELID                    *uint
	// Education_Level         Education_Level
	// EQID                    *uint
	// Education_Qualification Education_Qualification

	// AcademyID *uint
	// Academy   Academy

	// BranchID *uint
	// Branch   Branch

	// TeacherID *uint
	// Teacher   Teacher

	// Behavior_Points []Behavior_Point `gorm:"foreignKey:StudentID"`
}

// type Blood_Type struct {
// 	gorm.Model
// 	Btname  string
// 	Student []Student `gorm:"foreignKey:BTID"`
// }

// type Education_Level struct {
// 	gorm.Model
// 	Elname  string
// 	Student []Student `gorm:"foreignKey:ELID"`
// }

// type Education_Qualification struct {
// 	gorm.Model
// 	Eqname  string
// 	Student []Student `gorm:"foreignKey:EQID"`
// }
=======
	Sfirstname      string
	Slastname       string
	Sdob            time.Time
	Sparent         string
	Admission_Date  time.Time
	Address         string
	Phone_Number    string
	Graduate_School string
	Grade           float64
	Sidentity_card  string
	BT_ID      		*uint
	BLOOD_TYPE      BLOOD_TYPE
	EL_ID      		*uint
	Education_level Education_level
	EQ_ID      		*uint
	Education_Qualification	Education_Qualification
	Behavior_Points []Behavior_Point `gorm:"foreignKey:StudentID"`
}

type BLOOD_TYPE struct {
	gorm.Model
	BT_NAME         string
	Student         []Student `gorm:"foreignKey:BT_ID"`
}

type Education_level struct {
	gorm.Model
	EL_NAME         string
	Student         []Student `gorm:"foreignKey:EL_ID"`
}

type Education_Qualification struct {
	gorm.Model
	EQ_NAME        string
	Student         []Student `gorm:"foreignKey:EQ_ID"`
}
>>>>>>> 734e7698cf3dc3bc2f860edf4abb07291dd9078b
