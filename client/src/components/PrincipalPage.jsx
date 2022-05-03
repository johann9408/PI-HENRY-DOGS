//import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../Css/PrincipalPage.css';

function PrincipalPage(){
    return (
        <div className="principal">
            <div>
                <h1 className="h1">Henry Dogs</h1>
            <div>
            <img className='img' src='https://images.unsplash.com/photo-1554830072-52d78d0d4c18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'/>
            
            </div>
            </div>
            <div>
                <Link to="/principal">
                    <button className="but">Buscar tu raza de perro</button>
                </Link>
            </div>            
        </div>
    )
}

export default PrincipalPage;