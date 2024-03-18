import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { toast } from 'react-toastify';

const CartItems = () => {
    const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

    //remove confirm
    const conform = (e) => {
        if (window.confirm("Do you want to Removed ?")) {
            removeFromCart(e.id); //call remove method
        } else {
            toast.error("Item didn't Removed");
        }
    }

    return (
        <>
            <div className='cartitems'>
                <div className="cartitem-format-main">
                    <p>Products</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr />
                {all_product.map((e) => {
                    if (cartItems[e.id] > 0) {
                        return <div key={e.id}>
                            <div className="cartitem-format cartitem-format-main">
                                <img src={e.image} alt="" className='cartitem-product-icon' />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartitem-quantity'>{cartItems[e.id]}</button>
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img className='cartitem-remove-icon' src={remove_icon} onClick={ () => { conform(e) }} alt="" />
                            </div>
                            <hr />
                        </div>
                    }
                    return null;
                })}
                <div className="cartitem-down">
                    <div className="cartitem-total">
                        <h1>Cart Totals</h1>
                        <div>
                            <div className="cartitem-total-item">
                                <p>Subtotal</p>
                                <p>${getTotalCartAmount()}</p>
                            </div>
                            <hr />
                            <div className="cartitem-total-item">
                                <p>Shipping Fee</p>
                                <p>Free</p>
                            </div>
                            <hr />
                            <div className="cartitem-total-item">
                                <h3>Total</h3>
                                <h3>${getTotalCartAmount()}</h3>
                            </div>
                        </div>
                        <button>PROCEED TO CHECKOUT</button>
                    </div>
                    <div className="cartitem-promocode">
                        <p>If you have a promo code, Enter it here </p>
                        <div className="cartitem-promobox">
                            <input type="text" placeholder='promo code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItems
