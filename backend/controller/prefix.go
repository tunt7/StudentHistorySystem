package controller

import (
	"net/http"

	"github.com/tunt7/SA-Project/entity"
	"github.com/gin-gonic/gin"
)

// POST /resolutions
func CreatePrefix(c *gin.Context) {
	var pre entity.Prefix
	if err := c.ShouldBindJSON(&pre); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&pre).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pre})
}

// GET /resolution/:id
func GetPrefix(c *gin.Context) {
	var pre entity.Prefix
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM prefixes WHERE id = ?", id).Scan(&pre).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pre})
}

// GET /resolutions
func ListPrefix(c *gin.Context) {
	var pre []entity.Prefix
	if err := entity.DB().Raw("SELECT * FROM prefixes").Scan(&pre).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pre})
}

// DELETE /resolutions/:id
func DeletePrefix(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM prefixes WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "resolution not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /resolutions
func UpdatePrefix(c *gin.Context) {
	var pre entity.Prefix
	if err := c.ShouldBindJSON(&pre); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", pre.ID).First(&pre); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}

	if err := entity.DB().Save(&pre).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pre})
}
