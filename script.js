// Loads header
function load(url, element) {
  req = new XMLHttpRequest();
  req.open("GET", url, false);
  req.send(null);
  element.innerHTML = req.responseText;
}

load("/ICS4U-Portfolio/header.html", document.getElementById("loadHeader"));

// Scrolls smoothly to anchor links
function scrollTo(id) {
    document.documentElement.style.scrollBehavior = 'smooth'
    element = document.createElement('a');
    element.setAttribute('href', id)
    element.click();
}
