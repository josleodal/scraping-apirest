const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://elpais.com/ultimas-noticias/';
const titulares=[]
const imagenes=[]
const noticias=[]
const index=0
const scraper = async () => {
 
    const response = await axios.get(url);
    
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);


      $('.c.c-d.c--m').each((index, element) => {
        const noticia = {
            index:index++,
            titulo: $(element).find('.c_h h2').text(),
            imagen: $(element).find('img').attr('src'),
            descripcion: $(element).find('p').text(),
            enlaces:  $(element).find('a').attr('href')
        };
        noticias.push(noticia);
        console.log(noticia);
    });

    return noticias;
   
    } 
  
};

module.exports = scraper;


