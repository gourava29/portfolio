# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(name: 'Gourav Agarwal', role: 'Web Developer')

#skills
ui = user.skills.create(name: 'UI')
backend = user.skills.create(name: 'Backend')
db = user.skills.create(name: 'DB')
devop = user.skills.create(name: 'DevOp')

#technologies
html = ui.technologies.create(name: "HTML", efficiency: 8)
css = ui.technologies.create(name: "CSS", efficiency: 7)
javascript = ui.technologies.create(name: "JAVASCRIPT", efficiency: 7)
angular = ui.technologies.create(name: "Angular", efficiency: 8)
react = ui.technologies.create(name: "React", efficiency: 8)
java = backend.technologies.create(name: "Java", efficiency: 5)
mySql = db.technologies.create(name: "MySQL", efficiency: 5)
node = backend.technologies.create(name: "NodeJS", efficiency: 8)
mongo = db.technologies.create(name: "MongoDB", efficiency: 6)
neo4J = db.technologies.create(name: "Neo4J Graph DB", efficiency: 4)
ror = backend.technologies.create(name: "ROR", efficiency: 6)
cCi = devop.technologies.create(name: "CircleCI", efficiency: 4)
jenk = devop.technologies.create(name: "Jenkins", efficiency: 3)

spellbound = user.works.create(name: 'Spellbound Information Solutions Pvt. Ltd.')
doesAnyone = spellbound.projects.create(name: 'DoesAnyone')
doesAnyone.technologies.concat([angular, java, mySql, html, css, javascript])
doesAnyone.save()

enabli = spellbound.projects.create(name: 'Enabli')
enabli.technologies.concat([angular, node, mongo, neo4J, html, css, javascript])
enabli.save()

user.works.create(name: 'Cognizant Technology Solutions Pvt. Ltd.')
user.works.create(name: 'Standard Chartered')

user.connections.create(name: 'Quora', link: 'https://www.quora.com/profile/Gourav-Agarwal-6')
user.connections.create(name: 'LinkedIn', link: 'https://www.linkedin.com/in/gourava29/')