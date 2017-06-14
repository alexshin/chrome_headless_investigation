# Overview

This application implements a simple web-service logins into github accout. 
It uses Chrome Headless and Chrome DevTools Protocol to emulate user's behavior.

## How to deploy

* Rename file `github_creds.env.txt` to `github_creds.env` and populate your username and password.

* Run `docker-compose up` in the root directory

## How to check it

* Open `http://localhost:3000/` in your browser