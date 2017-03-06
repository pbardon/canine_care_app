module Api
  class CommentsController  < ApplicationController
    wrap_parameters :comment, include: [:commentable_id, :commentable_type, :content, :rating]

    def index
      @comments = Comment.all
      render json: @comments
    end

    def show
      @comment = Comment.find(params[:id])
      @user = User.find(@comment.user_id)
      if @comment
        render json: @comment
      else
        render json: "record not found"
      end
    end

    def create
      @comment = Comment.new(comment_params)

      @comment.user_id = current_user.id
      time = Time.now
      @comment.comment_date = "#{time.day}/#{time.month}/#{time.year}"
      if @comment.save
        render json: @comment
      else
        render json: @comment.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @comment = Comment.find(params[:id])
      if @comment && @comment.user_id == current_user.id
        @comment.destroy
        render json: @comment
      else
        render json: "Can't delete comment"
      end
    end

    private

    def comment_params
      params.require(:comment).permit(:commentable_id, :commentable_type, :content, :rating)
    end
  end
end
