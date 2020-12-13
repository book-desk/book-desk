dbup:
	docker-compose up -d
	docker-compose ps

dbrebuild:
	docker-compose down --remove-orphans
	docker-compose up -d
	docker-compose ps