const { db } = require("./models");

class PDF {

    createPDF() {

        const query = "INSERT INTO PDFs () VALUES () ";

        db.run(query, [], err => {

            if (err) {
                console.error(err);
            }
            console.log("a pdf file uploaded.");
        });
    }

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

    updatePDF (pdf) {

        const query = "UPDATE ON PDFs SET " + pdf.key + " = ? WHERE id = ?";

        const { id, value } = pdf;

        db.run(query, [ value, id ], err => {

            if (err) {
                console.error(err);
            }
            console.log("a pdf has been updated.");
        });
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