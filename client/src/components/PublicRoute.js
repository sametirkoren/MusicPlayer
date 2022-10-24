import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

function PublicRoute({children}) {
    const navigate = useNavigate();
    useEffect(() => {
       if(localStorage.getItem("token")){
           navigate("/")
       }
    }, []);
    return <div>{children}</div>
}

export default PublicRoute;