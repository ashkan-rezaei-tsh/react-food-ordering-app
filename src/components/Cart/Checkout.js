import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const nameIsValid = !isEmpty(enteredName);
        const streetIsValid = !isEmpty(enteredStreet);
        const cityIsValid = !isEmpty(enteredCity);
        const postalCodeIsValid = isFiveChars(enteredPostalCode);

        setFormValidity({
            name: nameIsValid,
            street: streetIsValid,
            postalCode: postalCodeIsValid,
            city: cityIsValid,
        });

        const formIsValid = nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity,
        });
    };

    const nameInputClasses = `${classes.control} ${formValidity.name ? "" : classes.invalid}`;
    const streetInputClasses = `${classes.control} ${formValidity.street ? "" : classes.invalid}`;
    const postalCodeInputClasses = `${classes.control} ${formValidity.postalCode ? "" : classes.invalid}`;
    const cityInputClasses = `${classes.control} ${formValidity.city ? "" : classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameInputClasses}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameInputRef} />
            </div>
            <div className={streetInputClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef} />
            </div>
            <div className={postalCodeInputClasses}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" ref={postalCodeInputRef} />
            </div>
            <div className={cityInputClasses}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef} />
            </div>

            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
