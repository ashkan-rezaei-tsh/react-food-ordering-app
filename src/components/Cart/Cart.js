import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";

import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSumitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const [httpError, setHttpError] = useState(null);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItem = cartCtx.items.length > 0;

    const addItemHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const removeItemHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const confirmHandler = async (userData) => {
        setIsSumitting(true);

        const response = await fetch("http://127.0.0.1:8000/api/order", {
            method: "POST",
            body: JSON.stringify({
                user: userData,
                order: cartCtx.items,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            setHttpError(response.error);
            setIsSumitting(false);
            setDidSubmit(true);
            return;
        }

        const data = await response.json();

        if (data.status) {
            cartCtx.clear();
        }

        setIsSumitting(false);
        setDidSubmit(true);
    };

    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    amount={item.amount}
                    onAdd={addItemHandler.bind(null, item)}
                    onRemove={removeItemHandler.bind(null, item.id)}
                />
            ))}
        </ul>
    );

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>
                Close
            </button>
            {hasItem && (
                <button className={classes.button} onClick={orderHandler}>
                    Order
                </button>
            )}
        </div>
    );

    const modalContent = (
        <>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={confirmHandler} onCancel={props.onClose} />}
            {!isCheckout && modalActions}
        </>
    );

    const errorContent = <p className={classes.error}>{httpError && httpError}</p>;

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && errorContent}
            {!isSubmitting && !didSubmit && modalContent}

            {isSubmitting && !didSubmit && <p className={classes.warning}>Sending Request to Server....</p>}
            {!isSubmitting && didSubmit && (
                <>
                    <p className={classes.success}>Successfully submitted</p>
                    <div className={classes.actions}>
                        <button className={classes.button} onClick={props.onClose}>
                            Close
                        </button>
                    </div>
                </>
            )}
        </Modal>
    );
};

export default Cart;
