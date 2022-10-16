package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tunt7/SA-Project/entity"
)

// POST /academys
func Createacademy(c *gin.Context) {
	var academy entity.Academy
	if err := c.ShouldBindJSON(&academy); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&academy).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": academy})
}

// GET /academy/:id
func Getacademy(c *gin.Context) {
	var academy entity.Academy
	id := c.Param("id")
	if err := entity.DB().Preload("Owner").Raw("SELECT * FROM academies WHERE id = ?", id).Find(&academy).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": academy})
}

// GET /academys
func Listacademys(c *gin.Context) {
	var academys []entity.Academy
	if err := entity.DB().Preload("Owner").Raw("SELECT * FROM academies").Find(&academys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": academys})
}

// DELETE /academys/:id
func Deleteacademy(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM academies WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "academies not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /academys
func Updateacademy(c *gin.Context) {
	var academy entity.Academy
	if err := c.ShouldBindJSON(&academy); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", academy.ID).First(&academy); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "academies not found"})
		return
	}

	if err := entity.DB().Save(&academy).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": academy})
}
