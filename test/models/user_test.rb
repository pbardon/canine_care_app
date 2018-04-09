require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "should_create_a_password" do
    user = User.new({
      name: "Jim Lahey",
      email: "jim@sunnyvale.com",
      session_token: "AAAAAAAAAAAAAAAAA"
    })
    assert_nil(user.password_digest)
    user.password="test_password"
    assert_not_nil(user.password_digest)
  end
end
