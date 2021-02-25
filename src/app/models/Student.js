const { age, graduation, date } = require("../../lib/utils")
const db = require('../../config/db')

module.exports = {
    all(callback){
        db.query(`
        SELECT * FROM students ORDER BY name ASC
        `, function (err, results) {
            if(err) throw `DATABASE Error!${err}`
            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO students (
            name,
            birth,
            grade,
            email,
            workload,
            avatar_url,
            created_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING id
        `
        const values=[
            data.name,
            date(data.birth).iso,
            data.grade,
            data.email,
            data.workload,
            data.avatar_url,
            date(Date.now()).iso
        ]
        db.query(query, values, function (err) {
            if(err) throw `DATABASE Error!${err}`

            callback()
        })
    },
    find(id, callback) {
        db.query(`SELECT * FROM students WHERE id = $1`,
        [id],
        function (err, results) {
            if(err) throw `DATABASE Error!${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback){
        const query = `UPDATE students SET
            avatar_url=($1),
            name=($2),
            birth=($3),
            grade=($4),
            email=($5),
            workload=($6)
        WHERE id = $7
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.grade,
            data.email,
            data.workload,
            data.id
        ]
        db.query(query, values, function (err) {
            if(err) throw `DATABASE Error!${err}`
            callback()
        })
    },
    delete(id, callback){
        db.query(`
        DELETE FROM students WHERE id = $1
        `,
        [id],
        function (err) {
            if(err) throw `DATABASE Error!${err}`
            callback()
        })
    }
}