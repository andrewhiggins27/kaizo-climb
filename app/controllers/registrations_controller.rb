class RegistrationsController < ApplicationController
  def create
    user = User.new(
      email: params["user"]["email"],
      username: params["user"]["username"],
      password: params["user"]["password"],
      password_confirmation: params["user"]["password_confirmation"]
    )

    if user.valid?
      user.save
      session[:user_id] = user.id
      render json: {
        status: :created,
        user: user
      }
    else
      render json: { registrationErrors: user.errors.full_messages.to_sentence }
    end
  end
end