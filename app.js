const express = require('express');
const app = express();
const fs = require('fs');
const scraper = require('./scraping.js')

// Middleware para manejar datos JSON
app.use(express.json());

// Middleware para manejar datos de formularios URL-encoded
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*app.get('/',async(req,res)=>{

    const result = await scraper()
    res.send(result)


})*/
app.get('/noticias',async (req , res) => {
    const noticias =await scraper();
    res.json(noticias);
})
app.get('/noticia/:index',async (req , res) => {
    const index = req.params;
    const noticias = scraper();
    const noticia = noticias[index];
    res.json(noticia);
})
app.post('/noticias',async (req ,res) => {
    const noticias = scraper();
    const nuevaNoticia = req.body;
    noticias.push(nuevaNoticia);
    guardarDatos(nuevaNoticia);
    res.json({mensaje:'Noticia creada'});
})
app.put('/noticias/:index', async (req,res) => {
    const index = req.params;
    const noticias = scraper();
    const nuevaInfo = req.body;
    noticias[index] = {...noticias[index], ...nuevaInfo};
    guardarDatos(noticias);
    res.json({mensaje:'Noticia actualizada'});
});
app.delete('/noticias/:index', async (req, res) => {
    const index = req.params;
    const noticias = scraper();
    noticias.splice(index , 1);
    guardarDatos(noticias);
    res.json({mensaje:'Noticia eliminada'})
});
app.get('/scraping', (req , res ) => {
    scraper();
    res.send('Scraping en proceso')
});


app.listen(3000,() => {
    console.log('Express esta escuchando en el servidor 3000');
});

