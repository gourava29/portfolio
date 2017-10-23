# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

json = ActiveSupport::JSON.decode(File.read('db/seed_data.json')).deep_symbolize_keys
user = User.create(json[:data])
user.connections.create(json[:connections])

json[:skills].each do |skill|
    skill_model = user.skills.create(skill[:data])
    skill_model.technologies.create(skill[:technologies])
end

json[:works].each do |work|
    work_model = user.works.create(work[:data])
    work[:projects].each do |project|
        project_model = work_model.projects.create(project[:data])
        
        project[:technologies].each do |technology_used|
            tech_used_model = Technology.find_by(:name => technology_used[:name])
            p technology_used[:description]
            Techcollabarator.create(description: technology_used[:description], technology_id: tech_used_model.id, project_id: project_model.id)
        end
    end
end