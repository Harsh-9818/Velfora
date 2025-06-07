import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
const OrderDetailsPage = () => {

    const {id} = useParams();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const mockOrderDetails = {
            _id: id,
            createdAt: new Date(),
            isPaid: true,
            isDelivered: false,
            paymentMethod: "Paypal",
            shippingMethod: "Standard",
            ShippingAddress: {city: "New Delhi", country: "India"},
            orderItems: [
                {
                    productId: "1",
                    name: "Jacket",
                    price: 1000,
                    quantity: 1,
                    image: "https://picsum.photos/150?random=1"
                },
                {
                    productId: "2",
                    name: "Sneaker",
                    price: 1500,
                    quantity: 1,
                    image: "https://picsum.photos/150?random=2"
                },
            ]
        };
        setOrderDetails(mockOrderDetails)
    }, [id])

  return (
    <div>
        
    </div>
  )
}

export default OrderDetailsPage