const express = require('express')

// HABILITANDO CONSTANTE PARA CRIAR ROTAS
const routes = express.Router()

// IMPORTANDO FUNCAO PARA O POST
const teachers = require("./teachers")

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

routes.get('/students', function(req, res) {
    return res.render("students/index")
})


module.exports = routes