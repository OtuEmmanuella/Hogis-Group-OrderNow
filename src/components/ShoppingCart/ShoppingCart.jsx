
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, Trash2, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';
import { useShoppingCart } from './ShoppingCartContext';
import BranchLocationModal from '../Modal/BranchLocationModal';
import LoginModal from '../Modal/Modal';
import emptybag from '/empty-bag.svg';

const branches = [
  {
    id: '1',
    name: 'Hogis Royale And Apartment',
    address: 'Main Branch, Calabar',
    deliveryZones: {
      motorbike: {
        zones: [
          {
            location: 'Marian (Ediba, Effio Ette, Atekong, parts of State Housing, up to Ekong Etta)',
            fees: { daytime: 1600, night: 1900 }
          },
          {
            location: 'Rabana / Biqua / Road Safety / Parliamentary / MCC / Asari Eso / State Housing / UNICAL / Etagbor',
            fees: { daytime: 1900, night: 2200 }
          },
          {
            location: 'Ekorinim / WAPI / Ikot Ishie / Diamond Hill / Spring Road / UNICAL / Etagbor / Parliamentary Ext. / Akai Ifa / Highway',
            fees: { daytime: 1900, night: 2200 }
          },
          {
            location: 'Ekorinim (First Bank side) / Navy Hospital / Parliamentary / Goldie / Ikot Ansa',
            fees: { daytime: 2100, night: 2400 }
          },
          {
            location: 'E1–E2 Estate',
            fees: { daytime: 2500, night: 2800 }
          },
          {
            location: 'Lemna / Inyang Eshie / Wemberly / White House',
            fees: { daytime: 2600, night: 2900 }
          },
          {
            location: 'Mount Zion / Atimbo / Mayne Avenue / Highway Zone 6 / Federal Housing / Monty Suites / Winners Chapel / Watt / Moore Road / Marian Resort',
            fees: { daytime: 2300, night: 2600 }
          },
          {
            location: 'CRUTECH / 8 Miles / Basin / Tinapa / Scanobo',
            fees: { daytime: 2900, night: 3200 }
          },
          {
            location: 'Akpabuyo',
            fees: { daytime: 6700, night: 7000 }
          }
        ]
      },
      bicycle: {
        zones: [
          {
            location: 'Marian (Ediba, Effio Ette, Atekong, parts of State Housing, up to Ekong Etta)',
            fees: { daytime: 1000, night: 1400 }
          },
          {
            location: 'Rabana / Biqua / Road Safety / Parliamentary / MCC / Asari Eso / State Housing',
            fees: { daytime: 1200, night: 1600 }
          },
          {
            location: 'Ekorinim / WAPI / Ikot Ishie / Diamond Hill / Spring Road / UNICAL / Etagbor / Parliamentary Extension / Akai Ifa / Highway',
            fees: { daytime: 1400, night: 1800 }
          },
          {
            location: 'Airport – Stadium',
            fees: { daytime: 1400, night: 1800 }
          },
          {
            location: 'Ekorinim (First Bank side) / Navy Hospital',
            fees: { daytime: 1600, night: 2000 }
          },
          {
            location: 'Parliamentary (Powerplant to Flyover)',
            fees: { daytime: 1700, night: 2100 }
          },
          {
            location: 'Goldie / Ikot Ansa',
            fees: { daytime: 1500, night: 1900 }
          },
          {
            location: 'E1–E2 Estate',
            fees: { daytime: 1800, night: 2200 }
          },
          {
            location: 'Lemna',
            fees: { daytime: 1900, night: 2300 }
          },
          {
            location: 'Mount Zion / Atimbo / Mayne Avenue / Highway Zone 6 / Federal Housing / Monty Suites / Winners Chapel / Watt',
            fees: { daytime: 1700, night: 2100 }
          },
          {
            location: 'Wemberly / White House',
            fees: { daytime: 1800, night: 2200 }
          },
          {
            location: 'Moore Road / Marian Resort',
            fees: { daytime: 1700, night: 2100 }
          },
          {
            location: 'CRUTECH',
            fees: { daytime: 2000, night: 2400 }
          }
        ]
      }
    },
    sundaySurcharge: 100,
    extraPickup: 500
  },
  {
    id: '2',
    name: 'Hogis Luxury Suites',
    address: 'Main Branch, Calabar',
    deliveryZones: {
      motorbike: {
        zones: [
          {
            location: 'Marian (Ediba, Effio Ette, Atekong, parts of State Housing, up to Ekong Etta)',
            fees: { daytime: 1600, night: 1900 }
          },
          {
            location: 'Rabana / Biqua / Road Safety / Parliamentary / MCC / Asari Eso / State Housing / UNICAL / Etagbor',
            fees: { daytime: 1900, night: 2200 }
          },
          {
            location: 'Ekorinim / WAPI / Ikot Ishie / Diamond Hill / Spring Road / UNICAL / Etagbor / Parliamentary Ext. / Akai Ifa / Highway',
            fees: { daytime: 1900, night: 2200 }
          },
          {
            location: 'Ekorinim (First Bank side) / Navy Hospital / Parliamentary / Goldie / Ikot Ansa',
            fees: { daytime: 2100, night: 2400 }
          },
          {
            location: 'E1–E2 Estate',
            fees: { daytime: 2500, night: 2800 }
          },
          {
            location: 'Lemna / Inyang Eshie / Wemberly / White House',
            fees: { daytime: 2600, night: 2900 }
          },
          {
            location: 'Mount Zion / Atimbo / Mayne Avenue / Highway Zone 6 / Federal Housing / Monty Suites / Winners Chapel / Watt / Moore Road / Marian Resort',
            fees: { daytime: 2300, night: 2600 }
          },
          {
            location: 'CRUTECH / 8 Miles / Basin / Tinapa / Scanobo',
            fees: { daytime: 2900, night: 3200 }
          },
          {
            location: 'Akpabuyo',
            fees: { daytime: 6700, night: 7000 }
          }
        ]
      },
      bicycle: {
        zones: [
          {
            location: 'Marian (Ediba, Effio Ette, Atekong, parts of State Housing, up to Ekong Etta)',
            fees: { daytime: 1000, night: 1400 }
          },
          {
            location: 'Rabana / Biqua / Road Safety / Parliamentary / MCC / Asari Eso / State Housing',
            fees: { daytime: 1200, night: 1600 }
          },
          {
            location: 'Ekorinim / WAPI / Ikot Ishie / Diamond Hill / Spring Road / UNICAL / Etagbor / Parliamentary Extension / Akai Ifa / Highway',
            fees: { daytime: 1400, night: 1800 }
          },
          {
            location: 'Airport – Stadium',
            fees: { daytime: 1400, night: 1800 }
          },
          {
            location: 'Ekorinim (First Bank side) / Navy Hospital',
            fees: { daytime: 1600, night: 2000 }
          },
          {
            location: 'Parliamentary (Powerplant to Flyover)',
            fees: { daytime: 1700, night: 2100 }
          },
          {
            location: 'Goldie / Ikot Ansa',
            fees: { daytime: 1500, night: 1900 }
          },
          {
            location: 'E1–E2 Estate',
            fees: { daytime: 1800, night: 2200 }
          },
          {
            location: 'Lemna',
            fees: { daytime: 1900, night: 2300 }
          },
          {
            location: 'Mount Zion / Atimbo / Mayne Avenue / Highway Zone 6 / Federal Housing / Monty Suites / Winners Chapel / Watt',
            fees: { daytime: 1700, night: 2100 }
          },
          {
            location: 'Wemberly / White House',
            fees: { daytime: 1800, night: 2200 }
          },
          {
            location: 'Moore Road / Marian Resort',
            fees: { daytime: 1700, night: 2100 }
          },
          {
            location: 'CRUTECH',
            fees: { daytime: 2000, night: 2400 }
          }
        ]
      }
    },
    sundaySurcharge: 100,
    extraPickup: 500
  },
  {
    id: '3',
    name: 'Hogis Exclusive Resort',
    address: 'Main Branch, Calabar',
    deliveryZones: {
      motorbike: {
        zones: [
          {
            location: 'Marian (Ediba, Effio Ette, Atekong, parts of State Housing, up to Ekong Etta)',
            fees: { daytime: 1600, night: 1900 }
          },
          {
            location: 'Rabana / Biqua / Road Safety / Parliamentary / MCC / Asari Eso / State Housing / UNICAL / Etagbor',
            fees: { daytime: 1900, night: 2200 }
          },
          {
            location: 'Ekorinim / WAPI / Ikot Ishie / Diamond Hill / Spring Road / UNICAL / Etagbor / Parliamentary Ext. / Akai Ifa / Highway',
            fees: { daytime: 1900, night: 2200 }
          },
          {
            location: 'Ekorinim (First Bank side) / Navy Hospital / Parliamentary / Goldie / Ikot Ansa',
            fees: { daytime: 2100, night: 2400 }
          },
          {
            location: 'E1–E2 Estate',
            fees: { daytime: 2500, night: 2800 }
          },
          {
            location: 'Lemna / Inyang Eshie / Wemberly / White House',
            fees: { daytime: 2600, night: 2900 }
          },
          {
            location: 'Mount Zion / Atimbo / Mayne Avenue / Highway Zone 6 / Federal Housing / Monty Suites / Winners Chapel / Watt / Moore Road / Marian Resort',
            fees: { daytime: 2300, night: 2600 }
          },
          {
            location: 'CRUTECH / 8 Miles / Basin / Tinapa / Scanobo',
            fees: { daytime: 2900, night: 3200 }
          },
          {
            location: 'Akpabuyo',
            fees: { daytime: 6700, night: 7000 }
          }
        ]
      },
      bicycle: {
        zones: [
          {
            location: 'Marian (Ediba, Effio Ette, Atekong, parts of State Housing, up to Ekong Etta)',
            fees: { daytime: 1000, night: 1400 }
          },
          {
            location: 'Rabana / Biqua / Road Safety / Parliamentary / MCC / Asari Eso / State Housing',
            fees: { daytime: 1200, night: 1600 }
          },
          {
            location: 'Ekorinim / WAPI / Ikot Ishie / Diamond Hill / Spring Road / UNICAL / Etagbor / Parliamentary Extension / Akai Ifa / Highway',
            fees: { daytime: 1400, night: 1800 }
          },
          {
            location: 'Airport – Stadium',
            fees: { daytime: 1400, night: 1800 }
          },
          {
            location: 'Ekorinim (First Bank side) / Navy Hospital',
            fees: { daytime: 1600, night: 2000 }
          },
          {
            location: 'Parliamentary (Powerplant to Flyover)',
            fees: { daytime: 1700, night: 2100 }
          },
          {
            location: 'Goldie / Ikot Ansa',
            fees: { daytime: 1500, night: 1900 }
          },
          {
            location: 'E1–E2 Estate',
            fees: { daytime: 1800, night: 2200 }
          },
          {
            location: 'Lemna',
            fees: { daytime: 1900, night: 2300 }
          },
          {
            location: 'Mount Zion / Atimbo / Mayne Avenue / Highway Zone 6 / Federal Housing / Monty Suites / Winners Chapel / Watt',
            fees: { daytime: 1700, night: 2100 }
          },
          {
            location: 'Wemberly / White House',
            fees: { daytime: 1800, night: 2200 }
          },
          {
            location: 'Moore Road / Marian Resort',
            fees: { daytime: 1700, night: 2100 }
          },
          {
            location: 'CRUTECH',
            fees: { daytime: 2000, night: 2400 }
          }
        ]
      }
    },
    sundaySurcharge: 100,
    extraPickup: 500
  }
];

export const ShoppingCartIcon = () => {
  const { cartItems } = useShoppingCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link to="/cart" className="relative inline-flex items-center p-2 text-gray-700 hover:text-gray-900">
      <ShoppingCart className="w-6 h-6 text-white" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export const ShoppingCartPage = () => {
  const { cartItems, incrementQuantity, decrementQuantity, removeItem, updateItemSpecifications, user } = useShoppingCart();
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [orderType, setOrderType] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showBranchLocationModal, setShowBranchLocationModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const isNightTime = () => {
    const hours = currentTime.getHours();
    return hours >= 18;
  };
  
  const isSunday = () => {
    return currentTime.getDay() === 0;
  };
  
  const getDeliveryPrice = () => {
    if (orderType !== 'delivery' || !deliveryLocation || !selectedBranch || !deliveryMethod) {
      return { baseDeliveryFee: 0, nightSurcharge: 0, sundaySurcharge: 0 };
    }
  
    const timeOfDay = isNightTime() ? 'night' : 'daytime';
    const branch = branches.find(b => b.id === selectedBranch.id);
    
    if (!branch || !branch.deliveryZones?.[deliveryMethod]) {
      return { baseDeliveryFee: 0, nightSurcharge: 0, sundaySurcharge: 0 };
    }
  
    const zone = branch.deliveryZones[deliveryMethod].zones.find(
      z => z.location === deliveryLocation
    );
  
    if (!zone) {
      return { baseDeliveryFee: 0, nightSurcharge: 0, sundaySurcharge: 0 };
    }
  
    const baseDeliveryFee = zone.fees[timeOfDay];
    const sundaySurcharge = isSunday() ? branch.sundaySurcharge : 0;
  
    return { 
      baseDeliveryFee,
      nightSurcharge: 0, // Night fees are already included in the zone.fees
      sundaySurcharge
    };
  };
  
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const { baseDeliveryFee, nightSurcharge, sundaySurcharge } = getDeliveryPrice();
  const deliveryPrice = baseDeliveryFee + nightSurcharge + sundaySurcharge;
  const finalPrice = totalPrice + deliveryPrice;

  const formatPrice = (price) => {
    return `₦${price.toLocaleString('en-NG', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const handleRemoveItem = (cartItemId) => {
    removeItem(cartItemId);
    toast.info('Item removed from cart.');
  };

  const handleCheckout = () => {
    if (!selectedBranch || !orderType || (orderType === 'delivery' && (!deliveryLocation || !deliveryMethod))) {
      setShowBranchLocationModal(true);
      return;
    }

    if (!user) {
      setShowLoginModal(true);
      return;
    }

    navigate(`/checkout?branch=${selectedBranch.id}&orderType=${orderType}&deliveryLocation=${encodeURIComponent(deliveryLocation)}&deliveryMethod=${deliveryMethod}&deliveryPrice=${deliveryPrice}`);
  };

  const handleSpecificationsChange = (cartItemId, specifications) => {
    updateItemSpecifications(cartItemId, specifications);
  };

  const handleBranchLocationSelect = (branch, type, location, method) => {
    setSelectedBranch(branch);
    setOrderType(type);
    setDeliveryLocation(location);
    setDeliveryMethod(method);
  };

  // Get delivery locations dynamically based on selected branch and delivery method
  const getDeliveryLocations = () => {
    if (!selectedBranch || !deliveryMethod) return [];
    
    return selectedBranch.deliveryZones?.[deliveryMethod]?.zones.map(zone => zone.location) || [];
  };

  return (
    <div className="min-h-screen bg-#00000 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#AF6E1C] to-[#C49402] bg-clip-text text-transparent">My Cart 🛒</h1> 
                  <ShoppingCartIcon />
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <img src={emptybag} alt="Empty cart" className="mx-auto h-48 w-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-10 mb-4">Your cart is empty</h3>
            <Link
              to="/menu"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-[#AF6E1C] to-[#C49402] hover:from-[#5A3D1E] hover:to-[#402E16]"

            >
              Browse Our Menu
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <div className="bg-white shadow-glow sm:rounded-lg mb-8 rounded-[16px]">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.cartItemId} className="p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-gray-900">{item.name}</h4>
                          <p className="mt-1 text-sm text-gray-500">{formatPrice(item.price * item.quantity)} ({item.quantity} @ {formatPrice(item.price)} each)</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() => decrementQuantity(item.cartItemId)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => incrementQuantity(item.cartItemId)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.cartItemId)}
                            className="text-red-500 hover:text-red-700 p-2"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label htmlFor={`specifications-${item.cartItemId}`} className="block text-sm font-medium text-gray-700">
                          Special Instructions
                        </label>
                        <textarea
                          id={`specifications-${item.cartItemId}`}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          rows={3}
                          placeholder="Add any special instructions for this item"
                          value={item.specifications || ''}
                          onChange={(e) => handleSpecificationsChange(item.cartItemId, e.target.value)}
                        ></textarea>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white shadow sm:rounded-lg p-6 rounded-[16px]">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Order Type
                    </label>
                    <select
                      value={orderType}
                      onChange={(e) => {
                        setOrderType(e.target.value);
                        setSelectedBranch(null);
                        setDeliveryLocation('');
                        setDeliveryMethod('');
                      }}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="">Select order type</option>
                      <option value="dine-in">Dine-In (Eat at Branch)</option>
                      <option value="pickup">Takeout - Pickup</option>
                      <option value="delivery">Takeout - Delivery</option>
                    </select>
                  </div>

                  {orderType && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4" />
                        Select Branch
                      </label>
                      <select
                        value={selectedBranch?.id || ''}
                        onChange={(e) => {
                          const branch = branches.find(b => b.id === e.target.value);
                          setSelectedBranch(branch);
                          setDeliveryLocation('');
                          setDeliveryMethod('');
                        }}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="">Choose a branch</option>
                        {branches.map((branch) => (
                          <option key={branch.id} value={branch.id}>
                            {branch.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {orderType === 'delivery' && selectedBranch && (
                    <>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Delivery Method
                        </label>
                        <select
                          value={deliveryMethod}
                          onChange={(e) => {
                            setDeliveryMethod(e.target.value);
                            setDeliveryLocation(''); // Reset delivery location when method changes
                          }}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="">Select delivery method</option>
                          <option value="motorbike">Motorbike</option>
                          <option value="bicycle">Bicycle</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Geographical Location
                        </label>
                        <select
                          value={deliveryLocation}
                          onChange={(e) => setDeliveryLocation(e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          disabled={!deliveryMethod}
                        >
                          <option value="">Select delivery location</option>
                          {getDeliveryLocations().map((location) => {
                            const zoneInfo = selectedBranch.deliveryZones[deliveryMethod].zones.find(
                              zone => zone.location === location
                            );
                            const fee = zoneInfo ? zoneInfo.fees[isNightTime() ? 'night' : 'daytime'] : 0;
                            return (
                              <option key={location} value={location}>
                                {location} - {formatPrice(fee)}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-sm text-gray-600">Delivery</dt>
                        <dd className="text-sm font-medium text-gray-900">{formatPrice(deliveryPrice)}</dd>
                      </div>
                      {isNightTime() && (
                        <div className="flex items-center justify-between">
                          <dt className="text-sm text-gray-600">Night Delivery Surcharge</dt>
                          <dd className="text-sm font-medium text-gray-900">
                            {formatPrice(deliveryMethod === 'motorbike' ? 300 : 400)}
                          </dd>
                        </div>
                      )}
                    </>
                  )}

                  <div className="border-t border-gray-200 pt-4">
                    <dl className="space-y-4">
                      <div className="flex items-center justify-between">
                        <dt className="text-sm text-gray-600">Subtotal</dt>
                        <dd className="text-sm font-medium text-gray-900">{formatPrice(totalPrice)}</dd>
                      </div>
                      {orderType === 'delivery' && baseDeliveryFee > 0 && (
                        <div className="flex items-center justify-between">
                          <dt className="text-sm text-gray-600">Delivery Fee</dt>
                          <dd className="text-sm font-medium text-gray-900">{formatPrice(baseDeliveryFee)}</dd>
                        </div>
                      )}
                      {isSunday() && orderType === 'delivery' && baseDeliveryFee > 0 && (
                        <div className="flex items-center justify-between">
                          <dt className="text-sm text-gray-600">Sunday Surcharge</dt>
                          <dd className="text-sm font-medium text-gray-900">{formatPrice(sundaySurcharge)}</dd>
                        </div>
                      )}
                      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                        <dt className="text-base font-medium text-gray-900">Total</dt>
                        <dd className="text-base font-medium text-gray-900">{formatPrice(finalPrice)}</dd>
                      </div>
                    </dl>
                  </div>
                   
                  <div>
                    <button
                      onClick={handleCheckout}
                      className="w-full  bg-gradient-to-r from-[#AF6E1C] to-[#C49402] border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                  <Link
                    to="/menu"
                    className="text-sm text-[#AF6E1C] hover:text-[#AF6E1C] flex items-center justify-center mt-4"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}

      {showBranchLocationModal && (
        <BranchLocationModal
          isOpen={showBranchLocationModal}
          onClose={() => setShowBranchLocationModal(false)}
          branches={branches}
          onSelect={handleBranchLocationSelect}
        />
      )}
    </div>
  );
};

export default ShoppingCartPage;

