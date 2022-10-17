package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tunt7/SA-Project/entity"
)

// POST /users
func CreateT(c *gin.Context) {
	var t entity.Teacher
	if err := c.ShouldBindJSON(&t); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&t).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": t})
}

// GET /user/:id
func GetT(c *gin.Context) {
	var t entity.Teacher
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM teacher WHERE id = ?", id).Scan(&t).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": t})
}

// GET /resolutions
func ListT(c *gin.Context) {
	var pre []entity.Teacher
	if err := entity.DB().Raw("SELECT * FROM teachers").Scan(&pre).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pre})
}

// GET /users
func ListTshow(c *gin.Context) {
	// var bp []entity.Behavior_Point
	result := []map[string]interface{}{}
	entity.DB().Table("teachers").
		Select("teachers.id, prefixes.short_name, teachers.tfirst_name, teachers.tlast_name,teachers.temail,teachers.tcontact,branches.brname, admins.aname").
		Joins("left join admins on admins.id = teachers.admin_id").
		Joins("left join prefixes on prefixes.id = teachers.prefix_id").
		Joins("left join branches on branches.id = teachers.branch_id").
		Find(&result)

	c.JSON(http.StatusOK, gin.H{"data": result})

}

// DELETE /users/:id
func DeleteT(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM teacher WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "teacher not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users
func UpdateT(c *gin.Context) {
	var t entity.Behavior_Point
	if err := c.ShouldBindJSON(&t); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", t.ID).First(&t); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	if err := entity.DB().Save(&t).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": t})
}
