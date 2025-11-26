import conexao from "../config/conexao.js";

const PoderesSchema = conexao.Schema({
    nome:{type:String, required:true},
    usuario:{type:String}
})
const Poder = conexao.model("Poder", PoderesSchema);
export default Poder