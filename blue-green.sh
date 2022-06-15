#!/bin/bash
EXIST_BLUE=$(docker ps | grep nuxtjs_blue)
echo $EXIST_BLUE
if [ -z "$EXIST_BLUE" ]; then
		docker run --name nuxtjs_blue -p 8080:8080 -td snkrs98/frontend:latest

		sleep 10
		docker kill nuxtjs_green
        
		sleep 10
        docker rm nuxtjs_green
        
else
        #if blue
		docker run --name nuxtjs_green -p 8081:8080 -td snkrs98/frontend:latest
		sleep 10
		
		docker kill nuxtjs_blue
		
        sleep 10
        docker rm nuxtjs_blue
        
fi
