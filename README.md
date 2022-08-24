# Website Factory - Empowered with Nuxt and Contentful

The project can be used as a base to get you started with Contentful. It includes the following features:

- static site generation
- dynamic server side rendering for development
- deploy to aws
- etc.

This project hosts different websites, each built to a new 'dist' folder

Start by checking out the website you want to work on.

  ```
   yarn checkout auto-assurance
  ```

This loads the right environmental variables for the website you are working on

# Installation 

## Locally

Install dependencies:

- aws cli (with seraphin's credentials in the **default** profile)
- node:latest
- yarn
- (optional) for automated deployment: docker & docker-compose

Make sure your docker user has access to the private `seraphinbe` directory on dockerhub.


## Website-factory with docker

If you're experienced with docker and you have docker-compose, you can just run:

```
docker run website-factory-dev
```
This command is mounting a volume with your source code on the container that already has all the dependencies pre-installed. This makes your changes persistent.

# Development

Run project locally. Choose if you want to use staging environment (to preview all articles) or production environment (to preview all published articles)

  ```
    yarn checkout auto-assurance
    yarn dev staging
    yarn dev production
  ```

# Deployment

## Option 1: From your local machine

Make sure you `yarn checkout` the right website to deploy.
You should have the aws CLI installed, with your **default profile** set to the account you want to deploy to.
The scripts below will deploy to the right folder in the right AWS S3 bucket, and invalidate the right Cloudfront distribution.

Staging environments are deployed in SPA mode with the commands

  ```
   yarn warmup staging
   yarn deploy staging
  ```

Production environments are deployed with pre-rendered html files (for SEO)

  ```
   yarn warmup production
   yarn deploy production
  ```

You can warmup, deploy both staging environment with the command

  ```
  yarn everything auto-assurance
  ```

or deploy all websites (defined in `scripts/everything.sh`) with

  ```
  yarn everything the-whole-world
  ```

## Option 2: with docker

Make sure you have built your latest changes (or using an image from dockerhub)

```
docker-compose build
```

@FeatureRequest: configure automated build on docker-hub in 2 clicks, by linking seraphin's github account in docker-hub. Configure automated build when we push on master.

Make sure your aws credentials are set up in `~/.aws/credentials`. Your local file is mounted as a volume on the docker-container.

```
docker-compose run website-factory-production
```

# Launching a new website

## Backend: setup contentful

1. Create new space in contentful
2. Copy object types from one space to another (see helper commands below)
3. Start putting some basic content. Make sure there is a home page, and ideally a few articles
4. Add space id to scripts/contentful-backup.sh

## Front-end: setup cloudfront & nuxt

1. Create staging and production AWS Cloudfront distributions

```
 a) create 2 cloudfront distribution in AWS (staging + production) with following settings:
     - Origin Domain Name: website-factory.s3-website.eu-central-1.amazonaws.com (DON't put aws bucket suggested in drowdown)
     - Origin Path: /production-{your-site-name} or /staging-{your-site-name} 
     - CName: the domain name you use
     - Redirect http to https
     - Compress Objects Automatically: yes (tickbox - important for SEO)
 b) in tab "Error Pages", set default page for 403 and 404 errors:
      - /index.html for staging (SPA)
      - /404.html for production (nuxt pre-generated page)
      - Customized error code should be 200 for staging, and 404 for production
 c) Route 53: (same config as auto-assurance)
      - create A record (alias) from staging. subdomain to cloudfront staging url 
      - create A record (alias) from root to cloudfront production url 
      - create A record (alias) from www. to cloudfront production url
```

@FeatureRequest: automate this step

2. Create nuxt front-end

```
   yarn launch [your-new-website-name]
```

Update parameters in the 4 newly created config files (script will tell you which ones).

You can find the preview token and production token in contentful > space > settings > api keys. Ex: https://app.contentful.com/spaces/wqmv4fxyptx1/api/keys/619jd8GYuG9Za8ZUCQ4egH

@FeatureRequest: get rid of .env file => put everything in '.contentful.json' file
@FeatureRequest: create bash script to generate '.contentful.json' file

You can change design in the newly created .scss file that has the name of your website.

Finally, add your brand new website to scripts/everything.sh if you want it to be automatically deployed.

## Run and deploy

Checkout and run in dev mode to see if everything goes fine

  ```
    yarn checkout [your-site]
    yarn dev staging
  ```

See Deployment section for deployment to aws

# Contentful helper commands

## A. Content Type migration
How to migrate all the existing Content-Types (synonym of content-model) from an existing space to a newly created space.

  1. Install the Contentful CLI [here](https://www.contentful.com/developers/docs/tutorials/cli/installation/)
  2. Authenticate yourself with the CLI [here](https://www.contentful.com/developers/docs/tutorials/cli/authentication/)
  3. List all the existing spaces by running:
  ```
    contentful space list
  ```
  4. Run the _content-type-migration-script_ attached. The script takes two arguments:
    `EXPORTING_SPACE_ID` (the space with the existing content-models)
    `IMPORTING_SPACE_ID` (the newly created space)
  ```
    yarn import-content-types EXPORTING_SPACE_ID IMPORTING_SPACE_ID
  ```
  5. Verify the content on the newly created space
  6. Enjoy 🎉



## AWS STUFF

aws cloudfront update-distribution --distribution-config file://cloudfront-production-auto-assurance.json --id E26LUQ4ZUNR2SL