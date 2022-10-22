package entity
 
import (
	"gorm.io/gorm" 
	
)

type Academy struct {
	gorm.Model
	Acaname       string
	Branch        []Branch  `gorm:"foreignkey:AcademyID"`
	Student       []Student `gorm:"foreignkey:AcademyID"`
} 

type Building struct {
	gorm.Model
	Buname       string
	Room          []Room `gorm:"foreignkey:BuildingID"`
} 

type Room struct { 
	gorm.Model 
	Rname   string
    BuildingID *uint
	Building  Building
	Branch []Branch `gorm:"foreignkey:RoomID"`
	
}

type Branch struct {
	gorm.Model
	Brname  string
	Contact string
  
	AdminID *uint  
	Admin   Admin

	AcademyID *uint
	Academy   Academy

	RoomID *uint
	Room   Room

	Teachers []Teacher `gorm:"foreignkey:BranchID"`
	Student  []Student `gorm:"foreignkey:BranchID"`
}
