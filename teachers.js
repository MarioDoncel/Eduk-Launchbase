const fs = require("fs")

// PUXANDO ARQUIVO DATA JSON
const data = require("./data.json")


exports.post = function(req, res) {
    const keys = Object.keys(req.body)


    // VALIDAÇÃO FORMULARIO
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Preencha todos os campos.')
        }
    }

    //DESTRUCTURING O REQ.BODY PARA TRABALHAR COMO VARIAVEIS
    let {name , birth, graduation, classType, subjects, avatar_url} = req.body


    // ARRUMANDO PARAMETRO DATA
    birth = Date.parse(birth)

    // CRIANDO NOVO PARAMETRO NO REQ.BODY
    created_at = Date.now()

    // CRIANDO PARAMETRO ID A PARTIR DO TAMANHO DO ARRAY TEACHERS
    id = Number(data.teachers.length +1)
 
    // INCLUINDO NOVO OBJETO NO ARRAY TEACHERS 
    data.teachers.push({
        id,
        name, 
        birth, 
        graduation, 
        classType, 
        subjects, 
        avatar_url, 
        created_at
    })


    

    // ENVIANDO(SOBRESCREVENDO) DADOS NO DATA.JSON          STRINGFY -> formatação do JSON
    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if (err) {
            return res.send("Write file error!")
        }
        return res.redirect('/teachers')
    }
    )

    // return res.send(req.body)
}

