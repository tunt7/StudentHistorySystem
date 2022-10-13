package entity

import (
	"time"

	"gorm.io/gorm"
)

type Location struct {
	gorm.Model
	Name      string
	Activitys []Activity `grom:"foreignkey:LocationID"`
}

type Activity struct {
	gorm.Model
	Acname     string
	date_s     time.Time
	date_e     time.Time
	time_s     time.Time
	time_e     time.Time
	TeacherID  *uint
	Teacher    Teacher
	LocationID *uint
	Location   Location
	AdminID    *uint
	Admin      Admin
}
