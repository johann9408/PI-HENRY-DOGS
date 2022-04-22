initialState = {
    creados: [],
    filtrados: [],

}

function rootReducer (state = initialState, action){
    switch(action.type){
        case "FILTRO_RAZA_NOMBRE" :
            return {
                ...state,
                filtrados: action.payload
            }
    }

};


export default rootReducer;