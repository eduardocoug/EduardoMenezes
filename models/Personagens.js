import conexao from "../config/conexao.js";

const PersonagensSchema = conexao.Schema({
    nome:{type:String, required:true},
    afiliacao:{type:String},
    tipo:{type:String},
    primeira_aparicao:{type:Number},
    imagem:{type:Buffer ,
        get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
        }
        }

})
const Personagens = conexao.model("Personagens", PersonagensSchema);
export default Personagens