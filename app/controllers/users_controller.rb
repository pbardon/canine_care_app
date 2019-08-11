class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      render json: @user, status: 200
    else
      render json: { error: "Registration failed: #{@user.errors.full_messages.join(', ')}",
                     status: 400
                   },
            status: 400
    end
  end

  def update
    @user = User.find_by_session_token(current_user.session_token)
    if @user.update_attributes(user_params)
      @user.save!
      return
    end
    flash[:errors] =  @user.errors.full_messages
  end

  def show
      @user = User.find(params[:id])
      if @user
          render formats: [:json]
          return
      end
      flash[:errors] = @user.errors.full_messages
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :street_address, :city, :state, :zipcode)
  end
end
