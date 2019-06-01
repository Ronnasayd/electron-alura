const { ipcRenderer } = require('electron');
const timer  = require('./timer');
const data = require('../../data')

let $ = document.querySelector.bind(document);
let linkSobre = $('#link-sobre');
let botaoPlay = $('.botao-play');
let labelTempo = $('.tempo');
let labelCurso = $('.curso');
let campoAdicionar = $('.campo-adicionar');
let botaoAdicionar = $('.botao-adicionar');

window.onload = ()=>{
    data.carregaDados(labelCurso.textContent)
        .then((dados)=>{
            labelTempo.textContent=dados.tempo;
        })
        .catch((erro)=>{
            console.log(erro);
    });
}

linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});


let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
let play =false;
botaoPlay.addEventListener('click',function(){
    if (play){
        timer.parar(labelCurso.textContent);
        play = false;
        new Notification('Alura Timer',{
            body: `O ${labelCurso.textContent} parado!`,
            icon: 'img/stop-button.png'
        });
    }else{
        timer.iniciar(labelTempo);
        play = true;
        new Notification('Alura Timer',{
            body: `O ${labelCurso.textContent} iniciado!`,
            icon: 'img/play-button.png'
        });
    }
    imgs.reverse();
    botaoPlay.src = imgs[0];
});

ipcRenderer.on('curso-trocado',(event,curso)=>{
    timer.parar(curso.textContent);
    data.carregaDados(curso)
        .then((dados)=>{
            labelTempo.textContent = dados.tempo;
        }).catch((erro)=>{
            console.log('O curso ainda não possui um JSON');
            labelTempo.textContent = '00:00:00';
        });
    labelCurso.textContent = curso;
});

botaoAdicionar.addEventListener('click',function(){
    if(campoAdicionar.value == ''){
       console.log('Campo vazio não pode ser adicionado');
        return ;
    };
    
    let novoCurso = campoAdicionar.value;
    labelCurso.textContent = novoCurso;
    labelTempo.textContent = '00:00:00';
    campoAdicionar.value = '';
    ipcRenderer.send('curso-adicionado',novoCurso);
});

ipcRenderer.on('atalho-iniciar-parar',()=>{
    let click = new MouseEvent('click');
    botaoPlay.dispatchEvent(click);
})