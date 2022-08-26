import React, { useReducer } from 'react'
export const DataContext = React.createContext();

const switchData = (data, action) => {
    switch (action?.type) {
        case "addCart":
            const check = data.cart.every(item =>{
                return item._id !== action.id
            })
            if(check){
                const d = data.products.filter(product =>{
                    return product._id === action.id
                })
                return({...data,cart: [...data.cart,...d]})
            }else{
                return data
            }
        case "filterOnColor":
            let selectedColor = []
            if(action.color!=="All"){
            data.allProducts.forEach((product)=>{
                if(product.colors === action.color){
                    selectedColor.push(product)
                }
            })
            }else{
                selectedColor = data.allProducts;
            }
            return ({...data,products: selectedColor})
        case "reduction":
            const reductionCard = data.cart
            reductionCard.forEach(item =>{
                if(item._id === action.id){
                    item.count === 1 ? item.count = 1 : item.count -=1;
                }
            })
            // getTotal();
            return({...data,cart: reductionCard});
        
        case "increase":
            const increaseCart = data.cart
            increaseCart.forEach(item =>{
                if(item._id === action.id){
                    item.count = item.count + 1;
                }
            })
            
            return({...data,cart: increaseCart});
            
        case "removeProduct":
            const removeProductCart = data.cart
            removeProductCart.forEach((item, index) =>{
                if(item._id === action.id){
                    removeProductCart.splice(index, 1)
                }
            })
            // this.getTotal();
            return({...data,cart: removeProductCart});
        case "updateData":
            return action.data;

        case "getTotal":
            const getTotalCart= data.cart;
            const res = getTotalCart.reduce((prev, item) => {
                return prev + (item.price * item.count);
            },0)
            return ({...data, total: res})
        default:
            return data;
    }
}

function DataProvider(props) {
    const [data, setData] = useReducer(switchData,{
        products: [],
        cart: [],
        colors: [],
        allProducts: [],
        total: 0
    })
    return (
        <DataContext.Provider value={{data, setData}}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider


