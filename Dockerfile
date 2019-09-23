FROM ruby:2.6

RUN mkdir /app
WORKDIR /app
RUN mkdir seedphotos

ADD Gemfile Gemfile.lock /app/
RUN bundle install -j 8
RUN bundle exec rspec

ADD . /app
RUN ruby /app/bin/rake assets:precompile
CMD ruby /app/bin/rails s -b '0.0.0.0'
