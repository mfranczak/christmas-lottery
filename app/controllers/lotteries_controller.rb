class LotteriesController < ApplicationController

  before_action :check_user

  def index
    @draws = User.find_for_draw(current_user)
  end

  def choose
    decoded_user = decode_user
    return redirect_to lottery_path if decoded_user.nil?

    decoded_user.lotery_status = User::BOOKED
    decoded_user.save!

    flash[:lottery_result] = decoded_user.name
    redirect_to thanks_path
  end

  def thanks
    current_user.login_status = User::INACTIVE
    current_user.save!
  end

  private
  def check_user
    redirect_to session_index_path unless current_user
  end

  def decode_user
    User.find_by_draw_id params[:draw_id]
  end
end
