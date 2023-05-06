import { render, screen} from '@testing-library/react';
import React from 'react';
import user from '@testing-library/user-event';
import EnterComponent from '../components/EnterComponent';


test('will give an error message when the phone number is negative',() => {
    render(<EnterComponent />);
    user.type(getPhoneNum(),'-1');
    expect(screen.getByTestId("error-msg-phoneNum")).toBeInTheDocument();
    expect(screen.getByTestId("error-msg-phoneNum").textContent).toEqual("Please enter a valid phone number.");
})


test('will give an error message when the phone number is not numeric',() => {
    render(<EnterComponent />);
    user.type(getPhoneNum(),'test');
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