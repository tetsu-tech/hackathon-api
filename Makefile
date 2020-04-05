up:
	docker-compose up -d

up-build:
	docker-compose up --build -d

logs:
	docker-compose logs -f

install:
	docker-compose exec app npm install

down:
	docker-compose down

ps:
	docker-compose ps

test:
	docker-compose exec app npm run test