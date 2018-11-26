GHC	        := ghc
GHC_OPTS    := -dynamic


.PHONY: default
default: Main


%: %.hs
	$(GHC) $(GHC_OPTS) $<
