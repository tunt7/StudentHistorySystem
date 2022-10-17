package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tunt7/SA-Project/entity"
)

// POST /users
func CreateBH(c *gin.Context) {
	var bh entity.Behavior_Point
	if err := c.ShouldBindJSON(&bh); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&bh).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bh})
}

// GET /user/:id
func GetBH(c *gin.Context) {
	var bh entity.Behavior_Point
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM behavior_points WHERE id = ?", id).Scan(&bh).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bh})
}

// GET /users
func ListBH(c *gin.Context) {
	// var bp []entity.Behavior_Point
	result := []map[string]interface{}{}
	entity.DB().Table("behavior_points").
		Select("behavior_points.id, behavior_points.bppoint, behavior_points.bpdetail, admins.aname, students.sfirstname, students.slastname, point_types.ptname, behavior_types.btname").
		Joins("left join admins on admins.id = behavior_points.admin_id").
		Joins("left join students on students.id = behavior_points.student_id").
		Joins("left join point_types on point_types.id = behavior_points.point_type_id").
		Joins("left join behavior_types on behavior_types.id = behavior_points.behavior_type_id").
		Find(&result)

	c.JSON(http.StatusOK, gin.H{"data": result})
}

// DELETE /users/:id
func DeleteBH(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM behavior_points WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "behavior point not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users
func UpdateBH(c *gin.Context) {
	var bh entity.Behavior_Point
	if err := c.ShouldBindJSON(&bh); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", bh.ID).First(&bh); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	if err := entity.DB().Save(&bh).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bh})
}
