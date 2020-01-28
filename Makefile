
.PHONY: build package

# a phony dependency that can be used as a dependency to force builds
FORCE:

build: FORCE
	yarn install && yarn build && cd prodserver && yarn install

package:
	cd package && ./package.sh

run:
	cd prodserver && node index.js
