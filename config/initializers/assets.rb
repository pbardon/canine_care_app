Rails.application.config.sass.preferred_syntax = :scss
Rails.application.config.sass.line_comments = false
Rails.application.config.sass.cache = false
Rails.application.config.assets.precompile << /\.(?:svg|eot|woff|ttf)$/
Rails.application.config.assets.precompile += %w( application.css )
Rails.application.config.assets.precompile += %w( application.js )
Rails.application.config.assets.precompile += %w( application.js )
