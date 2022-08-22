import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {DataContext} from '../Context'
import '../css/Products.css'
import Colors from './Colors';

export class Products extends Component {

    static contextType = DataContext;

    render() {
        const {products,addCart, filterOnColor, colors} = this.context;
        return (
            <>
            <h1>filter</h1>
                <select onChange={(e)=>filterOnColor(e.target.value)}>
                    <option>All</option>
                    {
                        colors.map((product,index) => <option key={index}>{product.colors}</option>)
                    }
                </select>
           
            <div id="product">
                
               {
                   products.map(product =>(
                       <div className="card" key={product._id}>
                           <Link to={`/product/${product._id}`}>
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
                               <h3>
                                   <Link to={`/product/${product._id}`}>{product.title}</Link>
                               </h3>
                               <span>${product.price}</span>
                               <p>{product.description}</p>
                               <button onClick={()=> addCart(product._id)}>Add to cart</button>
                           </div>
                       </div>
                   ))
               }
            </div>
            </>
        )
    }
}

export default Products
