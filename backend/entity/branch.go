package entity

import (
<<<<<<< HEAD
=======
	//"time"

>>>>>>> 734e7698cf3dc3bc2f860edf4abb07291dd9078b
	"gorm.io/gorm"
)

type Academy struct {
	gorm.Model
<<<<<<< HEAD
	Acaname       string
	Building_name string
	Branch        []Branch  `gorm:"foreignkey:AcademyID"`
	Student       []Student `gorm:"foreignkey:AcademyID"`
=======
	Name          string
	Building_name string
	Branch        []Branch `gorm:"foreignkey:AcademyID"`
>>>>>>> 734e7698cf3dc3bc2f860edf4abb07291dd9078b
}

type Branch struct {
	gorm.Model
<<<<<<< HEAD
	Brname  string
=======
	Name    string
>>>>>>> 734e7698cf3dc3bc2f860edf4abb07291dd9078b
	Contact string

	AdminID *uint
	Admin   Admin

	AcademyID *uint
	Academy   Academy

<<<<<<< HEAD
	Teachers []Teacher `gorm:"foreignkey:BranchID"`
	Student  []Student `gorm:"foreignkey:BranchID"`
=======
	Teachers []Teacher `gorm:"foreignkey:TeacherID"`
>>>>>>> 734e7698cf3dc3bc2f860edf4abb07291dd9078b
}
