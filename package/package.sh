#!/bin/bash

echo "packaging application"

tar --exclude=.git \
    --exclude=.github \
    --exclude=.DS_Store \
    --exclude=.circleci \
    --exclude=.postman \
    --exclude=.vscode \
    --exclude=node_modules \
    --exclude=package \
    --exclude=test \
    --exclude=.dockerignore \
    --exclude=.gitignore \
    --exclude=Dockerfile \
    --exclude=Makefile \
    -zcvf electionguard-admin.tar.gz electionguard-admin.service ../

echo "packaging complete"
