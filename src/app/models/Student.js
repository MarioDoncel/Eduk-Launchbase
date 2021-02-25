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
            created_at,
            teacher_id
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING id
        `
        const values=[
            data.name,
            date(data.birth).iso,
            data.grade,
            data.email,
            data.workload,
            data.avatar_url,
            date(Date.now()).iso,
            data.teacher
        ]
        db.query(query, values, function (err) {
            if(err) throw `DATABASE Error!${err}`

            callback()
        })
    },
    find(id, callback) {
        db.query(`
        SELECT students.*,  teachers.name AS teacher_name
        FROM students 
        LEFT JOIN teachers ON (students.teacher_id = teachers.id)
        WHERE students.id = $1`,
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
            workload=($6),
            teacher_id=($7)
        WHERE id = $8
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.grade,
            data.email,
            data.workload,
            data.teacher,
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
    }, 
    teacherSelectOption(callback){
        db.query(`SELECT name, id FROM teachers`, function (err, results) {
            if(err) throw `DATABASE Error!${err}`

            callback(results.rows)
        })
    }
}