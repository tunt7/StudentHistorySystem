package controller 

import (
	"net/http"
  
	"github.com/gin-gonic/gin"
	"github.com/tunt7/SA-Project/entity" 
)

// POST /users
func CreateBranches(c *gin.Context) {
	var branches entity.Branch
	var admins entity.Admin
	var academies entity.Academy
	var courses entity.Course

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร branch
	if err := c.ShouldBindJSON(&branches); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา admin ด้วย id
	if tx := entity.DB().Where("id = ?", branches.AdminID).First(&admins); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// 10: ค้นหา academy ด้วย id
	if tx := entity.DB().Where("id = ?", branches.AcademyID).First(&academies); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "academy not found"})
		return
	}

	// 11: ค้นหา course ด้วย id
	if tx := entity.DB().Where("id = ?", branches.CourseID).First(&courses); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}
	// 12: สร้าง branch
	br := entity.Branch{
		Brname:  branches.Brname,             
		Contact: branches.Contact,                 
		Admin:    admins,               // โยงความสัมพันธ์กับ Entity admin
		Academy: academies,  // โยงความสัมพันธ์กับ Entity academies
		Course: courses,     // โยงความสัมพันธ์กับ Entity course
	}

	// 13: บันทึก
	if err := entity.DB().Create(&br).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": br})
}

func ListBranches(c *gin.Context) {
	var branches []entity.Branch
	if err := entity.DB().Raw("SELECT * FROM branches").Scan(&branches).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": branches})
}
// GET /user/:id
func GetBranches(c *gin.Context) {
	var branches entity.Branch
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM branches WHERE id = ?", id).Scan(&branches).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": branches})
}

// GET /users
func ListBranchesShow(c *gin.Context) {
	// var bp []entity.Behavior_Point
	result := []map[string]interface{}{}
	entity.DB().Table("branches").
		Select("branches.id, branches.brname, branches.contact, admins.aname, academies.acaname, courses.cname").
		Joins("left join admins on admins.id = branches.admin_id").
		Joins("left join academies on academies.id = branches.academy_id").
		Joins("left join courses on courses.id = branches.course_id").
		Find(&result)

	c.JSON(http.StatusOK, gin.H{"data": result})

}

// DELETE /users/:id
func DeleteBranches(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM branches WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "behavior point not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users
func UpdateBranches(c *gin.Context) {
	var branches entity.Branch
	if err := c.ShouldBindJSON(&branches); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", branches.ID).First(&branches); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	if err := entity.DB().Save(&branches).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": branches})
}
