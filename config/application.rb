require File.expand_path('../boot', __FILE__)

require 'rails/all'
require "active_storage/engine"


# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module DogSittingApp
  class Application < Rails::Application
  end
end
