import { render, screen} from '@testing-library/react';
import React from 'react';
import user from '@testing-library/user-event';
import NewDishComponent from '../../react-frontend/src/components/NewDishComponent';


test('will give an error message when the price if too large',() => {
    render(<NewDishComponent />);
    user.type(getPrice(),'999999999999');
    expect(screen.getByTestId("error-msg-price")).toBeInTheDocument();
    expect(screen.getByTestId("error-msg-price").textContent).toEqual("Please enter a valid price.");
})

    

function getName () {
    return screen.getByTestId("nameNewDish", {
        name: /Name/i
    });
}

function getPrice () {
    return screen.getByTestId("priceNewDish", {
        name: /Price/i
    });
}

function getKiloJoule () {
    return screen.getByTestId("kiloJouleNewDish", {
        name: /kiloJoule/i
    });
}
