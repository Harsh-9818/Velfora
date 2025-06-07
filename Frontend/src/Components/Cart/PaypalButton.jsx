import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js"
const PaypalButton = ({amount, onSuccess, onError}) => {
  return (
    <PayPalScriptProvider
        options={{
            "client-id": "AYmZ10wioMF0L7ErdxYuG1Eo2acXEqz6phnbOAP7M2aroEUZPgqW-qA7PFblOxOpafVrezz-l0g7Tt9o"
        }}
    >
        <PayPalButtons
            style={{layout: "vertical"}}
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [{amount:{value: amount}}],
                });
            }}
            onApprove={(data, actions) => {
                return actions.order.capture().then(onSuccess);
            }}
            onError={onError}
        >

        </PayPalButtons>
    </PayPalScriptProvider>
  )
}

export default PaypalButton