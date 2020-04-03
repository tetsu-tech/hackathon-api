up:
	docker-compose up -d

logs:
	docker-compose logs -f

install:
	docker-compose exec app npm install