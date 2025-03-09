const pdfList = document.querySelector('.pdf-list');

const pdfFile = document.querySelector('#pdf_file');

// upload pdf file
pdfFile.addEventListener('change', (e) => {
    // get the selected file
    const file = e.target.files[0];

    const name = file.name;
    let size = file.size;

    // resize
    if (size.toString().length < 10 && size.toString().length > 6) {
        size = Math.floor(size / 1000000) + "gb";
    } else if (size.toString().length < 7 && size.toString().length > 3) {
        size = Math.floor(size / 1000) + "kb";
    } else if (size.toString().length < 4) {
        size = Math.floor(size) + "mb";
    }
    
    // create a new list item
    const pdfItem = document.createElement('li');

    pdfItem.classList.add('pdf-list-item');

    // add data
    pdfItem.innerHTML = `
        <i class="bi bi-file-earmark-pdf fs-1 text-danger text-start pdf-file-icon"></i>
        <label for="pdf_file" class="fw-bold form-label col text-start m-0 p-2 pdf-filename">${name}</label>
        <span class="file-size text-end m-0 p-2 pdf-file-size">size ${size}</span>
    `;

    // add the list item to the list
    pdfList.appendChild(pdfItem);
});