<<<<<<< HEAD
// window.addEventListener("DOMContentLoaded", () => {
//   let urlParams = new URLSearchParams(window.location.search);
//   let myParam = urlParams.get('myParam');
//
//   console.log("myParam: ", myParam)
// })
=======

const urlParams = new URLSearchParams(window.location.search);
const desc = urlParams.get('desc');
const type = urlParams.get('type');
const loc = urlParams.get('loc');

document.getElementById('type').innerText = type;
document.getElementById('description').innerText = desc;
document.getElementById('location').innerText = loc;
>>>>>>> 9a87a77bbf88f1a71a6503bb307c4411d59e1f9f
