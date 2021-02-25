//Puxando funções do utils.js
const { age, graduation, date } = require("../../lib/utils")
const Student = require("../models/Student")

module.exports = {
    index(req, res) {
        Student.all(function (students) {
            return res.render("students/index",{students})
        })
        
    },
    
    post(req, res) {
        const keys = Object.keys(req.body)
        // VALIDAÇÃO FORMULARIO
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Preencha todos os campos.')
            }
        }
    
        Student.create(req.body, function () {
            return res.redirect('/students')
        })
    },
    
    show(req, res) {
        Student.find(req.params.id, function (student) {
            if(!student) return res.send("Aluno não encontrado!")

            student.age = date(student.birth).format
            student.birthDay = date(student.birth).birthDay

            return res.render("students/show", {student})
        })
            
    },
    
    edit(req, res) {
        Student.find(req.params.id, function (student) {
            if(!student) return res.send("Aluno não encontrado!")

            student.birth=date(student.birth).iso

            return res.render("students/edit", {student})
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
        Student.update(req.body, function () {
            return res.redirect(`/students/${req.body.id}`)
        })
        
    },
    
    delete(req, res) {
        Student.delete(req.body.id, function () {
            console.log(req.params.id)
            return res.redirect(`/students`)
        })
        
    }
}





// const fs = require("fs")

// // PUXANDO ARQUIVO DATA JSON
// const data = require("../data.json")

// //Puxando funções do utils.js
// const { age, graduation, date } = require("../utils")


// exports.index = function(req, res) {
//     return res.render("students/index", {students : data.students})
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
//     let {name , birth, grade, email, workload, avatar_url} = req.body


//     // ARRUMANDO PARAMETRO DATA
//     birth = Date.parse(birth)

//     // CRIANDO PARAMETRO ID A PARTIR DO ULTIMO ID NO DATA // SE NÃO HOUVER NENHUM, POR PADRAO SERA 1
//     const lastStudent = data.students[data.students.length-1]
//     let id = 1
//     if (lastStudent) {
//         id = Number(lastStudent.id+1)
//     }
 
//     // INCLUINDO NOVO OBJETO NO ARRAY 
//     data.students.push({
//         id,
//         name, 
//         birth, 
//         grade, 
//         email, 
//         workload, 
//         avatar_url 
//     })

//     // ENVIANDO(SOBRESCREVENDO) DADOS NO DATA.JSON          STRINGFY -> formatação do JSON
//     fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
//         if (err) {
//             return res.send("Write file error!")
//         }
//         return res.redirect('/students')
//     })
// }

// exports.show = function (req, res) {
//     const id = req.params.id

//     const foundStudent = data.students.find(student => {
//         return student.id == id
//     })

//     if (!foundStudent) return res.send("Professor não encontrado!")

//     const student = {
//         ...foundStudent,
//         age: age(foundStudent.birth),
//         birthDay: date(foundStudent.birth).birthDay
         
//     }

//     return res.render("students/show", {student : student})
// }

// exports.edit = function (req, res) {
//     const id = req.params.id

//     const foundStudent = data.students.find(student => {
//         return student.id == id
//     })

//     if (!foundStudent) return res.send("Professor não encontrado!")

//     const student = {
//         ...foundStudent,
//         birth: date(foundStudent.birth).iso
//     }

//     return res.render("students/edit", { student })
// }

// exports.put = function (req, res) {
//     const { id } = req.body
//     // localizar Student pelo ID
//     const foundStudent = data.students.find(student => {
//         return student.id == id
//     } )

   

//     // caso não localize instrutor
//     if (!foundStudent) return res.send('Instrutor não encontrado!')

//     const student = {
//         ...foundStudent,
//         ...req.body,
//         birth: Date.parse(req.body.birth)
//     }
    
//     const currentIndex = data.students.indexOf(foundStudent)
//     data.students[currentIndex] = student

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
//         if (err) {
//             return res.send("Write file error!")
//         }
//         return res.redirect(`/students/${id}`)
//     })
// }

// exports.delete = function (req, res) {
//     const { id } = req.body
//     // localizar Student pelo ID
//     const foundStudent = data.students.find(student => {
//         return student.id == id
//     } )
//     // caso não localize instrutor
//     if (!foundStudent) return res.send('Instrutor não encontrado!')

//     //Filtrando a base de dados e reescrevendo ela sem o objeto "deletado"
//     data.students = data.students.filter(student => id != student.id)

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
//         if (err) {
//             return res.send("Write file error!")
//         }
//         return res.redirect(`/students`)
//     })
// }
