const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
    
    salvaDados(curso,tempoEstudado){
        let arquivoDoCurso = __dirname +"/data/" +curso+'.json';
        if(fs.existsSync(arquivoDoCurso)){
            this.adicionaTempoAoCurso(arquivoDoCurso,tempoEstudado)
        }else{
            this.criaArquivosDeCurso(arquivoDoCurso,{spaces: 2}).then(()=>{
                this.adicionaTempoAoCurso(arquivoDoCurso,tempoEstudado)
            }).catch((erro)=>{
                console.log(erro);
            });
        }
           
    },
    adicionaTempoAoCurso(arquivoDoCurso,tempoEstudo){
        let dados = {
            ultimoEstudo: new Date().toString(),
            tempo: tempoEstudo
        };
        
        jsonfile.writeFile(arquivoDoCurso,dados,{spaces: 2})
                .then(()=>{
                      console.log('Tempo salvo com sucesso')
                }).catch((erro)=>{
                    console.log(erro);
                });
    },
    criaArquivosDeCurso(nomeCurso,conteudoCurso){
        return jsonfile.writeFile(nomeCurso,conteudoCurso)
        .then(()=>{
            console.log('Arquivo Criado');
        }).catch((erro)=>{
            console.log(erro);
        });
    },
    carregaDados(curso){
        let arquivoDoCurso = __dirname +"/data/"+ curso+'.json';
        return jsonfile.readFile(arquivoDoCurso);
    },
    pegaNomeDosCursos(){
        let arquivos =fs.readdirSync(__dirname+'/data/');
        let cursos= arquivos.map((arquivo)=>{
            return arquivo.substr(0,arquivo.lastIndexOf('.'));
        });
        
        return cursos;
    }
    
}