import axios from "axios";



// envia datos al store filtrados por nombre y raza
export function filterNombreRaza  (data){
    return {
        type: "FILTRO_RAZA_NOMBRE",
        payload : data
    }
}
// envia datos al store de todas las razas creadas y existentes en el sv
export function dogsAll (){

    return async (dispacht)=>{
        let results = await axios.get('http://localhost:3001/dogs');
        let resultsData = results.data;
        return dispacht(filterNombreRaza(resultsData))
    }

};