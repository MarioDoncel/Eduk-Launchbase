//Puxando funções do utils.js
const { age, graduation, date } = require("../../lib/utils")
const Teacher = require("../models/Teacher")

module.exports = {
    index(req, res) {
        const {filter} = req.query

        if (filter) {
            Teacher.findBy(filter, function (teachers) {
                return res.render("teachers/index", {teachers, filter})
            })
        } else {
            Teacher.all(function (teachers) {
                return res.render("teachers/index", {teachers})
            })
        }

        

        
    },
    
    post(req, res) {
        const keys = Object.keys(req.body)
        // VALIDAÇÃO FORMULARIO
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Preencha todos os campos.')
            }
        }
    
        Teacher.create(req.body, function () {
            return res.redirect('/teachers')
        })
    },
    
    show(req, res) {
        Teacher.find(req.params.id, function (teacher) {
            if(!teacher) return res.send('Professor não encontrado!')
            teacher.subjects_taught = teacher.subjects_taught.split(',')
            teacher.created_at=date(teacher.created_at).format
            teacher.age=date(teacher.birth_date).format
            teacher.education_level=graduation(teacher.education_level)

            return res.render("teachers/show", {teacher})
        })
            
    },
    
    edit(req, res) {
        Teacher.find(req.params.id, function (teacher) {
            if(!teacher) return res.send('Professor não encontrado!')

            teacher.birth_date = date(teacher.birth_date).iso

            return res.render("teachers/edit", {teacher})
        })
    },
    
    put(req, res) {
        const keys = Object.keys(req.body)
        // VALIDAÇÃO FORMULARIO
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Preencha todos os campos.')
            }
        }
        Teacher.update(req.body, function () {
            return res.redirect(`/teachers/${req.body.id}`)
        })
        
    },
    
    delete(req, res) {
        Teacher.delete(req.body.id, function () {
            return res.redirect(`/teachers`)
        })
        
    }
}



// const fs = require("fs")

// // PUXANDO ARQUIVO DATA JSON
// const data = require("../../../data.json")

// //Puxando funções do utils.js
// const { age, graduation, date } = require("../../lib/utils")


// exports.index = function(req, res) {
//     return res.render("teachers/index", {teachers : data.teachers})
// }

// exports.post = function(req, res) {
//     const keys = Object.keys(req.body)


//     // VALIDAÇÃO FORMULARIO
//     for (key of keys) {
//         if (req.body[key] == "") {
//             return res.send('Preencha todos os campos.')
//         }
//     }

//     //DESTRUCTURING O REQ.BODY PARA TRABALHAR COMO VARIAVEIS
//     let {name , birth, graduation, classType, subjects, avatar_url} = req.body


//     // ARRUMANDO PARAMETRO DATA
//     birth = Date.parse(birth)

//     // CRIANDO NOVO PARAMETRO NO REQ.BODY
//     created_at = Date.now()

//     // CRIANDO PARAMETRO ID A PARTIR DO TAMANHO DO ARRAY TEACHERS
//     const lastTeacher = data.teachers[data.teachers.length-1]
//     let id = 1
//     if (lastTeacher) {
//         id = Number(lastTeacher.id+1)
//     }
 
//     // INCLUINDO NOVO OBJETO NO ARRAY TEACHERS 
//     data.teachers.push({
//         id,
//         name, 
//         birth, 
//         graduation, 
//         classType, 
//         subjects, 
//         avatar_url, 
//         created_at
//     })


    

//     // ENVIANDO(SOBRESCREVENDO) DADOS NO DATA.JSON          STRINGFY -> formatação do JSON
//     fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
//         if (err) {
//             return res.send("Write file error!")
//         }
//         return res.redirect('/teachers')
//     }
//     )

//     // return res.send(req.body)
// }

// exports.show = function (req, res) {
//     const id = req.params.id

//     const foundTeacher = data.teachers.find(teacher => {
//         return teacher.id == id
//     })

//     if (!foundTeacher) return res.send("Professor não encontrado!")

//     const teacher = {
//         ...foundTeacher,
//         age: age(foundTeacher.birth),
//         graduation: graduation(foundTeacher.graduation),
//         subjects: foundTeacher.subjects.split(","), 
//         created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at), 
//     }

//     return res.render("teachers/show", {teacher : teacher})
// }

// exports.edit = function (req, res) {
//     const id = req.params.id

//     const foundTeacher = data.teachers.find(teacher => {
//         return teacher.id == id
//     })

//     if (!foundTeacher) return res.send("Professor não encontrado!")

//     const teacher = {
//         ...foundTeacher,
//         birth: date(foundTeacher.birth).iso
//     }

//     return res.render("teachers/edit", { teacher })
// }

// exports.put = function (req, res) {
//     const { id } = req.body
//     // localizar Teacher pelo ID
//     const foundTeacher = data.teachers.find(teacher => {
//         return teacher.id == id
//     } )

   

//     // caso não localize instrutor
//     if (!foundTeacher) return res.send('Instrutor não encontrado!')

//     const teacher = {
//         ...foundTeacher,
//         ...req.body,
//         birth: Date.parse(req.body.birth)
//     }
    
//     const currentIndex = data.teachers.indexOf(foundStudent)
//     data.teachers[currentIndex] = teacher

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
//         if (err) {
//             return res.send("Write file error!")
//         }
//         return res.redirect(`/teachers/${id}`)
//     })
// }

// exports.delete = function (req, res) {
//     const { id } = req.body
//     // localizar Teacher pelo ID
//     const foundTeacher = data.teachers.find(teacher => {
//         return teacher.id == id
//     } )
//     // caso não localize instrutor
//     if (!foundTeacher) return res.send('Instrutor não encontrado!')

//     //Filtrando a base de dados e reescrevendo ela sem o objeto "deletado"
//     data.teachers = data.teachers.filter(teacher => id != teacher.id)

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
//         if (err) {
//             return res.send("Write file error!")
//         }
//         return res.redirect(`/teachers`)
//     })
// }
