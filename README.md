# Please note
This project contains a .npmrc file which sets the `force` parameter to true. This adds an implicit `--force` flag to npm commands such as `npm install`.

The reason this has been added to `.npmrc` is that GCP App Engine, where I deploy this app, runs `install` prior to a deployment. `--force` is needed for installs because there are currently two dependencies with conflicting transitive dependencies on an old version of React. One of these dependencies is easily replaceable, but the other (react-fontawesome) is not. I expect FontAwesome will get their stuff together, but until then, this is the only way I've discovered to set the `--force` flag during GCP builds.

# Prerequisites
Install Node 22 via [nvm](https://github.com/nvm-sh/nvm).

# Run the application
```
nvm use 22
npm install --force
npm start
```
