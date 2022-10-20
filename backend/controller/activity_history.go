package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tunt7/SA-Project/entity"
)

// POST /users
func CreateACHIS(c *gin.Context) {
	var ac_h entity.Ac_his
	if err := c.ShouldBindJSON(&ac_h); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&ac_h).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ac_h})
}

// GET /user/:id
func GetACHIS(c *gin.Context) {
	var ac_h entity.Behavior_Point
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM ac_his WHERE id = ?", id).Scan(&ac_h).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ac_h})
}

// GET /users
func ListACHIS(c *gin.Context) {
	// var bp []entity.Behavior_Point
	result := []map[string]interface{}{}
	entity.DB().Table("ac_his").
		Select("ac_his.id, ac_his.student_id, students.sfirstname, students.slastname, activities.acname, ac_his.achour","activities.date_s","activities.date_e").
		Joins("left join students on students.id = ac_his.admin_id").
		Joins("left join activities on activities.id = ac_his.student_id").
		Joins("left join admins on admins.id = ac_his.admin_id").
		Find(&result)

	c.JSON(http.StatusOK, gin.H{"data": result})

}

// DELETE /users/:id
func DeleteACHIS(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM ac_his WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "activity history not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users
func UpdateACHIS(c *gin.Context) {
	var ac_h entity.Ac_his
	if err := c.ShouldBindJSON(&ac_h); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", ac_h.ID).First(&ac_h); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	if err := entity.DB().Save(&ac_h).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ac_h})
}