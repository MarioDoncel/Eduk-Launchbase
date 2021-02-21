module.exports = {
    age: function (timestamp) {
            //transformando em data para JS
            const today = new Date()
            const birthDate = new Date(timestamp)
        
            let age = today.getFullYear()-birthDate.getFullYear()
            const month = today.getMonth()-birthDate.getMonth()
        
            if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
                age = age - 1
            }
            return age
    },
    graduation: function (graduation) {
        switch (graduation) {
            case "Ensino Médio Completo":
                return "Medio";
            case "Ensino Superior Completo":
                return "Superior"
            case "Mestrado":
                return "Mestrado"
            case "Doutorado":
                return "Doutorado"
        }
    },

    date: function (timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth()+1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            birthDay: `${day}/${month}`,
            iso:`${year}-${month}-${day}`
        }
        
    }
}

