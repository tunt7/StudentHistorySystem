package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tunt7/SA-Project/entity"
)

// POST /PointType

func CreatePointType(c *gin.Context) {
	var pt entity.Point_Type
	if err := c.ShouldBindJSON(&pt); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&pt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pt})

}

// GET /PointType/:id

func GetPointType(c *gin.Context) {
	var pt entity.Point_Type
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM point_types WHERE id = ?", id).Scan(&pt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pt})

}

// GET /PointTypes

func ListPointType(c *gin.Context) {
	var pt []entity.Point_Type
	if err := entity.DB().Raw("SELECT * FROM point_types").Scan(&pt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pt})

}

// DELETE /PointTypes/:id

func DeletePointType(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM point_types WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PointType not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /PointTypes

func UpdatePointType(c *gin.Context) {
	var pt entity.Point_Type
	if err := c.ShouldBindJSON(&pt); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", pt.ID).First(&pt); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "point_types not found"})
		return
	}

	if err := entity.DB().Save(&pt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pt})

}
