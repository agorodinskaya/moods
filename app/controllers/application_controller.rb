class ApplicationController < ActionController::Base
  # include Knock::Authenticable
  skip_before_action :verify_authenticity_token
  before_action :fetch_user

  def check_if_logged_in
    unless @current_user.present?
      flash[:error] = "You must be logged in to view that page."
      redirect_to login_path
    end
  end


  private

  def fetch_user

    # Retrieve the currently-logged-in user's row from the database
    # (if they *are* actually logged in)
    if session[:user_id].present?
      @current_user = User.find_by id: session[:user_id]
    end

    # Just in case we're dealing with a stale user ID
    # (i.e. an ID which no longer exists in the database)
    # we should delete the bad session
    session[:user_id] = nil unless @current_user.present?

  end
end
