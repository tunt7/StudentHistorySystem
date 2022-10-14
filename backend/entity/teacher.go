package entity

import (
	"gorm.io/gorm"
)

type Prefix struct {
	gorm.Model
	FullName  string
	ShortName string
	Teachers  []Teacher `gorm:"foreignkey:PrefixID"`
}

type Teacher struct {
	gorm.Model
	TfirstName string
	TlastName  string
	// Temail     string `gorm:"uniqueIndex"`
	Temail   string
	Tcontact string

	PrefixID *uint
	Prefix   Prefix

	BranchID *uint
	Branch   Branch
	
	AdminID  *uint
	Admin    Admin

	Student []Student `gorm:"foreignKey:TeacherID"`
}
