package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tunt7/SA-Project/entity"
)

// POST /users
func CreateEL(c *gin.Context) {
	var el entity.Student
	if err := c.ShouldBindJSON(&el); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	if err := entity.DB().Create(&el).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": el})
}

// GET /user/:id
func GetEL(c *gin.Context) {
	var el entity.Education_Level
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM education_levels WHERE id = ?", id).Scan(&el).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": el})
}

func ListEL(c *gin.Context) {
	var bt []entity.Education_Level
	if err := entity.DB().Raw("SELECT * FROM education_levels").Scan(&bt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bt})

}

// DELETE /users/:id
func DeleteEL(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM education_levels WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users
func UpdateEL(c *gin.Context) {
	var el entity.Education_Level
	if err := c.ShouldBindJSON(&el); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", el.ID).First(&el); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	if err := entity.DB().Save(&el).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": el})
}
