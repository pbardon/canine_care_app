FROM ruby:2.6.5

RUN mkdir /app
WORKDIR /app
RUN mkdir seedphotos
RUN mkdir /app/tmp
RUN mkdir /app/tmp/images

ADD Gemfile /app/
RUN bundle install -j 8

ADD . /app

ENV SEED_PHOTO_PATH=/app/test/fixtures/seedphotos
RUN ruby /app/bin/rake db:migrate RAILS_ENV=test
RUN ruby /app/bin/bundle exec rspec
RUN ruby /app/bin/rake assets:precompile
CMD ruby /app/bin/rails s -b '0.0.0.0'
