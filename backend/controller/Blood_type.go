package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tunt7/SA-Project/entity"
)

// POST /users
func CreateBT(c *gin.Context) {
	var bt entity.Blood_Type
	if err := c.ShouldBindJSON(&bt); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	if err := entity.DB().Create(&bt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bt})
}

// GET /user/:id
func GetBT(c *gin.Context) {
	var bt entity.Blood_Type
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM blood_types WHERE id = ?", id).Scan(&bt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bt})
}

// GET /users
func ListBT(c *gin.Context) {
	// var bp []entity.Behavior_Point
	result := []map[string]interface{}{}
	entity.DB().Table("blood_types").
		Select("blood_types.id, blood_types.bt_name").
		Find(&result)

	c.JSON(http.StatusOK, gin.H{"data": result})

}

// DELETE /users/:id
func DeleteBT(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM blood_types WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "blood type not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users
func UpdateBT(c *gin.Context) {
	var bt entity.Behavior_Point
	if err := c.ShouldBindJSON(&bt); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", bt.ID).First(&bt); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "blood type not found"})
		return
	}
	if err := entity.DB().Save(&bt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bt})
}
