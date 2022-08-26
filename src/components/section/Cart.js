import React, { useContext } from 'react'
import {DataContext} from '../Context'
import {Link} from 'react-router-dom'
import Colors from './Colors'
import '../css/Details.css'
import '../css/Cart.css'


function Cart() {
    const dataContext = useContext(DataContext)
    
    if(dataContext.data.cart.length === 0){
        return <h2 style={{textAlign:"center"}}>Nothings Product</h2>
    }else{
        return (
            <>
                {
                    dataContext.data.cart.map(item =>(
                        <div className="details cart" key={item._id}>
                            <img src={item.src} alt=""/>
                            <div className="box">
                                <div className="row">
                                    <h2>{item.title}</h2>
                                    <span>${item.price * item.count}</span>
                                </div>
                                <Colors colors={item.colors}/>
                                <p>{item.description}</p>
                                <p>{item.content}</p>
                                <div className="amount">
                                    <button className="count" onClick={() => dataContext.setData({type: "reduction",id: item._id})  }> - </button>
                                    <span>{item.count}</span>
                                    <button className="count" onClick={() => dataContext.setData({type: "increase",id: item._id}) }> + </button>
                                </div>
                            </div>
                            <div className="delete" onClick={() => dataContext.setData({type: "removeProduct",id: item._id})}>X</div>
                        </div>
                    ))
                }
                <div className="total">
                    <Link to="/payment">Payment</Link>
                    {/* <h3>Total: ${dataContext.data.total}</h3> */}
                </div>
            </>
            )
        }
}

export default Cart