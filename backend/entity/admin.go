package entity

import "gorm.io/gorm"

type Admin struct {
	gorm.Model
	Aname string
	// Email           string `gorm:"uniqueIndex"`
	Aemail          string
	Apassword       string
	Behavior_Points []Behavior_Point `gorm:"foreignKey:AdminID"`
	Teacher         []Teacher        `gorm:"foreignKey:AdminID"`
	Branch          []Branch         `gorm:"foreignKey:AdminID"`
	Ac_his          []Ac_his         `gorm:"foreignKey:AdminID"`
}
