Rails.application.config.middleware.insert_before 0, Rack::Cors do 
  allow do
    origins "http://localhost:3000"
    resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
  end

  # uncomment following allow method to allow access to non local hosts (heroku, etc)
  # allow do
  #   origins "" 
  #   resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
  # end
end