dbup:
	docker-compose up -d
	docker-compose ps

dbrebuild:
	docker-compose down --remove-orphans
	docker-compose up -d
	docker-compose ps

volumes:
	docker volume ls

clearVolume:
	docker volume prune