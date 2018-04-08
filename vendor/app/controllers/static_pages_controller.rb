class StaticPagesController < ApplicationController
  # before_action :ensure_signed_in!
  def root
      @sitters = Sitter.page(1).per(50)
  end
end
