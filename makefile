.PHONY: all
all: ci
	$(MAKE) lint test

.PHONY: lint
lint:
	npm run lint

.PHONY: test
test:
	npm t -- --notify

.PHONY: ci
ci:
	npm ci

.PHONY: distclean
distclean: clean
	rm -rf node_modules

.PHONY: clean
clean:
	rm -rf coverage
