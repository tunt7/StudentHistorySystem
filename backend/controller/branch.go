package controller 

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tunt7/SA-Project/entity" 
)

// POST /users
func CreateBr(c *gin.Context) {
	var branch entity.Branch
	var admin entity.Admin
	var academies entity.Academy
	var course entity.Course

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร branch
	if err := c.ShouldBindJSON(&branch); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา admin ด้วย id
	if tx := entity.DB().Where("id = ?", branch.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "video not found"})
		return
	}

	// 10: ค้นหา academy ด้วย id
	if tx := entity.DB().Where("id = ?", branch.AcademyID).First(&academies); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "resolution not found"})
		return
	}

	// 11: ค้นหา course ด้วย id
	if tx := entity.DB().Where("id = ?", branch.CourseID).First(&course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "playlist not found"})
		return
	}
	// 12: สร้าง branch
	wv := entity.Branch{
		Brname:  branch.Brname,             
		Contact: branch.Contact,                 
		Admin:    admin,               // โยงความสัมพันธ์กับ Entity admin
		Academy: academies,  // โยงความสัมพันธ์กับ Entity academies
		Course: course,     // โยงความสัมพันธ์กับ Entity course
	}

	// 13: บันทึก
	if err := entity.DB().Create(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": wv})
}

// GET /user/:id
func GetBr(c *gin.Context) {
	var br entity.Branch
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM branches WHERE id = ?", id).Scan(&br).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": br})
}

// GET /users
func ListBr(c *gin.Context) {
	// var bp []entity.Behavior_Point
	result := []map[string]interface{}{}
	entity.DB().Table("branches").
		Select("branches.id, branches.brname, branches.contact, admins.aname, academies.acaname, course.cname").
		Joins("left join admins on admins.id = branches.admin_id").
		Joins("left join academies on academies.id = branches.academy_id").
		Joins("left join course on course.id = branches.courses_id").
		Find(&result)

	c.JSON(http.StatusOK, gin.H{"data": result})

}

// DELETE /users/:id
func DeleteBr(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM branches WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "behavior point not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users
func UpdateBr(c *gin.Context) {
	var br entity.Branch
	if err := c.ShouldBindJSON(&br); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", br.ID).First(&br); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	if err := entity.DB().Save(&br).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": br})
}
 