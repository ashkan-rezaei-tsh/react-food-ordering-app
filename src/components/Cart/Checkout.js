import useInput from "../../hooks/user-input";

import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameInputBlurHandler,
    } = useInput(isNotEmpty);

    const {
        value: enteredStreet,
        isValid: enteredStreetIsValid,
        hasError: streetInputHasError,
        valueChangeHandler: streetChangeHandler,
        inputBlurHandler: streetInputBlurHandler,
    } = useInput(isNotEmpty);

    const {
        value: enteredPostalCode,
        isValid: enteredPostalCodeIsValid,
        hasError: postalCodeInputHasError,
        valueChangeHandler: postalCodeChangeHandler,
        inputBlurHandler: postalCodeInputBlurHandler,
    } = useInput(isFiveChars);

    const {
        value: enteredCity,
        isValid: enteredCityIsValid,
        hasError: cityInputHasError,
        valueChangeHandler: cityChangeHandler,
        inputBlurHandler: cityInputBlurHandler,
    } = useInput(isNotEmpty);

    let formIsValid = false;

    if (enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid) {
        formIsValid = true;
    }


    const confirmHandler = (event) => {
        event.preventDefault();


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

    const nameInputClasses = `${classes.control} ${nameInputHasError ? classes.invalid : ""}`;
    const streetInputClasses = `${classes.control} ${streetInputHasError ? classes.invalid : ""}`;
    const postalCodeInputClasses = `${classes.control} ${postalCodeInputHasError ? classes.invalid : ""}`;
    const cityInputClasses = `${classes.control} ${cityInputHasError ? classes.invalid : ""}`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameInputClasses}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" value={enteredName} onChange={nameChangeHandler} onBlur={nameInputBlurHandler} />
            </div>
            <div className={streetInputClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" value={enteredStreet} onChange={streetChangeHandler} onBlur={streetInputBlurHandler} />
            </div>
            <div className={postalCodeInputClasses}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" value={enteredPostalCode} onChange={postalCodeChangeHandler} onBlur={postalCodeInputBlurHandler} />
            </div>
            <div className={cityInputClasses}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" value={enteredCity} onChange={cityChangeHandler} onBlur={cityInputBlurHandler} />
            </div>

            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit} disabled={!formIsValid}>
                    Confirm
                </button>
            </div>
        </form>
    );
};

export default Checkout;
