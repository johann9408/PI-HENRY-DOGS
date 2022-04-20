const { Router } = require('express');
const axios = require ('axios');
const {API_KEY} = process.env
const {Dog, Temperament} = require ('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.get('/dogs', async (req, res, next)=>{        
    try {  
        const getApi = async () =>{      // Llama al endpoitn de la api
            const urlApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            const infoApi = urlApi.data.map(e => {                   // se mapea para que devuelva solo la info requerida por el data
                return {
                    id : e.id,
                    name : e.name,
                    height : e.height,
                    weight : e.weight,
                    year : e.year,
                    image : e.image,
                    temperament : e.temperament
                }
            })
            return infoApi
        };
        
        const getDb = async () =>{
            return await Dog.findAll({          // Trae la informacion de mi base de datos
                include : {
                    model: Temperament,       // hace relacion para la creacion de un personaje, para que le incluya el temperamento.
                    atributtes : ['name'],
                    through:{
                        atributtes : []       // sobre la tabla atributos
                    }
                }
            })
        };

        const dogsAll = async () =>{                    // Trae todos los personajes de la api y db
            const infoApi = await getApi();
            const infoDb = await getDb();
            const infoTotal = await infoApi.concat(infoDb);
            return infoTotal
        };

        const {name} = req.query
        let dogsTotal= await dogsAll(); 
        if(name){
            let dogName = await dogsTotal.filter( e => e.name.toLowerCase().includes(name.toLowerCase()));
            dogName.length ?              // pregunta si encontro algo en dogsName
            res.status(200).send(dogName) :        // si no
            res.status(404).send('Perro no encontrado')
        }else{
            res.status(200).send(dogsTotal)
        }
    
    } catch (error) {
        next(error)
    }
})

router.get('/temperaments', async (req, res)=>{
    
})

module.exports = router;

