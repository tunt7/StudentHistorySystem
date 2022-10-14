package entity

import (
	"time"

	"gorm.io/gorm"
)

type Student struct {
	gorm.Model
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

	BTID                    *uint
	Blood_Type              Blood_Type
	ELID                    *uint
	Education_Level         Education_Level
	EQID                    *uint
	Education_Qualification Education_Qualification

	AcademyID *uint
	Academy   Academy

	BranchID *uint
	Branch   Branch

	TeacherID *uint
	Teacher   Teacher

	Behavior_Points []Behavior_Point `gorm:"foreignKey:StudentID"`
	Ac_his          []Ac_his         `gorm:"foreignKey:StudentID"`
}

type Blood_Type struct {
	gorm.Model
	Btname  string
	Student []Student `gorm:"foreignKey:BTID"`
}

type Education_Level struct {
	gorm.Model
	Elname  string
	Student []Student `gorm:"foreignKey:ELID"`
}

type Education_Qualification struct {
	gorm.Model
	Eqname  string
	Student []Student `gorm:"foreignKey:EQID"`
}
