window.addEventListener("DOMContentLoaded")
let urlParams = new URLSearchParams(window.location.search);
let myParam = urlParams.get('myParam');

console.log("myParam: ", myParam)
