import { render, screen} from '@testing-library/react';
import React from 'react';
import user from '@testing-library/user-event';
import EnterComponent from '../components/EnterComponent';


test('will give an error message when the tableNo is negative',() => {
    render(<EnterComponent />);
    user.type(getTableNo (),'-1');
    expect(screen.getByTestId("error-msg-tableNum")).toBeInTheDocument();
    expect(screen.getByTestId("error-msg-tableNum").textContent).toEqual("Please enter a valid table number.");
})


test('will give an error message when the tableNo is a float',() => {
    render(<EnterComponent />);
    user.type(getTableNo (),'1.1');
    expect(screen.getByTestId("error-msg-tableNum")).toBeInTheDocument();
    expect(screen.getByTestId("error-msg-tableNum").textContent).toEqual("Please enter a valid table number.");
})
    

function getTableNo () {
    return screen.getByTestId("tableNum", {
        name: /Table No./i
    });
}

function getPhoneNum () {
    return screen.getByTestId("phoneNum", {
        name: /Phone Number/i
    });
}