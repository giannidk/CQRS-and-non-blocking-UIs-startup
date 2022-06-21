start:
	@echo "Starting the Project on Docker..."
	@mkdir -p .docker-data
	@docker-compose up -d postgres hasura adminer

start-all:
	@echo "Starting the Project on Docker..."
	@mkdir -p .docker-data
	@docker-compose up -d postgres hasura adminer
	@cd client && npm run start

install-client:
	@cd client && npm install

stop:
	@echo "Stopping the Project..."
	@docker-compose down

clean: stop
	@echo "Deleting the Project's state..."
	@rm -rf .docker-data	

reset: stop clean start


#
# ENV defaults
#

PROJECT:= cqrs-init
ENDPOINT:= http://localhost:8080
SECRET := "hasura"

#
# Hasura migrations
#

hasura-init:
	@hasura init $(PROJECT) --endpoint $(ENDPOINT) --admin-secret $(SECRET)


migrate-create:
	@hasura migrate create \
		"$(name)" \
		--from-server \
		--database-name default \
		--project $(PROJECT)
		--endpoint $(ENDPOINT)


migrate-status:
	@hasura migrate status \
		--database-name default \
		--project $(PROJECT) \
		--endpoint $(ENDPOINT)


migrate-apply:
	@hasura migrate apply \
		--version "$(version)" \
		--database-name default \
		--project $(PROJECT)
		--endpoint $(ENDPOINT)


metadata-export:
	@hasura metadata export \
		--project $(PROJECT)
		--endpoint $(ENDPOINT)


metadata-apply:
	@hasura metadata apply --project $(PROJECT)


seed-create:
	@hasura seed create \
	"$(name)" \
	--database-name default \
	--project $(PROJECT) \
	--from-table todos \
	--from-table commands \
	--from-table responses



seed-apply:
	@hasura seed apply \
	--file "$(name)".sql \
	--database-name default \
	--project $(PROJECT)


db: 
	@hasura migrate apply --version "1655298356270" --database-name default --project $(PROJECT)
	@hasura metadata apply --project $(PROJECT)
