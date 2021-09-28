.PHONY: distclean
distclean: clean
	rm -rf node_modules

.PHONY: clean
clean:
	rm -rf coverage
