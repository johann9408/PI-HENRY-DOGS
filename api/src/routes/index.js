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
});

const getAllTemperaments = async () => {
    const urlApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)  // trae la info de la api
    const infoApi = await urlApi.data.map(info => {  // mapea la api y saca el data o sea el temperament
        return {
            temperament: info.temperament
        }
    })
    return infoApi
}

router.get('/temperaments', async (req, res, next)=>{

    try {
        
 const infoTemp = await getAllTemperaments()  // llama la funcion con la data de temperament
   let temperamentAll = [];
   let arrayTemperament = await infoTemp.map( (e) => {   // mapea de nuevo para separar cada temperament
       let temperaments = e.temperament;
       if(temperaments){
           temperaments = temperaments.split(', ')   // eliminar las comas y espacios vacios 
       } return temperaments
   })
   for(let i =0; i < arrayTemperament.length; i++){
       temperamentAll = temperamentAll.concat(arrayTemperament[i])
   };
   for(let i=0; i< temperamentAll.length -1; i++){
       if(temperamentAll[i] != null){
           let aux = temperamentAll[i];
           Temperament.findOrCreate({    // omite si ya esta creado el temperamento
               where: {name : aux}
           })    
       }
   }
   const temperamentAllTwo = await Temperament.findAll()
   res.status(200).send(temperamentAllTwo)

} catch (error) {
   next(error)
}
     
});


 router.get('/dogs/:id', async (req, res) =>{
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

        const {id} = req.params
        const dogsTotal = await  dogsAll();
        if(id){
            const infoId = dogsTotal.filter( e => e.id === id);
            infoId.length === 0 ?
            res.send('Perro  no encontrado') :
            res.status(200).json(infoId)
        }
    }catch{
        res.send(404)
    }
}) 

    /* const id = req.params.id

    if(id.length){
        try {
            const infoApi = await axios.get (`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
            const infoAll = infoApi.data.filter( e => e.id == id);
            infoAll.length === 0 ?
            res.send('Id no encontrado') :
            res.status(200).json(infoAll)
            
        } catch (error) {
          next(error, 404);
        }
    }else {
        try {
            const infoDb = async ()=>{
              return  await Dog.findAll(id);
            }
            res.send(infoDb)
        } catch (error) {
            res.status(404)
        }
    } */



    


router.post('/dog' , async (req, res, next) =>{
try {
    const {name, height, weight, year, createDb, temperament } = req.body;

    const dogCreate = await Dog.create({
        name,
        height,
        weight,
        year,
        //image,
        createDb,
        
    });

    const dogsDb = await Temperament.findAll({
        where : {name : temperament}   // donde name sea igual al temperament que llega por body
    })

     dogCreate.addTemperament(dogsDb)

    res.send('Creado con exito')
    
} catch (error) {
    next(error)
}

} )

module.exports = router;

