import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoCart, IoRemove, IoAdd, IoTrash } from 'react-icons/io5';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useShoppingCart } from './ShoppingCartContext';
import emptybag from '/empty-bag.svg';
import './ShoppingCart.css';

export const ShoppingCartIcon = () => {
  const { cartItems } = useShoppingCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link to="/cart" className="relative inline-flex items-center p-2 text-gray-700 hover:text-gray-900 transition-colors duration-200">
      <IoCart className="w-6 h-6 text-white" />
      {itemCount > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
      {itemCount}
    </span>
  )}
   </Link>

  );
};

export const ShoppingCartPage = () => {
  const { cartItems, incrementQuantity, decrementQuantity, removeItem } = useShoppingCart();
  const navigate = useNavigate();
  const [isHogisGuest, setIsHogisGuest] = useState(null);
  const [deliveryOption, setDeliveryOption] = useState('');

  const hogisLocations = {
    'Room Service': 0,
    'Within Hogis Royale': 0
  };

  const deliveryPrices = {
    'Calabar Municipality': 1500,
    'Calabar South': 1500,
    '8 miles': 2000,
    'Akpabuyo': 3000
  };

  const getDeliveryPrice = () => {
    if (isHogisGuest) {
      return hogisLocations[deliveryOption] || 0;
    } else {
      return deliveryPrices[deliveryOption] || 0;
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryPrice = getDeliveryPrice();

  const formatPrice = (price) => {
    return `₦${price.toLocaleString('en-NG', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  };

  const handleRemoveItem = (cartItemId) => {
    removeItem(cartItemId);
    toast.info('Item removed from cart.', {
      onClick: () => navigate('/cart')
    });
  };

  const handleCheckout = () => {
    if (!deliveryOption) {
      alert('Please select your preferred delivery location before proceeding to checkout.');
      return;
    }
    navigate(`/checkout?delivery=${encodeURIComponent(deliveryOption)}&deliveryPrice=${deliveryPrice}`);
  };

  return (
    <div className="shopping-cart-page">
      <div className="flex justify-between items-center mb-4">
        <h1 className="cart-title">My Cart</h1>
        <ShoppingCartIcon />
      </div>
      {cartItems.length === 0 ? (
        <div className="empty-cart-container">
          <img 
            src={emptybag} 
            alt="Empty shopping cart illustration" 
            className="empty-cart-illustration"
          />
          <p className="empty-cart">Your cart is empty</p>
          <Link to="/menu" className="back-to-shop">Browse Our Menu</Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items-container">
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item.cartItemId} className="cart-item">
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <div className="item-actions">
                      <div className="quantity-control">
                        <button onClick={() => decrementQuantity(item.cartItemId)} className="quantity-btn">
                          <IoRemove />
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button onClick={() => incrementQuantity(item.cartItemId)} className="quantity-btn">
                          <IoAdd />
                        </button>
                      </div>
                      <span className="item-price">{formatPrice(item.price * item.quantity)}</span>
                      <button onClick={() => handleRemoveItem(item.cartItemId)} className="remove-btn">
                        <IoTrash />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="cart-summary">
            <h4>Summary</h4>
            <div className="summary-details">
              <div className="summary-row">
                <span className='items-amount'>{cartItems.length} ITEMS</span>
                <span className='item-amount-price'>{formatPrice(totalPrice)}</span>
              </div>
              <div className="summary-row">
                <span className='delivery'>DELIVERY</span>
                {isHogisGuest === null ? (
                  <div>
                    <p>Are you a guest @Hogis Royale?</p>
                    <div className='guest-flex'>
                      <button onClick={() => setIsHogisGuest(true)} className='isGuest-btn'>Yes</button>
                      <button onClick={() => setIsHogisGuest(false)} className='isGuest-btn'>No</button>
                    </div>
                  </div>
                ) : (
                  <select
                    value={deliveryOption} 
                    onChange={(e) => setDeliveryOption(e.target.value)}
                    className="delivery-select"
                  >
                    <option value="">Select a location</option>
                    {isHogisGuest
                      ? Object.entries(hogisLocations).map(([location, price]) => (
                          <option key={location} value={location}>
                            {location} - {formatPrice(price)}
                          </option>
                        ))
                      : Object.entries(deliveryPrices).map(([location, price]) => (
                          <option key={location} value={location}>
                            {location} - {formatPrice(price)}
                          </option>
                        ))
                    }
                  </select>
                )}
              </div>
            </div>
            <div className="total-price">
              <span>TOTAL PRICE</span>
              <span>{formatPrice(totalPrice + deliveryPrice)}</span>
            </div>
            <button onClick={handleCheckout} className="checkout-link">CHECKOUT</button>
          </div>
        </div>
      )}
      {cartItems.length > 0 && <Link to="/menu" className="back-to-shop">← continue shopping</Link>}
    </div>
  );
};

export default ShoppingCartPage;