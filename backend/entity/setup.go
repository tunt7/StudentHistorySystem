package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("history_student.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db = database

}
