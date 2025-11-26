import conexao from "../config/conexao.js";

const UniversosSchema = conexao.Schema({
    nome:{type:String, required:true},
    status:{type:String},
    descricao:{type:String}
})
const Universo = conexao.model("Universo", UniversosSchema);
export default Universo