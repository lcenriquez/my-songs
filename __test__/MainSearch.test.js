import { render, fireEvent, cleanup } from '@testing-library/react';
import Home from "../pages";
import MainSearchBar from '../components/SearchBar/MainSearchBar';

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