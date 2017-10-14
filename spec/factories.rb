# This will guess the User class
FactoryGirl.define do
  factory :technology do
    name "ROR"
    efficiency 1
  end
  
  factory :connection do
    name "MyString"
    link "MyString"
  end

  factory :project do
    name "MyString"
  end

  factory :user do
    name "John"
    role "Web Developer"
  end

  factory :skill do
    name "UI"
  end

  factory :hobby do
    name "Basket Ball"
  end

  factory :work do
    name "Company"
  end
end