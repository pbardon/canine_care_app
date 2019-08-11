class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(session_params[:email],
                                    session_params[:password])
    if @user
      sign_in(@user)
      render json: @user, status: 200
    else
      @user = User.new(session_params)
      flash[:errors] = 'Authentication Failed: Invalid username/password'
      render json: { error: "Authentication Failed: Invalide username and/or password",
                     status: 401
                   },
            status: 401
    end
  end

  def destroy
      user_id = current_user.id
      if sign_out
          render json: { user_id: user_id }, status: 200
          return
      end
      render json: {  error: "Unable to signout, try again.." },
             status: 500
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
