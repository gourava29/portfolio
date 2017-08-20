# This will guess the User class
FactoryGirl.define do
  factory :project do
    name "MyString"
  end

  factory :user do
    name "John"
    role "Web Developer"
  end

  factory :skill do
    name "ROR"
  end

  factory :hobby do
    name "Basket Ball"
  end

  factory :work do
    name "Company"
  end
end