# About
Canine Care is a Ruby on Rails application used to find and book dog sitters in your area. It features a sitter search index as well as the ability to create an account and book a sitter.

# Getting Started
In order to run the application in development mode you will need the following prerequisites:

## Postgres

Postgres version 11.5 is required to run the development server, you will need to install Postgres as well as create a role for the app to use with the database.

### Creating the Postgres role
Once Postgres is installed and running, login to the postgres user:

```
sudo su postgres
```

And start the Postgres CLI

```
psql
```

Then, issue the following commands

```
CREATE ROLE <<RAILS PG USERNAME>> with PASSWORD '<<RAILS PG PASSWORD>>' ;
ALTER ROLE <<RAILS PG USERNAME>> WITH LOGIN;
ALTER ROLE <<RAILS PG USERNAME>> CREATEDB;
```

Where "<<RAILS PG USERNAME>>" and "<<RAILS PG PASSWORD>>" matches the values provided in the config/application.yml file.

Once you have set these values, you should be able to exit from the CLI and postgres account and the application will be able to connect to the database.


## Ruby
This application has been developed and tested with Ruby 2.6.5. We recommend installing and using RVM to manage your ruby installations.

## Docker
Docker is used to build the container image so that the latest version of the code can be published. Although not strictly required for development, it is useful to have it to debug issues in pipeline or production builds.

### Docker Compose

Docker Compose is used to run the set of containers that we run in production. It is not strictly necessary for development, but can help debug issues when starting the containers in production.

# Running the Development Server
In order to run the development server locally, run the following command:

```
bundle exec rails s
```

## Secrets
Put the following secrets in the 'config/application.yml' file:

```
AWS_BUCKET_DEVELOPMENT: "<<S3 Bucket Name for Development>>"

AWS_BUCKET_PRODUCTION: "<<S3 Bucket Name for Production>>"

AWS_BUCKET_TEST: "<<S3 Bucket Name for Test>>"

AWS_ACCESS_KEY_ID: "<<AWS API Key ID, role must have permissions to the S3 buckets>>"

AWS_SECRET_ACCESS_KEY: "<<AWS API Key Access Key, role must have permissions to the S3 buckets>>"

MAPS_API_KEY: "<<Google Maps API Key, must have permissions to the Google Maps service>>"

AWS_REGION: "<<AWS region where you want to store the content>>"

PG_USERNAME: "<<Postgres username for the app to use>>"

PG_DEV_PASSWORD: "<<Postgres password for the app to use>>"

SECRET_KEY_BASE: "<<Secret key base used to generate unique cookies>>"
```

# Running the Development Container
The development server can also be run a container locally.

But, you will need to create the appropriate user role in the database container. The script template should be copied into the following file:


```
cp ./init_conf.sh.template ./init_conf.sh
```

Once the file is copied, replace the password with the Postgres password you want to use, surrounded by the "'" character.



# Running Tests
In order to run the tests, first set the following environment variables:

```
export SEED_PHOTO_PATH=`pwd`/test/fixtures/seedphotos
```

Then run the following command:

```
bundle exec rspec
```

# Deployment

This application is deployed to a Digital Ocean droplet where it runs several containers on the host to improve the ability to respond to multiple concurrent requests. The deployment process has two  steps; publication of the container image followed by the deployment of that container image.

## Publication of the Container Image 
The container image is published to the Docker Hub container registry by first building the image locally with the following command:

```
docker build -t pbardon/canine_care_app .
```

Once the image has been built and tagged properly you can publish the latest version to the registry:

First, login to Docker Hub:

```
docker login
```

```
docker push pbardon/canine_care_app
```

Please note, you will need to get permissions to this private repository before you will be allowed to publish a version of the container.

## Deploy the Container Image
In order to deploy the latest container image, you will first need to SSH into the webhost:

```
ssh webhost@caninecare.co
```

You will need to request permission to the webhost account before you can complete this step. Once you have logged in, you can login to docker and pull the latest version of the image:

```
docker login
docker pull pbardon/canine_care_app:latest
```

Next, start the docker containers with the new image and ensure that they start properly and are working as expected:

```
cd ~/canine_care_app
docker-compose down
docker-compose up > /tmp/ccapp-docker.log 2>&1 &
```

Once you are happy with the deployment, you can shut down the containers and restart the web service that is running the containers:

```
cd ~/canine_care_app
docker-compose down
sudo service docker-compose-app restart
```

Your new code should now be deployed to the production servers and available on the internet at the following address:

```
https://caninecare.co
```
