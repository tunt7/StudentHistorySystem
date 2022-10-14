package entity

import "gorm.io/gorm"

type Admin struct {
	gorm.Model
	Aname string
	// Email           string `gorm:"uniqueIndex"`
	Aemail          string
	Apassword       string
	Behavior_Points []Behavior_Point `gorm:"foreignKey:AdminID"`
<<<<<<< HEAD
	Teacher         []Teacher        `gorm:"foreignKey:AdminID"`
	Branch          []Branch         `gorm:"foreignKey:AdminID"`
=======
	Teachers        []Teacher        `gorm:"foreignkey:AdminID"`
>>>>>>> 734e7698cf3dc3bc2f860edf4abb07291dd9078b
}
