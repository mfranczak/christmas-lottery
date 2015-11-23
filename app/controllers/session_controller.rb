class SessionController < ApplicationController
  def index
    @users = User.active
  end

  def logout
    session[:user_id] = nil
    redirect_to session_index_path
  end

  def login
    session[:user_id] = params[:id]
    redirect_to lottery_path
  end
end
