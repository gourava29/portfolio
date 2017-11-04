# This will guess the User class
FactoryGirl.define do
  factory :techcollabarator do
    description "MyString"
    technology nil
    project nil
  end

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
    profile_desc "Profile Description"
    email "test@test.com"
  end

  factory :skill do
    name "UI"
  end

  factory :hobby do
    name "Basket Ball"
  end

  factory :work do
    name "Company"
    description "Description"
    start_date 1393977600
    end_date 1499385600
  end
end