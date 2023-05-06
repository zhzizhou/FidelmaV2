import { render, screen} from '@testing-library/react';
import React from 'react';
import user from '@testing-library/user-event';
import NewDishComponent from '../components/NewDishComponent';


test('will give an error message when the kiloJoule if too small',() => {
    render(<NewDishComponent />);
    user.type(getKiloJoule(),'-1');
    expect(screen.getByTestId("error-msg-kiloJoule")).toBeInTheDocument();
    expect(screen.getByTestId("error-msg-kiloJoule").textContent).toEqual("Please enter a valid kiloJoule.");
})

test('will give an error message when the kiloJoule if too large',() => {
    render(<NewDishComponent />);
    user.type(getKiloJoule(),'999999999999');
    expect(screen.getByTestId("error-msg-kiloJoule")).toBeInTheDocument();
    expect(screen.getByTestId("error-msg-kiloJoule").textContent).toEqual("Please enter a valid kiloJoule.");
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
