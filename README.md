# Transparent Democracy - Frontend

## Technical requirements
- NodeJS v22.0.0
- NPM v10.5.1

Installing NodeJS will automatically install the compatible NPM version.

Tip: use [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) to easily install NodeJS and switch between different NodeJS versions.
If you have Homebrew installed, run `brew install nvm`.

## Install dependencies

Run `npm install` to install all dependencies.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Deploy

### Deploy to Github Pages (current deployment workflow)

We are currently hosting our website on https://watdoetdepolitiek.be using the static web hosting of [Github Pages](https://docs.github.com/en/pages/quickstart).

**Just commit and push your work on git. As soon as your work reaches the main branch, the updated version of the website will get deployed automatically.**
Your latest changes will then be visible at https://watdoetdepolitiek.be (and actually also at https://transparentdemocracy.github.io/website/, the corresponding domain name served by Github Pages).

#### Showing a banner to warn users about website maintenance

If you need to warn users about back-end maintenance, which breaks the website's functionality in some way, you can do so by overwriting the index.html on the gh-pages branch, similarly to https://github.com/transparentdemocracy/website/commit/eb42fe9b5848452d08b38e5d975ff01e8b85e8a4.
For now, that's essentially an overwriting of the Angular app with a static copy of how our landing page looks.
The main.js loading at the bottom of the HTML is also overwritten. Otherwise, during loading of the page, when main.js is loaded, the static landing page copy gets overwritten by the Angular application, making the website maintenance banner disappear again.

#### Explanation of the deployment workflow set-up

We've configured a Github action for this, which deploys to Github Pages. See [website/.github/workflows/gh-pages.yml](https://github.com/transparentdemocracy/website/blob/main/.github/workflows/gh-pages.yml).
The `npm run build:prod` and `npm run test:headless` commands triggered in it are defined in [package.json](https://github.com/transparentdemocracy/website/blob/main/package.json).

This approach is based on https://github.com/rodrigokamada/angular-github-actions?tab=readme-ov-file, with some updates of the dependencies in the `gh-pages.yml`, and tweaks to make it work for our Angular application.
A pre-requisite that was needed for the Github action to work, was that we created a new `gh-pages` branch from `main`.
The Github action now automatically commits and pushes the latest production build of the website to that `gh-pages` branch.

The linking of the watdoetdepolitiek.be domain and the Github Pages was done according to the instructions at https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages.
Our DNS records configuration is done in [Cloudflare](https://dash.cloudflare.com).

### Deploy to AWS (our old deployment workflow):

#### Setting up the server infrastructure

You can skip this step if the server infrastructure has been set up already. Then go immediately to the next section, to deploy.

Setting up our server infrastructure is done manually for now in AWS, no Terraform implemented currently.

This section documents the steps we took to create the server infrastructure, so it is easily set-up again on different cloud provider later, or such that we have a reference of what was set up when we want to write the Terraform for this.

Follow these steps: https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-custom-domain-walkthrough.html#upload-website-content

If your domain name is unable to display the website after following these steps, [check in your mailbox if you first still need to verify your identity](https://stackoverflow.com/a/78563547/5433896) before the DNS registrar makes the domain name resolvable in user's browsers.

For other domain name troubleshooting, for example if we would need to transfer our domain names and run into troubles: https://www.domain.com/help/article/dns-troubleshooting.

#### The actual deployment to AWS

1. Install the Angular CLI: 

```shell
npm install -g @angular/cli
```

2. Build this Angular application for production use:

```shell
ng build --configuration=production
```
This will set the proper environment file, so that we go to the proper backend.

3. Upload the generated build files (dist folder) to the S3 bucket for static website hosting.

When uploading the contents of the dist folder to the S3 bucket, **[make sure you upload `dist/website/browser`, such that index.html lives at root level in the S3 bucket](https://stackoverflow.com/a/78563272/5433896)**, so they will be found when AWS displays the static website living in the S3 bucket, on a user's request.

4. Test if the website is working on the server:
- on the bucket website endpoint: http://watdoetdepolitiek.be.s3-website.eu-west-3.amazonaws.com
- on our domain names: 
  * watdoetdepolitiek.be / www.watdoetdepolitiek.be
  * quefaitlapolitique.be / www.quefaitlapolitique.be
  * wasmachtdiepolitik.be / www.wasmachtdiepolitik.be
