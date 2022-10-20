package main

import (
	"github.com/gin-gonic/gin"
	"github.com/tunt7/SA-Project/controller"
	"github.com/tunt7/SA-Project/entity"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	// Admin Routes
	r.GET("/admins", controller.ListAdmin)
	r.GET("/admin/:id", controller.GetAdmin)
	r.POST("/admins", controller.CreateAdmin)
	r.PATCH("/admins", controller.UpdateAdmin)
	r.DELETE("/admins/:id", controller.DeleteAdmin)
	
	// Student Routes
	r.GET("/students", controller.ListSTD)
	r.GET("/student/:id", controller.GetSTD)
	r.POST("/students", controller.CreateSTD)
	r.PATCH("/students", controller.UpdateSTD)
	r.DELETE("/students/:id", controller.DeleteSTD)

	// Behavior_Point Routes
	r.GET("/behavior_points_show", controller.ListBHShow)
	r.GET("/behavior_point/:id", controller.GetBH)
	r.POST("/behavior_points", controller.CreateBH)
	r.PATCH("/behavior_points", controller.UpdateBH)
	r.DELETE("/behavior_points/:id", controller.DeleteBH)

	// Behavior_Type Routes
	r.GET("/behavior_types", controller.ListBehaviorType)
	r.GET("/behavior_type/:id", controller.GetBehaviorType)
	r.POST("/behavior_types", controller.CreateBehaviorType)
	r.PATCH("/behavior_types", controller.UpdateBehaviorType)
	r.DELETE("/behavior_types/:id", controller.DeleteBehaviorType)
	
	// Point_Type Routes
	r.GET("/point_types", controller.ListPointType)
	r.GET("/point_type/:id", controller.GetPointType)
	r.POST("/point_types", controller.CreatePointType)
	r.PATCH("/point_types", controller.UpdatePointType)
	r.DELETE("/point_types/:id", controller.DeletePointType)

		// Activity Routes
	r.GET("/Activities", controller.ListActivity)
	r.GET("/Activities_show", controller.ListActivityShow)
	r.GET("/Activity/:id", controller.GetActivity)
	r.POST("/Activities", controller.CreateActivity)
	r.PATCH("/Activities", controller.UpdateActivity)
	r.DELETE("/Activities/:id", controller.DeleteActivity)

	// Location Routes
	r.GET("/Locations", controller.ListLocation)
	r.GET("/Location/:id", controller.GetLocation)
	r.POST("/Locations", controller.CreateLocation)
	r.PATCH("/Locations", controller.UpdateLocation)
	r.DELETE("/Locations/:id", controller.DeleteLocation)

	// Teacher Routes
	r.GET("/Teachers", controller.ListT)
	r.GET("/Teachers_show", controller.ListTshow)
	r.GET("/Teacher/:id", controller.GetT)
	r.POST("/Teachers", controller.CreateT)
	r.PATCH("/Teachers", controller.UpdateT)
	r.DELETE("/Teachers/:id", controller.DeleteT)
	
	// Prefix Routes
	r.GET("/Prefixes", controller.ListPrefix)
	r.GET("/Prefix/:id", controller.GetPrefix)
	r.POST("/Prefixes", controller.CreatePrefix)
	r.PATCH("/Prefixes", controller.UpdatePrefix)
	r.DELETE("/Prefixes/:id", controller.DeletePrefix)
	
	// Activity History Routes
	r.GET("/Ac_his", controller.ListACHIS)
	r.GET("/Ac_his/:id", controller.GetACHIS)
	r.POST("/Ac_his", controller.CreateACHIS)
	r.PATCH("/Ac_his", controller.UpdateACHIS)
	r.DELETE("/Ac_his/:id", controller.DeleteACHIS)

	// Run the server
	r.Run()
}
