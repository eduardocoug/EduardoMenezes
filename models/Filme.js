import conexao from "../config/conexao.js";

const FilmesSchema = conexao.Schema({
    nome:{type:String, required:true},
    ano:{type:Date},
    classificacao:{type:Number}
})
const Filme = conexao.model("Filme", FilmesSchema);
export default Filme