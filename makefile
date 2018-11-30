GHC         := ghc
GHC_OPTS    := -dynamic


.PHONY: default
default: Main


%: %.hs
	$(GHC) $(GHC_OPTS) $<

.PHONY: distclean
distclean: clean
	rm -rf node_modules

.PHONY: clean
clean:
	rm -rf coverage
