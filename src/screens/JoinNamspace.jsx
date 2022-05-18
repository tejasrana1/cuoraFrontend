import react, { useEffect } from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import $ from "jquery"

function JoinNamespace(props){
  var navigate = useNavigate();
    const {id, name} = useParams()
    useEffect(()=>{
        if(localStorage.getItem("cuoraId")){
        if(window.confirm(`Do you want to join ${name}`)){
            $.post("http://localhost:4000/joinNamespace",{userId: localStorage.getItem("cuoraId"), namespaceId: id})
            }
        }
        else
        alert("Please Login into this browser to join the class.")
            
            return navigate("/");
    },[])
    return(
        <div>
            {name}
        </div>
    )
}


export default JoinNamespace;