class UsersController < ApplicationController
  def create
    puts params, "*" * 50

    moods = {
      'happy' => 'spotify:track:67rvuV6oRGppOyXZk9OUrs',
      'sad' => 'spotify:track:1mvghSCONexEGEuSJVbnsT',
    }

    user = User.create name: params[:username], k_face_id: params[:face_id], emotions: moods

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
  #   user = User.find_by k_face_id: params[:face_id]
  #   if user.present?
  #     user = User.update emotions: params[:emotion]
  #     render json: {user: user}
  #   else
  #     render json: {user: nil}
  #   end
  # end

  def current_user
    render json: {user: nil} and return unless @current_user
    render json: {user: @current_user}
  end

end
