import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { createServer } from 'http';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Caminho correto das views e public
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// COLOCAR OS MODELS AQUI (colocar o caminho ../)

import Poder from '../models/Poderes.js';
import Personagens from '../models/Personagens.js';
import Filme from '../models/Filme.js';
import Universo from '../models/Universo.js';

//FIM MODELS

// Servir arquivos estáticos
//app.use(express.static(join(__dirname, '../public')));
app.set('views', join(__dirname, '../views'));

// Rotas
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

// COLOCAR AS ROTAS AQUI

app.get('/', (req, res) => {
    res.render("index")
})

// ======== ROTAS DE PERSONAGENS ========
app.get('/personagens/lst', async (req, res) => {
    const personagens = await Personagens.find()
    res.render("personagens/lst", {personagens:personagens})
})

app.get('/personagens/add', (req, res) => {
    res.render("personagens/add")
})

app.get('/personagens/edit/:id', async (req, res) => {
    const personagem = await Personagens.findById (req.params.id)
    res.render("personagens/edit", {personagem:personagem})
}
)

//rota de salvar o que foi editado
app.post('/personagens/edit/ok', async (req, res) => {
    await Personagens.findByIdAndUpdate (req.body.id, req.body)
    res.redirect("/personagens/lst") // ==== CORRIGIDO ====
}
)

app.post('/personagens/add/ok', upload.single("foto"), async (req, res) => {
     await Personagens.create({
        nome:req.body.nome,
        foto:req.file.buffer
     })
    res.render("personagens/addok")
}
)

app.get('/personagens/del/:id', async (req, res) => {
       await Personagens.findByIdAndDelete (req.params.id)
    res.redirect("/personagens/lst") 
})


// ======== ROTAS DE PODERES ========
app.get('/poderes/lst', async (req, res) => {
    const poderes = await Poder.find()
    res.render("poderes/lst", {poderes:poderes})
})

app.get('/poderes/edit/:id', async (req, res) => {
    const poder = await Poder.findById (req.params.id)
    res.render("poderes/edit", {poder:poder})
})

app.post('/poderes/edit/ok', async (req, res) => {
    await Poder.findByIdAndUpdate (req.body.id, req.body)
    res.redirect("/poderes/lst") // ==== CORRIGIDO ====
}
)

app.post('/poderes/add/ok', async (req, res) => {
    await Poder.create(req.body)
    res.render("poderes/addok" )
})

app.get('/poderes/add', (req, res) => {
    res.render("poderes/add")
})

app.get('/poderes/del/:id', async (req, res) => {
    await Poder.findByIdAndDelete (req.params.id)
    res.redirect("/poderes/lst") 
})


// ======== ROTAS DE FILMES ========
app.get('/filmes/lst', async (req, res) => {
    const filmes = await Filme.find()
    res.render("filmes/lst", {filmes})
})

app.get('/filmes/edit/:id', async (req, res) => {
    const filme = await Filme.findById (req.params.id)
    res.render("filmes/edit", {filme:filme})
})

app.post('/filmes/edit/ok', async (req, res) => {
    await Filme.findByIdAndUpdate (req.body.id, req.body)
    res.redirect("/filmes/lst") // ==== CORRIGIDO ====
})

app.post('/filmes/add/ok', async (req, res) => {
    await Filme.create(req.body)
    res.render("filmes/addok" )
})

app.get('/filmes/add', (req, res) => {
    res.render("filmes/add")
})

app.get('/filmes/del/:id', async (req, res) => {
    await Filme.findByIdAndDelete (req.params.id)
    res.redirect("/filmes/lst")
})

// ======== ROTAS DE UNIVERSOS ========
app.get('/universos/lst', async (req, res) => {
    const universos = await Universo.find()
    res.render("universos/lst", {universos:universos})
})

app.get('/universos/edit/:id', async (req, res) => {
    const universo = await Universo.findById (req.params.id)
    res.render("universos/edit", {universo:universo})
})

app.post('/universos/edit/ok', async (req, res) => {
    await Universo.findByIdAndUpdate (req.body.id, req.body)
    res.redirect("/universos/lst") // ==== CORRIGIDO ====
})

app.post('/universos/add/ok', async (req, res) => {
    await Universo.create(req.body)
    res.render("universos/addok" )
})

app.get('/universos/add', (req, res) => {
    res.render("universos/add")
})


app.get('/universos/del/:id', async (req, res) => {
    await Universo.findByIdAndDelete (req.params.id)
    res.redirect("/universos/lst")
})




//====== SITE ======
app.get('/site', async (req, res) => {
   const personagens = await personagens.find
res.render("site/index")
})

//FIM ROTAS
app.listen(3001)
// Exporta o handler compatível com Vercel
export default app;
