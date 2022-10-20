package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tunt7/SA-Project/entity"
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
	var pre []entity.Activity
	if err := entity.DB().Raw("SELECT * FROM activities").Scan(&pre).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pre})
}

// GET /Activities

func ListActivityShow(c *gin.Context) {

	result := []map[string]interface{}{}
	entity.DB().Table("activities").
		Select("activities.id, activities.acname, activities.date_s, activities.date_e, teachers.tfirst_name, teachers.tlast_name, admins.aname, locations.lname").
		Joins("left join admins on admins.id = activities.admin_id").
		Joins("left join locations on locations.id = activities.location_id").
		Joins("left join teachers on teachers.id = activities.teacher_id").
		Find(&result)

	c.JSON(http.StatusOK, gin.H{"data": result})

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
