import { render, screen} from '@testing-library/react';
import React from 'react';
import user from '@testing-library/user-event';
import OrderHistoryComponent from '../components/OrderHistoryComponent';



test('will give an error message when the phone number is not an australian number',() => {
    render(<OrderHistoryComponent />);
    user.type(getPhoneNum(),'13999996777');
    expect(screen.getByTestId("error-msg-OrderPhoneNum")).toBeInTheDocument();
    expect(screen.getByTestId("error-msg-OrderPhoneNum").textContent).toEqual("Please enter a valid phone number.");
})
    



function getPhoneNum () {
    return screen.getByTestId("phoneNumOrder");
}