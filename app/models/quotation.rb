class Quotation < ApplicationRecord
  belongs_to :requirement
  belongs_to :user
end
