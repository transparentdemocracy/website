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

## Translations

Feel free to improve our website's texts and translations.
They are located in `src/assets/i18n`.

Most of the time, translations are loaded from the code as follows:

```
<p>
  {{ "main.intro" | translate }}
</p>
```

However, if you want to space a translated text over multiple paragraphs, or include breaklines, then the translation must be loaded differently:

```
<div class="alert alert-primary" role="alert" [innerHTML]="'main.searchRange' | translate"></div>
```

## Deploy

### Deploy for watdoetdepolitiek.be on Cloudflare Pages (current deployment workflow)

We are currently hosting our website on https://watdoetdepolitiek.be using Cloudflare pages

**Just commit and push your work on git. As soon as your work reaches the main branch, the updated version of the website will get deployed automatically.**
Your latest changes will then be visible at https://watdoetdepolitiek.be (and actually also at https://transparentdemocracy.github.io/website/, the corresponding domain name served by Github Pages).

#### Showing a banner to warn users about website maintenance

If you need to warn users about back-end maintenance, which breaks the website's functionality in some way, you can do so by setting the maintenanceModeEnabled flag to true in environment.prod.ts.

If you want to edit the text for the maintenance announcement or the explanation of the impact, you can do so in the JSON files in the `assets/i18n` folder. Look for the maintenance.announcement and maintenance.impact keys.

The maintenance messages are displayed on the `app.component`.

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
