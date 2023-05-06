import { render,screen } from '@testing-library/react';
import React from 'react';
import CharacterComponent from '../components/CharacterComponent';

describe ('start page of this application', () => {
    it ("has two enter buttons to separate customer and staff", ()=>{
        render(<CharacterComponent />);
        const customerButton = screen.getByTestId('customer');
        const staffButton = screen.getByTestId('staff');
        expect(customerButton).toHaveTextContent("I'm a customer");
        expect(staffButton).toHaveTextContent("I'm a staff");
    })
})
