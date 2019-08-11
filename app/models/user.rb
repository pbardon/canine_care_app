require 'bcrypt'

class User < ActiveRecord::Base
  attr_reader :password

  validates :name, :email, :password_digest, :session_token, presence: true
  validates :email, uniqueness: true
  validates :password, length: {minimum: 4, allow_nil: true}

  has_many :dogs

  has_one :sitter_account, class_name: :Sitter, foreign_key: :user_id

  has_many :comments

  before_validation :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    unless user
      message = "Username/Password invalid"
      Rails.logger.info(message)
      raise message
    end
    unless user.is_password?(password)
      message = "Password invalid"
      Rails.logger.info(message)
      raise message
    end
    return user
  end

  def is_password?(password)
    b_crypto = BCrypt::Password.new(self.password_digest)
    b_crypto.is_password?(password)
  end

  def password=(password)
    return unless password
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  private

  def self.generate_session_token
     SecureRandom.urlsafe_base64
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

end
