const express = require('express')
const nunjucks = require('nunjucks')
const routes = require("./routes")

const server = express()


// HABILITANDO REQ.BODY
server.use(express.urlencoded({extended: true}))

// CONFIGURANDO PASTA PUBLIC
server.use(express.static('public'))

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