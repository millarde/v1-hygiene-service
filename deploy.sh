#!/bin/bash

APP_NAME=v1-hygiene-service

REPO_NAME=v1-hygiene-repository
REPO_ADDRESS=yourrepo.dkr.ecr.us-west-2.amazonaws.com
DATE_STR=`date -u +%Y%m%d_%H%M%SZ`
SHA_STR=`git rev-parse HEAD | cut -c -12`

IMAGE_VERSION=${APP_NAME}-${DATE_STR}-${SHA_STR}

docker build -t ${REPO_NAME} .

docker tag ${REPO_NAME} ${REPO_ADDRESS}/${REPO_NAME}:${APP_NAME}-latest
docker tag ${REPO_NAME} ${REPO_ADDRESS}/${REPO_NAME}:${IMAGE_VERSION}

$(aws ecr get-login --no-include-email --region us-west-2)

docker push ${REPO_ADDRESS}/${REPO_NAME}