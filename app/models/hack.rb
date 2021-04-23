class Hack < ApplicationRecord
  include PgSearch

  pg_search_scope :search_by_term, against: [:name],
    using: {
      tsearch: {
        any_word: true,
        prefix: true
      }
    }

  has_many :screenshots
  has_many :hackcreators
  has_many :creators, through: :hackcreators
  belongs_to :list

  self.per_page = 21
  validates_uniqueness_of :name
end
