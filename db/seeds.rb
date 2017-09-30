# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(name: 'Gourav Agarwal', role: 'Web Developer')

#skills
html = user.skills.create(name: "HTML", efficiency: 8)
css = user.skills.create(name: "CSS", efficiency: 7)
javascript = user.skills.create(name: "JAVASCRIPT", efficiency: 7)
angular = user.skills.create(name: "Angular", efficiency: 8)
java = user.skills.create(name: "Java", efficiency: 5)
mySql = user.skills.create(name: "MySQL", efficiency: 5)
node = user.skills.create(name: "NodeJS", efficiency: 8)
mongo = user.skills.create(name: "MongoDB", efficiency: 6)
neo4J = user.skills.create(name: "Neo4J Graph DB", efficiency: 4)
ror = user.skills.create(name: "ROR", efficiency: 6)

spellbound = user.works.create(name: 'Spellbound Information Solutions Pvt. Ltd.')
doesAnyone = spellbound.projects.create(name: 'DoesAnyone')
doesAnyone.skills.concat([angular, java, mySql, html, css, javascript])
doesAnyone.save()

enabli = spellbound.projects.create(name: 'Enabli')
enabli.skills.concat([angular, node, mongo, neo4J, html, css, javascript])
enabli.save()

user.works.create(name: 'Cognizant Technology Solutions Pvt. Ltd.')
user.works.create(name: 'Standard Chartered')

user.connections.create(name: 'Quora', link: 'https://www.quora.com/profile/Gourav-Agarwal-6')
user.connections.create(name: 'LinkedIn', link: 'https://www.linkedin.com/in/gourava29/')