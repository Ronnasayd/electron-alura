const { ipcRenderer, shell } = require('electron');
const process = require('process');

let $ = document.querySelector.bind(document);
let linkFechar = $("#link-fechar");
let linkLinkedin = $("#link-linkedin");
let versaoElectron = $('#versao-electron');
let linkTwitter = $("#link-twitter");

window.onload = function(){
    versaoElectron.textContent = process.versions.electron;
}

linkFechar.addEventListener('click', function () {
    ipcRenderer.send('fechar-janela-sobre');
})

linkLinkedin.addEventListener('click', function () {
    shell.openExternal("https://www.linkedin.com/in/wteophilo");
});

linkTwitter.addEventListener('click', function () {
    shell.openExternal("https://www.twitter.com/dquintanilhas");
});
