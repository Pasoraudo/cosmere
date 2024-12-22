help:
	@awk -F ':|##' \
		'/^[^\t].+?:.*?##/ {\
		printf "\033[36m%-30s\033[0m %s\n", $$1, $$NF \
		}' $(MAKEFILE_LIST)

serve: ## Starts local development
	ng serve

pretty: ## Runs biome format
	npx @biomejs/biome format --write

biome-lint: ## Runs biome lint
	npx @biomejs/biome lint --write

ts-lint: ## Runs typescript linter
	tsc --noEmit
