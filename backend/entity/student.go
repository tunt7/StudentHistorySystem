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
	Behavior_Points []Behavior_Point `gorm:"foreignKey:StudentID"`
}
