up:
	docker-compose up -d

logs:
	docker-compose logs -f

install:
	docker-compose exec app npm install

down:
	docker-compose down

test:
	docker-compose exec app npm run test