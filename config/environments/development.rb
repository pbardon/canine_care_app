Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports and disable caching.
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  config.serve_static_assets = true
  config.serve_static_files = true


  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true

  # Adds additional error checking when serving assets at runtime.
  # Checks for improperly declared sprockets dependencies.
  # Raises helpful error messages.
  config.assets.raise_runtime_errors = true

  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true

  config.paperclip_defaults = {
  :storage => :s3,
  :s3_protocol => 'https',
  :url =>':s3_domain_url',
  :s3_region => ENV['AWS_REGION'],
  :path => '/:class/:attachment/:id_partition/:style/:filename',
  :s3_credentials => {
    :bucket => ENV['AWS_BUCKET_DEVELOPMENT'],
    :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
    :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
    }
  }

  config.google_cloud.use_trace = false
  config.google_cloud.use_logging = false
  config.google_cloud.use_error_reporting = false
  config.google_cloud.use_debugger = false

  config.active_storage.service = :local

  Rails.application.routes.default_url_options[:host] = "localhost:3000"
end
