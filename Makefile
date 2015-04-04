VERSION=0.0.1
NOMBRE="sacao"

N=[0m
G=[01;32m
Y=[01;33m
B=[01;34m

comandos:
	@echo ""
	@echo "${B}Comandos disponibles para ${G}sacao${N}"
	@echo ""
	@echo "  ${Y}Para desarrolladores${N}"
	@echo ""
	@echo "    ${G}iniciar${N}         Instala dependencias."
	@echo "    ${G}compilar${N}        Genera los archivos compilados."
	@echo "    ${G}compilar_live${N}   Compila de forma contínua."
	@echo ""
	@echo "    ${G}ejecutar_linux${N}  Prueba la aplicacion sobre Huayra."
	@echo "    ${G}ejecutar_mac${N}    Prueba la aplicacion sobre OSX."
	@echo ""
	@echo "  ${Y}Para distribuir${N}"
	@echo ""
	@echo "    ${G}version${N}         Genera una nueva versión."
	@echo "    ${G}subir_version${N}   Sube version generada al servidor."
	@echo "    ${G}publicar${N}        Publica el cambio para el paquete deb."
	@echo "    ${G}crear_deb${N}       Genera el paquete deb para huayra."
	@echo ""


iniciar:
	npm install
	bower install

dist: compilar

ejecutar_linux: dist
	nw dist

ejecutar_mac: dist
	/Applications/nwjs.app/Contents/MacOS/nwjs dist

test_mac: ejecutar_mac

build: compilar

publicar:
	dch -i

crear_deb:
	dpkg-buildpackage -us -uc

compilar:
	ember build

compilar_live:
	ember build --watch

version:
	# patch || minor
	@bumpversion patch --current-version ${VERSION} package.json public/package.json Makefile --list
	make build
	@echo "Es recomendable escribir el comando que genera los tags y sube todo a github:"
	@echo ""
	@echo "make ver_sync"

subir_version:
	git commit -am 'release ${VERSION}'
	git tag '${VERSION}'
	git push
	git push --all
	git push --tags

.PHONY: dist
