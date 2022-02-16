import { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";

const AvaialbleMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch("http://127.0.0.1:8000/api/meals");

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            const responseData = await response.json();

            let data = [];

            for (const meal of responseData) {
                data.push({
                    id: meal.id,
                    name: meal.name,
                    description: meal.description,
                    price: +meal.price,
                });
            }

            setMeals(data);
            setIsLoading(false);
        };

        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if (isLoading) {
        return (
            <section className={classes.mealsLoading}>
                <p>Loading...</p>
            </section>
        );
    }

    if (httpError) {
        return (
            <section className={classes.error}>
                <p>{httpError}</p>
            </section>
        );
    }

    const mealsList = meals.map((meal) => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />);

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvaialbleMeals;
