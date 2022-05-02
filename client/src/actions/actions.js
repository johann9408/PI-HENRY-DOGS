import axios from "axios";




// envia datos al store de todas las razas creadas y existentes en el sv
export function getdogsAll (){
    return async  (dispacht)=>{
    let results = await axios.get('http://localhost:3001/dogs');   
    return dispacht({
        type: 'GET_DOGSALL',
        payload: results.data
    })  
    }
};