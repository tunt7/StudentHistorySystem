package entity

import (
	"time"

	"gorm.io/gorm"
)

type Location struct {
	gorm.Model
	Lname     string
	Activitys []Activity `grom:"foreignkey:LocationID"`
}

type Activity struct {
	gorm.Model
	Acname     string
	Date_s     time.Time
	Date_e     time.Time
	Time_s     time.Time
	Time_e     time.Time
	TeacherID  *uint
	Teacher    Teacher
	LocationID *uint
	Location   Location
	AdminID    *uint
	Admin      Admin

	Ac_his []Ac_his `grom:"foreignkey:ActivityID"`
}
