package entity

import (
	"gorm.io/gorm"
)

type Ac_his struct {
	gorm.Model
	Achour int

	ActivityID *uint
	Activity   Activity

	AdminID *uint
	Admin   Admin

	StudentID *uint
	Student   Student
}
