const express = require('express')

// HABILITANDO CONSTANTE PARA CRIAR ROTAS
const routes = express.Router()

// IMPORTANDO FUNCAO PARA O POST
const teachers = require("./teachers")

routes.get('/', function(req, res) {
    return res.redirect("/teachers")
})

// ========== TEACHERS ===========

routes.get('/teachers', function(req, res) {
    return res.render("teachers/index")
})

routes.get('/teachers/create', function(req, res) {
    return res.render("teachers/create")
})

// POST
routes.post('/teachers', teachers.post)

// ========== STUDENTS ===========

routes.get('/students', function(req, res) {
    return res.render("students/index")
})


module.exports = routes