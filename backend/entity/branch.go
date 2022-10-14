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

type Branch struct {
	gorm.Model
	Brname  string
	Contact string

	AdminID *uint
	Admin   Admin

	AcademyID *uint
	Academy   Academy

	Teachers []Teacher `gorm:"foreignkey:BranchID"`
	Student  []Student `gorm:"foreignkey:BranchID"`
}
