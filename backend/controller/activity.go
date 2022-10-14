package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/tunt7/SA-Project/entity"
	"net/http"
)

// POST /Activity

func CreateActivity(c *gin.Context) {
	var activity entity.Activity
	if err := c.ShouldBindJSON(&activity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&activity).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": activity})

}

// GET /activity/:id

func GetActivity(c *gin.Context) {
	var activity entity.Activity
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM Activities WHERE id = ?", id).Scan(&activity).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": activity})

}

// GET /Activities

func ListActivity(c *gin.Context) {
	var Activities []entity.Activity
	if err := entity.DB().Raw("SELECT * FROM Activities").Scan(&Activities).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Activities})

}

// DELETE /Activities/:id

func DeleteActivity(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Activities WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "activity not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /Activities

func UpdateActivity(c *gin.Context) {
	var activity entity.Activity
	if err := c.ShouldBindJSON(&activity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", activity.ID).First(&activity); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "activity not found"})
		return
	}

	if err := entity.DB().Save(&activity).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": activity})

}
