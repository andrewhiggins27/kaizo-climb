if Rails.env == 'production'
  Rails.application.config.session_store :cookie_store, key: "_smw_kaizo", domain: "smw-kaizo.herokuapp.com"
else
  Rails.application.config.session_store :cookie_store, key: "_smw_kaizo"
end