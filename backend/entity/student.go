package entity

import (
	"time"

	"gorm.io/gorm"
)

type Student struct {
	gorm.Model
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