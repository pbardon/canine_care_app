# About
Canine Care is a Ruby on Rails application used to find and book dog sitters in your area. It features a sitter search index as well as the ability to create an account and book a sitter.

# Getting Started
In order to run the application in development mode you will need the following prerequisites:

## Postgres

## Ruby

## Docker

# Running the Development Server
In order to run the development server locally, run the following command:

```
bundle exec rails s
```

# Running Tests
IN order to run the tests, first set the following environment variables:

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
docker-compose up > /tmp/ccapp-docker.log 2>&1
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
