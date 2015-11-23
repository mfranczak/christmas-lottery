class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  protected
  def current_user
    @user ||= User.find_by(id: session[:user_id], login_status: User::ACTIVE) if session[:user_id]
  end
end
