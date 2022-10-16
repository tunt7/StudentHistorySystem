package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tunt7/SA-Project/entity"
)

// POST /courses
func Createcourse(c *gin.Context) {
	var course entity.Course
	if err := c.ShouldBindJSON(&course); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": course})
}

// GET /course/:id
func Getcourse(c *gin.Context) {
	var course entity.Course

	id := c.Param("id")
	if err := entity.DB().Preload("Owner").Raw("SELECT * FROM course WHERE id = ?", id).Find(&course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": course})
}

// GET /courses
func Listcourses(c *gin.Context) {
	var courses []entity.Course
	if err := entity.DB().Preload("Owner").Raw("SELECT * FROM course").Find(&courses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": courses})
}

// DELETE /courses/:id
func Deletecourse(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM course WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /courses
func Updatecourse(c *gin.Context) {
	var course entity.Course
	if err := c.ShouldBindJSON(&course); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", course.ID).First(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}

	if err := entity.DB().Save(&course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": course})
}
