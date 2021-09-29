SRC = $(wildcard src/*.ts)
LIB = $(SRC:src/%.ts=lib/%.js)

lib: $(LIB)
lib/%.js: src/%.ts babel.config.json
	mkdir -p $(@D)
	npx babel --extensions ".ts" $< -o $@
