#!/bin/bash

# Ejecutar ng deploy.sh con base-href
ng deploy.sh --base-href=/cosmere/

# Agregar todos los cambios al área de preparación de Git
git add -A

# Hacer un commit con el mensaje "deploy.sh"
git commit -m "deploy"

# Empujar los cambios al repositorio remoto (origin) en la rama master
git push origin master
