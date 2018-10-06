
const urlParams = new URLSearchParams(window.location.search);
const desc = urlParams.get('desc');
const type = urlParams.get('type');
const loc = urlParams.get('loc');

document.getElementById('type').innerText = type;
document.getElementById('description').innerText = desc;
document.getElementById('location').innerText = loc;
