import Order from "./Order";

const Orders = () => {
  return (
    <div className="bg-base-300 p-6 space-y-2 rounded">
      <div className="flex justify-between font-bold border-b pb-2 mb-2">
        <span>سفارش‌های اخیر</span>
        <span>همه سفارش‌ها </span>
      </div>
      <Order />
      <Order />
      <Order />
    </div>
  );
};

export default Orders;
