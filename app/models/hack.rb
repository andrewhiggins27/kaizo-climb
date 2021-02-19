class Hack < ApplicationRecord
  has_many :screenshots
  has_many :hackcreators
  has_many :creators, through: :hackcreators

  validates_uniqueness_of :name
end
