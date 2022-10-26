import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage =()=>{
    //Variable de estado const[nombreDeVariable, LaFuncionQueCambiaElEstado]
    const[username, setUserName] = useState("")
    const[password, setPassword] = useState("")
    const[carrera, setCarrera] = useState(-1)
    const[error,setError] = useState(false);
    const navigate = useNavigate();

    const httpLogin =()=>{
        const prom = fetch("https://60b83e68b54b0a0017c03380.mockapi.io/users")
        prom.then((resp)=>{
            return resp.json()
        }).then((data)=>{
            setUserName(data[0].username)
        })
    }

    const httpLoginAsyncAwait = async () =>{
        const resp = await fetch("https://60b83e68b54b0a0017c03380.mockapi.io/users")
        const data = await resp.json()
        setUserName(data[0].username)
        setPassword(data[0].password)
    }

    useEffect(()=>{
        //httpLogin()
        httpLoginAsyncAwait()
    },[username,password])

    //()=> console.log(`Username: ${username} Password: ${password} Carrera: ${carrera}`)
    const loginOnClick =() =>{
        if (username !== "" && password !== "" && carrera !== -1) {
            //Si puedo hacer el login
            navigate("/main")
        }else{
            setError(true)
        }
    }

    return <div className="container">
        <h1>Login</h1>
        <div className="my-2 ">
            <input className="rounded-3" value={username} onChange={(evt)=>setUserName(evt.target.value)}/>
        </div>
        <div className="my-2 ">
            <input className="rounded-3" type="password" value={password} onChange={(evt)=>setPassword(evt.target.value)}/>
        </div>
        <div className="my-2 ">
            <select className="p-2 rounded-3" value={carrera} onChange={(evt)=>setCarrera(evt.target.value)}>
                <option value={-1}>----Seleccione una carrera----</option>
                <option value={1}>Ingenieria de Sistemas</option>
                <option value={2}>Ingenieria Industrial</option>
                <option value={3}>Ingenieria Civil</option>
            </select>
        </div>
        <Link to ={"/main"} className="btn btn-success">Ir a Main</Link>
        <button type="button" className="btn btn-primary" onClick={loginOnClick}>Login</button>
        <div>
            {
                (()=>{
                    if (error) {
                        return <div className="alert alert-danger">Error</div>
                    }
                })() //primer parentesis es la funcion, el seungod ejecuta la funcion
            }
            
        </div>
    </div>
}
export default LoginPage;