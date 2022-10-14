package entity

import (
	"time"

	"gorm.io/gorm"
)

type Behavior_Point struct {
	gorm.Model
	Bppoint  int
	Bpdetail string
	Date_Rec time.Time

	AdminID        *uint
	Admin          Admin

	PointTypeID    *uint
	Point_Type     Point_Type
	
	BehaviorTypeID *uint
	Behavior_Type  Behavior_Type

	StudentID      *uint
	Student        Student
}

type Point_Type struct {
	gorm.Model
	Ptname          string
	Sign            string
	Behavior_Points []Behavior_Point `gorm:"foreignKey:PointTypeID"`
}

type Behavior_Type struct {
	gorm.Model
	Btname          string
	Behavior_Points []Behavior_Point `gorm:"foreignKey:BehaviorTypeID"`
}
