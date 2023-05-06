import { render, screen} from '@testing-library/react';
import React from 'react';
import user from '@testing-library/user-event';
import EnterComponent from '../components/EnterComponent';


test('will give an error message when the tableNo is larger than the maximum value',() => {
    render(<EnterComponent />);
    user.type(getTableNo (),'200');
    expect(screen.getByTestId("error-msg-tableNum")).toBeInTheDocument();
    expect(screen.getByTestId("error-msg-tableNum").textContent).toEqual("Please enter a valid table number.");
})

test('will give an error message when the phone number is not an australian number',() => {
    render(<EnterComponent />);
    user.type(getPhoneNum(),'13999996777');
    expect(screen.getByTestId("error-msg-phoneNum")).toBeInTheDocument();
    expect(screen.getByTestId("error-msg-phoneNum").textContent).toEqual("Please enter a valid phone number.");
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