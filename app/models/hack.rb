class Hack < ApplicationRecord
  has_many :screenshots
  has_many :hackcreators
  has_many :creators, through: :hackcreators

  self.per_page = 21
  validates_uniqueness_of :name
end
