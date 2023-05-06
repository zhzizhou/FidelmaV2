import { render, screen} from '@testing-library/react';
import React from 'react';
import user from '@testing-library/user-event';
import NewDishComponent from '../components/NewDishComponent';

test('will give an error message when the name is not alphabet',() => {
    render(<NewDishComponent />);
    user.type(getName(),'&23');
    expect(screen.getByTestId("error-msg-name")).toBeInTheDocument();
    expect(screen.getByTestId("error-msg-name").textContent).toEqual("Please enter a valid name.");
})

test('will give an error message when the name is not alphabet',() => {
    render(<NewDishComponent />);
    user.type(getName(),'&&&&)(');
    expect(screen.getByTestId("error-msg-name")).toBeInTheDocument();
    expect(screen.getByTestId("error-msg-name").textContent).toEqual("Please enter a valid name.");
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
