
.PHONY: build package

# a phony dependency that can be used as a dependency to force builds
FORCE:

install:
	cd package && ./install.sh

build: FORCE
	yarn install && yarn build && cd prodserver && yarn install

package: build
	cd package && ./package.sh

run: build
	cd prodserver && node index.js
