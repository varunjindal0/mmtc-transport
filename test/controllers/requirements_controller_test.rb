require 'test_helper'

class RequirementsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get requirements_index_url
    assert_response :success
  end

end
