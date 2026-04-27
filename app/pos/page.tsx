export default function POSPage() {
  const orders = [
    { id: 1, table: 5, items: ["ข้าวผัด", "ชาเย็น"], status: "NEW" },
    { id: 2, table: 3, items: ["ผัดกะเพรา"], status: "COOKING" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🧾 POS ร้านอาหาร</h1>

      {orders.map((order) => (
        <div key={order.id} className="border p-3 mb-3 rounded">
          <div>โต๊ะ {order.table}</div>
          <div>รายการ : {order.items.join(", ")}</div>
          <div className="font-bold">สถานะ: {order.status}</div>
        </div>
      ))}
    </div>
  );
}
