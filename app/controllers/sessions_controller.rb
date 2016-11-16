class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(session_params[:email],
                                    session_params[:password])

    if @user
      sign_in(@user)
      redirect_to root_url
    else
      @user = User.new(session_params)
      flash[:errors] = 'Invalid username/password'
      render :new
    end
  end

  def destroy
    sign_out
    redirect_to root_url
  end

  def guest
    guest_user = User.find(1)
    sign_in(guest_user)
    redirect_to root_url
  end

  private

  def session_params
    params.require(:user).permit(:email, :password)
  end

end
