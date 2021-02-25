const express = require('express')

// HABILITANDO CONSTANTE PARA CRIAR ROTAS
const routes = express.Router()

// IMPORTANDO FUNCAO PARA O POST
const teachers = require("./src/app/controllers/teachers")
const students = require("./src/app/controllers/students")

routes.get('/', function(req, res) {
    return res.redirect("/teachers")
})

// ========== TEACHERS ===========

routes.get('/teachers', teachers.index)

routes.get('/teachers/create', function(req, res) {
    return res.render("teachers/create")
})
// POST/create
routes.post('/teachers', teachers.post)

//SHOW
routes.get('/teachers/:id', teachers.show)

//EDIT
routes.get('/teachers/:id/edit', teachers.edit)

//PUT/atualizar
routes.put('/teachers', teachers.put )

//DELETE/deletar
routes.delete('/teachers', teachers.delete )



// ========== STUDENTS ===========

routes.get('/students', students.index)

routes.get('/students/create', function(req, res) {
    return res.render("students/create")
})
// POST/create
routes.post('/students', students.post)

//SHOW
routes.get('/students/:id', students.show)

//EDIT
routes.get('/students/:id/edit', students.edit)

//PUT/atualizar
routes.put('/students', students.put )

//DELETE/deletar
routes.delete('/students', students.delete )


module.exports = routes