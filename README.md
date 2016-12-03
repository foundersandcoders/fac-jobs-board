# fac-jobs-board


### Get Started

```
git clone repoURL
cd repoName
npm install

```

To be able to access the Heroku DB locally you will need to have an `env.sh` file which would look like the following:
```
#!/bin/sh
export DATABASE_USER=###
export DATABASE_PASSWORD=###
export DATABASE_HOST=###
export DATABASE_PORT=###
export DATABASE_NAME=###
```

and config.env
```
BASE_URL=http://localhost:4000
GITHUB_CLIENT_ID=####
GITHUB_CLIENT_SECRET=####
GITHUB_AUTH_REDIRECT_URL=/githubauth
JWT_SECRET=####
```

secret keys can be found in the heroku vars. :smile:
