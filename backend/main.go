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

	// Behavior_Point Routes
	r.GET("/behavior_points", controller.ListBH)
	r.GET("/behavior_point/:id", controller.GetBH)
	r.POST("/behavior_points", controller.CreateBH)
	r.PATCH("/behavior_points", controller.UpdateBH)
	r.DELETE("/behavior_points/:id", controller.DeleteBH)

	
	
	// Run the server 8080
	r.Run()
}
