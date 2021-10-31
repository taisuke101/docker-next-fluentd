start: 
	docker-compose up -d && docker logs -f client

end:
	docker-compose down