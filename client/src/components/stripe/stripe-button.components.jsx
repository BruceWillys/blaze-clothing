import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';



const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HS75RL8pSzPPAQraEJVRvy2HvVk2lADDK5LBE1sHCc4DatUYYaRZ7LmfVcUXeEKPiWA1UFdd7U6GAmNT2lPv9cI00FC0V2kpt';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        })
        .then(response => {
            console.log(response);
            alert('Payment successful');
        })
        .catch(error => {
            console.log('Payment error: ',JSON.parse(error));
            alert(
                'There was an issue with your payment. Please make sure you use the provided credit card information'
            );
        });
    };


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