"use client"

import React, { useState } from 'react';

interface AddressFormData {
  name: string;
  surname: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
}

const CheckoutForm: React.FC = () => {
  const [addressData, setAddressData] = useState<AddressFormData>({
    name: '',
    surname: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
  });

  const [hasAddress, setHasAddress] = useState<boolean>(false); // Adres var mı kontrolü
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false); // Formu göster/gizle

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const handleAddAddress = () => {
    setShowAddressForm(true);
  };

  const handleSaveAddress = () => {
    setHasAddress(true);
    setShowAddressForm(false);
    // Burada adres verilerini kaydedebilirsiniz (örneğin API'ye gönderme)
    console.log(addressData);
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ödeme Sayfası</h1>

      <div className="border-b border-gray-400 mb-4">
        <div className="flex items-center justify-between mx-auto">
          <div>
            <h2 className="text-lg font-bold">Teslimat Adresi</h2>
          </div>
        </div>
      </div>

      {hasAddress ? (
        <div className="mb-4">
          <h3 className="font-bold">Mevcut Teslimat Adresi:</h3>
          <p>{addressData.name} {addressData.surname}</p>
          <p>{addressData.address}</p>
          <p>{addressData.city}, {addressData.zipCode}</p>
          <p>{addressData.phone}</p>
        </div>
      ) : (
        <>
          {!showAddressForm ? (
            <button 
              onClick={handleAddAddress} 
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Teslimat Adresi Ekle
            </button>
          ) : (
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Ad:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={addressData.name}
                onChange={handleAddressChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <label htmlFor="surname" className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                Soyad:
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={addressData.surname}
                onChange={handleAddressChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                Adres:
              </label>
              <textarea
                id="address"
                name="address"
                value={addressData.address}
                onChange={handleAddressChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={3}
                required
              />
              <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                Şehir:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={addressData.city}
                onChange={handleAddressChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <label htmlFor="zipCode" className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                Posta Kodu:
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={addressData.zipCode}
                onChange={handleAddressChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                Telefon:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={addressData.phone}
                onChange={handleAddressChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />

              <button 
                  onClick={handleSaveAddress} 
                  className="bg-green-500 text-white py-2 px-4 rounded mt-4"
              >
                  Adresi Kaydet
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CheckoutForm;
