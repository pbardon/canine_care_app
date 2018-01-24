class ApplicationController < ActionController::Base
    # Prevent CSRF attacks by raising an exception.
    # For APIs, you may want to use :null_session instead.
    protect_from_forgery with: :exception

    helper_method :signed_in?, :current_user

    def current_user
        return nil unless session[:session_token]
        @current_user ||= User.find_by_session_token(session[:session_token])
    end

    def signed_in?
        !!current_user
    end

    def sign_in(user)
        user ||= User.find_by_credentials(user.email, user.password)
        session[:session_token] = user.reset_session_token!
        @current_user = user
    end

    def sign_out
        current_user.reset_session_token!
        session[:session_token] = nil
    end

    def ensure_signed_in!
        redirect_to "/" unless signed_in?
    end
end
