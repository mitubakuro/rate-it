class Item < ApplicationRecord
  has_many :reviews

  before_create :slugfy
  def slugfy
    self.slug = name
  end

  def avg_score
    return 0 unless reviews.count.positive?
    reviews.average(:score).round(2).to_f
  end
  
end
