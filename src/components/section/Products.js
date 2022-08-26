import React, { useContext, useEffect } from 'react'
import axios from "axios"
import {Link} from 'react-router-dom'
import {DataContext} from '../Context'
import '../css/Products.css'
import Colors from './Colors';


function Products() {
    const dataContext = useContext(DataContext)
    useEffect(()=>{
        axios.get("https://my-json-server.typicode.com/benirvingplt/products/products")
        .then(res => {
            const productMaping = [];
            const colorMaping = [];
            res.data.forEach(item=>{
                productMaping.push( {
                    "_id": item.id,
                    "title": item.name,
                    "src": item.img,
                    "description": item.name+" Description",
                    "content": item.name+" Content",
                    "price": item.price,
                    "colors": item.colour,
                    "count": 1
                })
                colorMaping.push(
                    {"colors": item.colour}
                )
            })
            dataContext.setData({type: "updateData",data: {...dataContext.data,products: productMaping, allProducts: productMaping, colors: colorMaping}})
        })
        .catch(err => alert(JSON.stringify(err)))
    },[])
    return (
        <>
        <h1>filter</h1>
            <select onChange={(e)=> dataContext.setData({type: "filterOnColor", color: e.target.value}) }>
                <option>All</option>
                {
                    dataContext.data.colors.map((product,index) => <option key={index}>{product.colors}</option>)
                }
            </select>
       
        <div id="product">
            
           {
               dataContext.data.products.map(product =>(
                   <div className="card" key={product._id}>
                       <Link>
                           <div className='image-layout'>
                            <div>
                                <img src={product.src} alt="" className='image'/>
                            </div>
                           </div>
                       </Link>
                       <div className="content">
                         <div style={{justifyContent: "flex-start", display: "flex", flexDirection: "center", alignItems: "center"}}>
                            <div style={{width: "25%", height: "auto", marginRight: "1rem"}}>
                                <p>Colors:</p> 
                            </div>
                            <div style={{width: "15%", height: "auto"}}>
                                <Colors colors={product.colors}/>
                            </div>
                         </div>
                           
                           <span>${product.price}</span>
                           <p>{product.description}</p>
                           <button onClick={()=> dataContext.setData({type: "addCart",id: product._id}) }>Add to cart</button>
                       </div>
                   </div>
               ))
           }
        </div>
        </>
    )
}

export default Products
