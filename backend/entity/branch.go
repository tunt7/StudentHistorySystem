package entity

import (
	"gorm.io/gorm"
)

type Academy struct {
	gorm.Model
	Acaname       string
	Building_name string
	Branch        []Branch  `gorm:"foreignkey:AcademyID"`
	Student       []Student `gorm:"foreignkey:AcademyID"`
}

type Course struct {
	gorm.Model
	Name   string
	Branch []Branch `gorm:"foreignkey:CourseID"`
}

type Branch struct {
	gorm.Model
	Brname  string
	Contact string

	AdminID *uint
	Admin   Admin

	AcademyID *uint
	Academy   Academy

	CourseID *uint
	Course   Course

	Teachers []Teacher `gorm:"foreignkey:BranchID"`
	Student  []Student `gorm:"foreignkey:BranchID"`
}
