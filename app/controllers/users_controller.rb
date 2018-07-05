class UsersController < ApplicationController
  def create
    puts params, "*" * 50
    user = User.create name: params[:username], k_face_id: params[:face_id]

    if user.persisted?
      session[:user_id] = user.id
      render json: user
    else
      p user.errors
      render json: user.errors
    end
  end

  def destroy
  end

  def show

  end

  def index
  end

  def recognise_user_login
    user = User.find_by k_face_id: params[:face_id]
    if user.present?
      session[:user_id] = user.id
      render json: {user: user}
    else
      render json: {user: nil}
    end
  end

  # def user_emotion
  #   if user.present?
  #     render json: {emotion: emotion}
  #   else
  #     render json: {user: nil}
  # end

  def current_user
    render json: {user: nil} and return unless @current_user
    render json: {user: @current_user}
  end

end
