//Listen for form submit
document.getElementById('myform').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;
    if (!validateForm(siteName, siteURL)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteURL
    }
    //Local storage
    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    fetchBookmarks();
    e.preventDefault();
}
//Delete Bookmarks
function deleteBookmarks(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }

    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();

}
//Fetch Bookmarks
function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksResults = document.getElementById('bookmarksResults');
    bookmarksResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResults.innerHTML += '<div class="well">' + '<h3>' + name + '<a class="btn btn-default" target="_blank" href="' + url + '">Visit</a> ' + '<a onclick="deleteBookmarks(\'' + url + '\')"class="btn btn-danger"  href="#">Delete</a> ' + '</h3>' + '</div>'
    }
}

function validateForm(siteName, siteURL) {
    if (!siteName || !siteURL) {
        alert('Fill all');
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteURL.match(regex)) {
        alert('Use a valid URL');
        return false;
    }
    return true;
}

