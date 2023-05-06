import React from 'react'
import ReactDOM from 'react-dom'
import BackDrop from '../../react-frontend/src/components/BackDrop'
import {isTSAnyKeyword} from '@babel/types';
import {render,cleanup} from '@testing-library/jest-dom/extend-expect'

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<BackDrop></BackDrop>,div)
})

