const {ipcRenderer} = require('electron');
const moment = require('moment');

let segundos = 0;
let idTimer;
let tempo;

module.exports = {
    iniciar(elemento){
        tempo = moment.duration(elemento.textContent);
        segundos= tempo.asSeconds();
        clearInterval(idTimer);
        idTimer = setInterval(()=>{
            segundos++;
            elemento.textContent = this.segundosParaTempo(segundos);
        },1000);       
    },
    
    
    parar(curso){
        clearInterval(idTimer);
        let tempoEstudado = this.segundosParaTempo(segundos);
        ipcRenderer.send('curso-parado',curso,tempoEstudado);
    },
    
    
    segundosParaTempo(segundos){
         return moment().startOf('day').seconds(segundos).format("HH:mm:ss");
    }
}