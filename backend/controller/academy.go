package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tunt7/SA-Project/entity"
)

// POST /BehaviorType

func Createacademy(c *gin.Context) {
	var ac entity.Academy
	if err := c.ShouldBindJSON(&ac); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&ac).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ac})

}

// GET /BehaviorType/:id

func Getacademy(c *gin.Context) {
	var ac entity.Academy
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM academies WHERE id = ?", id).Scan(&ac).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ac})

}

// GET /BehaviorTypes

func Listacademy(c *gin.Context) {
	var ac []entity.Academy
	if err := entity.DB().Raw("SELECT * FROM academies").Scan(&ac).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ac})

}

// DELETE /BehaviorTypes/:id

func Deleteacademy(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM academies WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PointType not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /BehaviorTypes

func Updateacademy(c *gin.Context) {
	var ac entity.Academy
	if err := c.ShouldBindJSON(&ac); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", ac.ID).First(&ac); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Academy not found"})
		return
	}

	if err := entity.DB().Save(&ac).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ac})

}
