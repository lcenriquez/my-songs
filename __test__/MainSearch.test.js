import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Home from "../pages";
import MainSearchBar from '../components/SearchBar/MainSearchBar';

Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup);

describe('Test MainSearchBar for basic functionality', () => {
  let mainSearchInput;
  beforeEach(() => {
    render(<Home><MainSearchBar /></Home>);
    mainSearchInput = screen.getByTestId('mainSearchInput');
  });

  it('has an empty initial value', () => {
    expect(mainSearchInput.value).toBe('');
  });

  it('changes value when user types on SearchBar', () => {
    fireEvent.change(mainSearchInput, {target: {value: 'test'}})
    expect(mainSearchInput.value).toBe('test');
  });
});

describe('Test MainSearchBar state implementation', () => {
  let useState, useStateSpy, homeWrapper

  beforeEach(() => {
    useState = jest.fn();
    useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(query => [query, useState]);
    homeWrapper = mount(<Home />);
  });

  it('has a query state with an empty initial value', () => {
    expect(useStateSpy).toHaveBeenCalledWith('');
  });

  it('updates the query state when user types on SearchBar', async () => {
    // State is tested with a short string since the fetch action is triggered when the input value has more than 4 characters
    homeWrapper.find('input[name="mainSearchInput"]').simulate('change', {target: {value: 'test'}})
    expect(useState).toHaveBeenCalledWith('test');
  });
});