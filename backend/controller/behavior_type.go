package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tunt7/SA-Project/entity"
)

// POST /BehaviorType

func CreateBehaviorType(c *gin.Context) {
	var bt entity.Behavior_Type
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

// GET /BehaviorType/:id

func GetBehaviorType(c *gin.Context) {
	var bt entity.Behavior_Type
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM Behavior_Types WHERE id = ?", id).Scan(&bt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bt})

}

// GET /BehaviorTypes

func ListBehaviorType(c *gin.Context) {
	var bt []entity.Behavior_Type
	if err := entity.DB().Raw("SELECT * FROM Behavior_Types").Scan(&bt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bt})

}

// DELETE /BehaviorTypes/:id

func DeleteBehaviorType(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Behavior_Types WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PointType not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /BehaviorTypes

func UpdateBehaviorType(c *gin.Context) {
	var bt entity.Behavior_Type
	if err := c.ShouldBindJSON(&bt); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", bt.ID).First(&bt); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Behavior_Types not found"})
		return
	}

	if err := entity.DB().Save(&bt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bt})

}
