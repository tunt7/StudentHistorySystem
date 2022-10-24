package main

import (
	"github.com/gin-gonic/gin"
	"github.com/tunt7/SA-Project/controller"
	"github.com/tunt7/SA-Project/entity"
	"github.com/tunt7/SA-Project/middlewares"
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

	router := gin.Default()
	router.Use(CORSMiddleware())
	
	r := router.Group("/")
	{
		r.Use(middlewares.Authorizes())
		{
			// Admin Routes
			r.GET("/admins", controller.ListAdmin)
			r.GET("/admin/:id", controller.GetAdmin)
			r.POST("/admins", controller.CreateAdmin)
			r.PATCH("/admins", controller.UpdateAdmin)
			r.DELETE("/admins/:id", controller.DeleteAdmin)
	
			// Student Routes
			r.GET("/students", controller.ListSTD)
			r.GET("/student_show", controller.ListSTDShow)
			r.GET("/student/:id", controller.GetSTD)
			r.POST("/students", controller.CreateSTD)
			r.PATCH("/students", controller.UpdateSTD)
			r.DELETE("/students/:id", controller.DeleteSTD)
	
			// Blood Type Routes
			r.GET("/blood_types", controller.ListBT)
			r.GET("/blood_type/:id", controller.GetBT)
			r.POST("/blood_types", controller.CreateBT)
			r.PATCH("/blood_types", controller.UpdateBT)
			r.DELETE("/blood_types/:id", controller.DeleteBT)
	
			// Education Level Routes
			r.GET("/els", controller.ListEL)
			r.GET("/el/:id", controller.GetEL)
			r.POST("/els", controller.CreateEL)
			r.PATCH("/els", controller.UpdateEL)
			r.DELETE("/els/:id", controller.DeleteEL)
	
			// Educatoin Qualification Routes
			r.GET("/eqs", controller.ListEQ)
			r.GET("/eq/:id", controller.GetEQ)
			r.POST("/eqs", controller.CreateEQ)
			r.PATCH("/eqs", controller.UpdateEQ)
			r.DELETE("/eqs/:id", controller.DeleteEQ)

			// Branch Routes
			r.GET("/branches", controller.ListBranches)
			r.GET("/branches_show", controller.ListBranchesShow)
			r.GET("/branches/:id", controller.GetBranches)
			r.POST("/branches", controller.CreateBranches)
			r.PATCH("/branches", controller.UpdateBranches)
			r.DELETE("/branches/:id", controller.DeleteBranches)

			// Academy Routes
			r.GET("/academies", controller.Listacademy)
			r.GET("/academies/:id", controller.Getacademy)
			r.POST("/academies", controller.Createacademy)
			r.PATCH("/academies", controller.Updateacademy)
			r.DELETE("/academies/:id", controller.Deleteacademy)

			// Room Routes
			r.GET("/rooms", controller.Listroom)
			r.GET("/rooms/:id", controller.Getroom)
			r.POST("/rooms", controller.Createroom)
			r.PATCH("/rooms", controller.Updateroom)
			r.DELETE("/rooms/:id", controller.Deleteroom)

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
			r.GET("/Ac_his_sum", controller.ListACHIS2)
			r.GET("/Ac_his/:id", controller.GetACHIS)
			r.POST("/Ac_his", controller.CreateACHIS)
			r.PATCH("/Ac_his", controller.UpdateACHIS)
			r.DELETE("/Ac_his/:id", controller.DeleteACHIS)		}
	}

	// Signup User Route
	router.POST("/signup", controller.CreateAdmin)
	// login User Route
	router.POST("/login", controller.Login)

	// Run the server
	router.Run()
}
