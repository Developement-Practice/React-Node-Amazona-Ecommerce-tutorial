import React from 'react'
import { useParams } from 'react-router-dom';

export default function CartScreen() {

    // const productId = props.match.params.id;
    const productId = useParams().idAndQty.split('?')[0];
    // const qty = props.location.search ?
    //     Number(props.location.search.split("=")[1]) : 1;

    console.log("meoew" + useParams().idAndQty);
    const qty = useParams().idAndQty.split('=');

    console.log("From Cart Screen : productId " + productId + " qty " + qty);

    return (
        <div>
            <h1>CartScreen</h1>
            <p>ADD TO CART: ProductId: {productId} Qty: {qty}</p>
        </div>
    )
}
