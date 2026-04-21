"use client";

import { useState } from "react";

const foods = [
  { id: 1, name: "ข้าวผัด", price: 50 },
  { id: 2, name: "ผัดกะเพรา", price: 60 },
  { id: 3, name: "ชาเย็น", price: 30 },
];

export default function MenuPage() {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (food: any) => {
    setCart([...cart, food]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📱 เมนูอาหาร</h1>

      {foods.map((food) => (
        <div key={food.id} className="flex justify-between mb-2">
          <span>{food.name} - {food.price}฿</span>
          <button
            className="bg-green-500 text-white px-3 rounded"
            onClick={() => addToCart(food)}
          >
            +
          </button>
        </div>
      ))}

      <hr className="my-4" />

      <h2 className="font-bold">🛒 ตะกร้า</h2>
      {cart.map((item, i) => (
        <div key={i}>{item.name}</div>
      ))}

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        ยืนยันออเดอร์
      </button>
    </div>
  );
}
