package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tunt7/SA-Project/entity"
)

// POST /users
func CreateEQ(c *gin.Context) {
	var eq entity.Education_Qualification
	if err := c.ShouldBindJSON(&eq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	if err := entity.DB().Create(&eq).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": eq})
}

// GET /user/:id
func GetEQ(c *gin.Context) {
	var eq entity.Education_Qualification
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM education_qualifications WHERE id = ?", id).Scan(&eq).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": eq})
}

// GET /users
func ListEQ(c *gin.Context) {
	// var bp []entity.Behavior_Point
	result := []map[string]interface{}{}
	entity.DB().Table("education_qualifications").
		Select("education_qualifications.id, education_qualifications.eqname").
		Find(&result)

	c.JSON(http.StatusOK, gin.H{"data": result})

}

// DELETE /users/:id
func DeleteEQ(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM education_qualifications WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "education qualification not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users
func UpdateEQ(c *gin.Context) {
	var eq entity.Education_Qualification
	if err := c.ShouldBindJSON(&eq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", eq.ID).First(&eq); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "education qualification not found"})
		return
	}
	if err := entity.DB().Save(&eq).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": eq})
}
