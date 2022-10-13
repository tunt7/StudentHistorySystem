package entity

import (
	//"time"

	"gorm.io/gorm"
)

type Academy struct {
	gorm.Model
	Name          string
	Building_name string
	Branch        []Branch `gorm:"foreignkey:AcademyID"`
}

type Branch struct {
	gorm.Model
	Name    string
	Contact string

	AdminID *uint
	Admin   Admin

	AcademyID *uint
	Academy   Academy

	Teachers []Teacher `gorm:"foreignkey:TeacherID"`
}
