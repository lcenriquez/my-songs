import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import Home from "../pages";
import mockSearchResponse from '../__mocks__/search-response.json';


Enzyme.configure({ adapter: new Adapter() });
fetchMock.enableMocks();
afterEach(cleanup);

describe('Test MainSearchBar for basic functionality', () => {
  let mainSearchInput;
  beforeEach(() => {
    render(<Home/>);
    mainSearchInput = screen.getByTestId('mainSearchInput');
  });

  it('has an empty initial value', () => {
    expect(mainSearchInput.value).toBe('');
  });

  it('changes value when user types on SearchBar', () => {
    fireEvent.change(mainSearchInput, {target: {value: 'test'}})
    expect(mainSearchInput.value).toBe('test');
  });

  it('renders results when the form is submitted', async () => {
    fetch.once(JSON.stringify(mockSearchResponse));
    fireEvent.change(mainSearchInput, {target: {value: 'queen'}})
    expect(await screen.findByText(/Bohemian Rhapsody by Queen/i)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('/api/search?q=');
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