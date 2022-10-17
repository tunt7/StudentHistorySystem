package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/tunt7/SA-Project/entity"
	"net/http"
)

// POST /Admin

func CreateAdmin(c *gin.Context) {
	var am entity.Admin
	if err := c.ShouldBindJSON(&am); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&am).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": am})

}

// GET /Admin/:id

func GetAdmin(c *gin.Context) {
	var am entity.Admin
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM admins WHERE id = ?", id).Scan(&am).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": am})

}

// GET /Activities

func ListAdmin(c *gin.Context) {
	var am []entity.Admin
	if err := entity.DB().Raw("SELECT * FROM admins").Scan(&am).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": am})

}

// DELETE /Activities/:id

func DeleteAdmin(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM admins WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /Activities

func UpdateAdmin(c *gin.Context) {
	var am entity.Admin
	if err := c.ShouldBindJSON(&am); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", am.ID).First(&am); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
		return
	}

	if err := entity.DB().Save(&am).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": am})

}
