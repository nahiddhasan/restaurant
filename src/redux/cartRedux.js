import { createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        totalPrice:0,
        totalQuantity:0,
    },
    reducers:{
      
        addProduct:(state,action)=>{
               
                const products =state.products;
                const productInState = products.find((item)=>item.id === action.payload.id)
                
                if(productInState){
                    const updatedProduct = products.map((product)=> product.id === productInState.id ? {
                        ...action.payload,
                        quantity:action.payload.quantity + product.quantity,
                        price:action.payload.price + product.price,
                        

                    }:action.payload
                )

                state.products= updatedProduct;
                state.totalPrice = state.totalPrice + action.payload.price;
                state.totalQuantity = state.totalQuantity + action.payload.quantity;

            }else{
                state.products= [...state.products, action.payload]
                state.totalPrice = state.totalPrice + action.payload.price;
                state.totalQuantity = state.totalQuantity + action.payload.quantity;
            }
        },

        removeProduct:(state,action)=>{
            state.products= state.products.filter((item)=>item.id !== action.payload.id)
            state.totalPrice = state.totalPrice - action.payload.price;
            state.totalQuantity = state.totalQuantity - action.payload.quantity;
        }
    }

})


export const {addProduct,removeProduct} = cartSlice.actions;
export default cartSlice.reducer;