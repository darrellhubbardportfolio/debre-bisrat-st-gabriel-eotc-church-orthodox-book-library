const { db } = require("./models.js");

class Books {

    readBooks() {

        const query = "SELECT * FROM Books";

        return new Promise( (resolve, reject) => {

            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
                // console.log(rows);
                resolve(rows);
            });
        }); // end of promise
    }

    filterBooks(filterArray) {


    }

    sortBooks(sort) {

        const query = "SELECT * FROM Books ORDER BY " + sort.key + " " + sort.order;

        // check results 
        console.log("Server");
        console.log(sort);
        // return new Promise((resolve, reject) => {

        //     db.all(query, (err, rows) => {

        //         if (err) {

        //             reject(err);
        //         }
        //         resolve(rows);
        //     });
        // });
    }

    findBook(title) {

        const query = "SELECT * FROM Books WHERE title = ?";

        return new Promise((resolve, reject) => {

            db.get(query, [ title ], (err, row) => {

                if (err) {
                    reject(err);
                }
                resolve(row);
            }); // end of db
        }) // end of promise
    }
    createBook() {

    }

    findBookRange(start, last) {

        const query = "SELECT * FROM Books WHERE id BETWEEN ? AND ?";

        return new Promise((resolve, reject) => {

            db.all(query, [ start, last ], (err, rows) => {
                
                if (err) {
                    reject(err);
                }
                
                resolve(rows);
            })
        })
    }
}

module.exports = { Books };