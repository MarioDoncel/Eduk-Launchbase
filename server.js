const express = require('express')
const nunjucks = require('nunjucks')
const routes = require("./routes")
const methodOverride = require("method-override")

const server = express()


// HABILITANDO REQ.BODY
server.use(express.urlencoded({extended: true}))

// CONFIGURANDO PASTA PUBLIC
server.use(express.static('public'))

//CORRIGINDO METHOD PARA PUT POIS O HTML ACEITARIA APENAS GET E POST
server.use(methodOverride('_method'))

// INSERINDO ROTAS
server.use(routes)


// TEMPLATE ENGINE
server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(5000, function() {

})