import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slices/orderSlice";

const MyOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`order/${orderId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-lg sm:rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-500 text-sm">
            <thead className="bg-gray-100 uppercase text-gray-700">
              <tr>
                <th className="py-2 px-4">Image</th>
                <th className="py-2 px-4">Order Id</th>
                <th className="py-2 px-4">Created</th>
                <th className="py-2 px-4">Shipping Address</th>
                <th className="py-2 px-4">Items</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    onClick={() => handleRowClick(order._id)}
                    className="border-b hover:border-gray-50 cursor-pointer"
                  >
                    <td className="py-2 px-4">
                      <img
                        src={order.orderItems[0].image}
                        alt={order.orderItems[0].name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    </td>
                    <td className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">
                      #{order._id}
                    </td>
                    <td className="py-2 px-4">
                      {new Date(order.createdAt).toLocaleDateString()}{" "}
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="py-2 px-4">
                      {order.shippingAddress
                        ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                        : "N/A"}
                    </td>
                    <td className="py-2 px-4">{order.orderItems.length}</td>
                    <td className="py-2 px-4">{order.totalPrice}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`${
                          order.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        } px-2 py-1 rounded-full text-sm font-medium`}
                      >
                        {order.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-4 px-4 text-center text-gray-500"
                  >
                    You have no orders.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrderPage;
