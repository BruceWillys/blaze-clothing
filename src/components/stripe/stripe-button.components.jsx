import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HS75RL8pSzPPAQraEJVRvy2HvVk2lADDK5LBE1sHCc4DatUYYaRZ7LmfVcUXeEKPiWA1UFdd7U6GAmNT2lPv9cI00FC0V2kpt';


    const onToken = token => {
        console.log(token);
        alert( 'Payment Successful' );
    }


    return (
        <StripeCheckout 
           label='Pay Now'
           name='BLAZE CLOTHING Ltd'
           billingAddress
           shippingAddress
           bitcoin
           image='https://svgshare.com/i/CUz.svg'
           description={`Your total is ${price}`}
           amount={priceForStripe}
           panelLabel='Pay Now'
           token={onToken}
           stripeKey={publishableKey} 
        />
    );
};

export default StripeCheckoutButton;