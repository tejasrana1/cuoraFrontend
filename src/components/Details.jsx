import react, { useEffect, useState } from "react"
import $ from "jquery";


function Details(){
    const [data, setData] = useState({
        name: "",
        phone: "",
        address: "",
        email: "",
        id: ""
    })
    useEffect(()=>{
        $.post("http://localhost:4000/details",{id: localStorage.getItem("cuoraId")})
        .done(res=>{
            console.log(res);
            setData({
                name: res.data.name,
                phone: res.data.phone,
                address: res.data.address,
                email: res.data.email,
                id: res.data._id
            })
        })
        .fail(e=>{
            console.log(e);
        },)
    },[])
    function changeHandler(event){
        const {name,value} = event.target
        setData((prev)=>{
            return{
                ...prev,
                [name]: value
            }
        })
    }
    function submitHandler(event){
        event.preventDefault()
        $.post("http://localhost:4000/updateDetails", {data: data})
        .done(res=>{
            setData({
                name: res.data.name,
                phone: res.data.phone,
                address: res.data.address,
                email: res.data.email,
                id: res.data._id
            })
            alert("Updated Successfully")
        })
        .fail(e=>{
            console.log(e);
        })
    }
    return(
        <div>
            details
            <form onSubmit={submitHandler}>
                <input type="text" name="name" onChange={changeHandler} placeholder="Name" value={data.name} /> <br />
                <input type="text" name="phone" onChange={changeHandler} placeholder="Phone Number" value={data.phone} /> <br />
                <input type="text" name="address" onChange={changeHandler} placeholder="Address" value={data.address} /> <br />
                <input type="email" name="email" onChange={changeHandler} placeholder="Email" value={data.email} /> <br />
                <input type="hidden" name="id" value={data.id} />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Details;