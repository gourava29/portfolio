# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(name: 'Gourav Agarwal', role: 'Web Developer')

#skills
html = user.skills.create(name: "HTML")
css = user.skills.create(name: "CSS")
angular = user.skills.create(name: "Angular")
java = user.skills.create(name: "Java")
servlet = user.skills.create(name: "Servlets")
mySql = user.skills.create(name: "MySQL")
node = user.skills.create(name: "NodeJS")
mongo = user.skills.create(name: "MongoDB")
neo4J = user.skills.create(name: "Neo4J Graph DB")
ror = user.skills.create(name: "ROR")

spellbound = user.works.create(name: 'Spellbound Information Solutions Pvt. Ltd.')
doesAnyone = spellbound.projects.create(name: 'DoesAnyone')
doesAnyone.skills.concat([angular, java, servlet, mySql, html, css])
doesAnyone.save()

enabli = spellbound.projects.create(name: 'Enabli')
enabli.skills.concat([angular, node, mongo, neo4J, html, css])
enabli.save()

user.works.create(name: 'Cognizant Technology Solutions Pvt. Ltd.')
user.works.create(name: 'Standard Chartered')
