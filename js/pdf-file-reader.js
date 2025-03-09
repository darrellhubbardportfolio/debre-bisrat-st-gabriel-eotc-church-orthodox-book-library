const pdfList = document.querySelector(".pdf-list");

fetch("./pdf.json")
.then(req => req.json())
.then(data => {
    data.forEach(pdf => {
        // check results
        console.log(pdf);
        createPDF(pdf);
    });
});

function createPDF (pdf) {

    const pdfListItem = document.createElement("li");

    pdfListItem.className = "border rounded-2 p-3 pdf-list-item";

    pdfListItem.innerHTML = `
        <i class="bi bi-file-earmark-pdf text-danger text-start fs-1 p-0 col-1"></i>
        <p class="m-0 p-1 col text-center">${pdf.pdf}.pdf</p>
        <span class="p-1 col text-center">${pdf.size}</span>
        <span class="m-0 p-1 col text-center">${pdf.sender}</span>
        <span class="m-0 p-1 col text-center">${pdf.upload_date}</span>
    `;
    pdfList.appendChild(pdfListItem);
}