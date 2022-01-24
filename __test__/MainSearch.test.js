import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Home from "../pages";
import MainSearchBar from '../components/SearchBar/MainSearchBar';

Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup);

describe('Test MainSearchBar for basic functionality', () => {
  const { getByTestId } = render(<Home><MainSearchBar /></Home>);
  const mainSearchInput = getByTestId('mainSearchInput');

  it('has an empty initial value', () => {
    expect(mainSearchInput.value).toBe('');
  });

  it('changes value when user types on SearchBar', () => {
    fireEvent.change(mainSearchInput, {target: {value: 'Test query'}})
    expect(mainSearchInput.value).toBe('Test query');
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