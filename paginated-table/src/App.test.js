import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./pages/PaginatedTable', () => () => <div>Mocked Paginated Table</div>);

describe('App Component', () => {
  it('renders PaginatedTable component', () => {
    render(<App />);
    expect(screen.getByText('Mocked Paginated Table')).toBeInTheDocument();
  });
});
