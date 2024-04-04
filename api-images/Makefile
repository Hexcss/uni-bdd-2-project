# Makefile for TypeScript Express App using ts-node and ts-node-dev

# Variables
NODE_MODULES := node_modules
SRC_DIRS := src/controllers src/services src/middlewares src/models src/routes src/utils src/utils/functions src/utils/interfaces src/utils/types src/utils/enums src/utils/validations src/config tests

# Commands
install:
	npm init -y
	npm install typescript ts-node ts-node-dev --save-dev
	npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
	npm install prettier eslint-config-prettier eslint-plugin-prettier --save-dev
	npm install jest ts-jest @types/jest --save-dev
	npx tsc --init
	@$(MAKE) create-tsconfig
	@$(MAKE) create-gitignore
	@$(MAKE) create-env
	@$(MAKE) create-folders
	@$(MAKE) create-update-script
	@$(MAKE) update-package-json
	@$(MAKE) delete-update-script
	@$(MAKE) create-index-files
	@$(MAKE) download-app-file
	@$(MAKE) download-entry-point-file
	@$(MAKE) download-config-file
	@$(MAKE) download-docker-config
	@$(MAKE) download-readme
	@$(MAKE) download-code-control
	npm install express cors helmet @types/express @types/cors @types/node dotenv
	@$(MAKE) dev

create-folders:
	@mkdir -p $(SRC_DIRS)

create-index-files:
	@$(foreach dir,$(SRC_DIRS),echo "// Index file for $(dir)" > $(dir)/index.ts &&) echo "// Root index file" > src/index.ts
	echo "// App file" > src/app.ts

create-tsconfig:
	echo '{"compilerOptions": {"module": "commonjs", "esModuleInterop": true, "target": "es6", "moduleResolution": "node", "sourceMap": true, "outDir": "dist"}, "include": ["src/**/*"]}' > tsconfig.json

download-app-file:
	curl -L https://dl.dropboxusercontent.com/scl/fi/hueu3afswjj9ff3jl7v4a/app.ts?rlkey=hgzdqmbglb66gik6zqq55w5yd -o src/app.ts

download-entry-point-file:
	curl -L https://dl.dropboxusercontent.com/scl/fi/6spr4nd4f3zxa2cnzt3d6/index.ts?rlkey=vz1ege6tderniv5tgegxswfuu -o src/index.ts

download-config-file:
	curl -L https://dl.dropboxusercontent.com/scl/fi/jgzxl7xkvvuexazvqrf4x/config-index.ts?rlkey=auyx3deuujxgi1yfwauz2353v -o src/config/index.ts

download-docker-config:
	curl -L https://dl.dropboxusercontent.com/scl/fi/jsijec6i0nuno24u98yrd/Dockerfile.development?rlkey=tr4ihhdwc0jvqlwu3bcpvwxch -o Dockerfile.development
	curl -L https://dl.dropboxusercontent.com/scl/fi/c65a3tqc3wjpriup4bs2y/Dockerfile?rlkey=1mdhivcn14ey70qpb7h2g95zz -o Dockerfile
	curl -L https://dl.dropboxusercontent.com/scl/fi/pvlp548p3hwya1grqkjgm/docker-compose.yml?rlkey=yb8pu4fhbd9yaokxzlbqcjmre -o docker-compose.yml

download-code-control:
	curl -L https://dl.dropboxusercontent.com/scl/fi/4zdzgzu8bkydd8gdfly0c/lint.eslintrc.json?rlkey=gufej75909y0liya4c7ciydci -o .eslintrc.json
	curl -L https://dl.dropboxusercontent.com/scl/fi/vpk6161v78qub7b0lycbq/pretty.prettierrc?rlkey=72j0aymkurk7uv47c81tzcfyq -o .prettierrc

download-readme:
	curl -L https://dl.dropboxusercontent.com/scl/fi/qcbb4lcf7hd74dpgaa68o/README.md?rlkey=eauahe76wwblnomnlg998xokk -o README.md

create-update-script:
	echo "const fs = require('fs');" > update-package-json.js
	echo "const packageJsonPath = './package.json';" >> update-package-json.js
	echo "const packageJson = require('./package.json');" >> update-package-json.js
	echo "packageJson.scripts = packageJson.scripts || {};" >> update-package-json.js
	echo "packageJson.scripts.start = 'ts-node src/index.ts';" >> update-package-json.js
	echo "packageJson.scripts.dev = 'ts-node-dev --respawn --transpile-only src/index.ts';" >> update-package-json.js
	echo "packageJson.scripts['lint'] = 'eslint \\'src/**/*.ts\\' --quiet';" >> update-package-json.js
	echo "packageJson.scripts['lint:fix'] = 'eslint \\'src/**/*.ts\\' --quiet --fix';" >> update-package-json.js
	echo "packageJson.scripts['format'] = 'prettier --write \\'src/**/*.{ts,js,json}\\'';" >> update-package-json.js
	echo "packageJson.scripts.test = 'jest';" >> update-package-json.js
	echo "fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));" >> update-package-json.js

update-package-json:
	node update-package-json.js

delete-update-script:
	rm update-package-json.js

create-gitignore:
	echo "/node_modules/" > .gitignore
	echo "/dist/" >> .gitignore
	echo ".env" >> .gitignore

create-env:
	echo "PORT=3000" > .env

start:
	npm run start

dev:
	npm run dev

clean:
	rm -rf $(NODE_MODULES)

.PHONY: install create-folders update-package-json create-update-script create-index-files delete-update-script start dev clean
