const { db } = require("./models");

class PDF {

    readPDF() {

        const query = `SELECT * FROM PDFs`;
        
        return new Promise((resolve, reject) => {

            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        }); // end of promise
    }
    deletePDF(pdf_id) {
        const query = "DELETE * FROM PDFs WHERE id = ?";
        db.run(query, [ pdf_id ], err => {
            if (err) {
                console.error(err);
            }
            console.log("pdf file removed");
        });
    }
}

module.exports = { PDF };