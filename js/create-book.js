// this script is to allow the user to preview the image before uploading it.
const book_cover = document.getElementById('book_cover');
const book_cover_preview = document.getElementById('book_cover_preview');

book_cover.addEventListener('change', function() {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        book_cover_preview.src = e.target.result;
    }

    reader.readAsDataURL(file);
});