class User < ActiveRecord::Base
  ACTIVE = 0
  INACTIVE = 1

  AVAILABLE = 0;
  BOOKED = 1;

  scope :active, -> { where(login_status: ACTIVE).order(:name) }
  scope :available, -> { where(lotery_status: AVAILABLE) }

  def self.find_for_draw(current_user)
    self.available.where.not(id: current_user.id).shuffle
  end

  def self.find_by_draw_id(draw_id)
    self.find_by(id: Base64.decode64(draw_id), lotery_status: User::AVAILABLE)
  end

  def draw_id
    Base64.encode64(id.to_s)
  end
end
