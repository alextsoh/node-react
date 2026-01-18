# WSL

project under /home dir


# K8s DASHBOARD

kubectl proxy 
kubectl -n kubernetes-dashboard create token admin-user
# COMPOSE


docker compose up -d --build

docker compose down -v --rmi all --remove-orphans



.PHONY: network build-node build-nginx build-vite run-postgres run-node run-golang run-vite run-nginx compose-up compose-down


network:
	docker network create my-network1 || true


# BUILD IMAGES

build-node:
	docker build -t api-node -f ./api-node/Dockerfile ./api-node


build-nginx:
	docker build -t client-react-nginx -f ./client-react/Dockerfile.nginx ./client-react

build-vite:
	docker build -t client-vite -f ./client-react/Dockerfile.vite ./client-react

# RUN CONTAINERS

run-postgres:
	docker run -d \
		--name postgres-db \
		--network my-network \
		-e POSTGRES_USER=postgresuser \
		-e POSTGRES_PASSWORD=safepassword \
		-e POSTGRES_DB=appdb \
		-v pgdata:/var/lib/postgresql/data \
		--restart unless-stopped \
		postgres:18-alpine

run-node:
	docker run -d \
		--name api-node \
		--network my-network \
		-e DATABASE_URL=postgres://postgres:safepassword@postgres-db:5432/postgresuser \
		-p 3000:3000 \
		--restart unless-stopped \
		api-node

run-golang:
	docker run -d \
		--name api-golang \
		--network my-network \
		-e DATABASE_URL=${DATABASE_URL} \
		-p 8080:8080 \
		--restart unless-stopped \
		api-golang

run-vite:
	docker run -d \
		--name client-react-vite \
		--network my-network \
		-v $$(pwd):/usr/src/app \
		-v /usr/src/app/node_modules \
		-p 5173:5173 \
		--restart unless-stopped \
		client-vite

run-nginx:
	docker run -d \
		--name client-react-nginx \
		--network my-network \
		-p 80:8080 \
		--restart unless-stopped \
		client-react-nginx



