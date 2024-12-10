import { fetchTableData } from '../paginatedTable.actions';
import { enableFetchMocks } from 'jest-fetch-mock';

beforeAll(() => {
  enableFetchMocks();
});

describe('fetchTableData', () => {
  afterEach(() => {
    fetch.mockClear();
  });

  it('fetches data successfully when the response is OK', async () => {
    // Mock a successful fetch response
    const mockData = [{ id: 1, percentageFunded: 50, amountPledged: 1000 }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    // Call the function and assert the result
    const result = await fetchTableData();
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('throws an error when the response status is not OK', async () => {
    // Mock a failed fetch response (e.g., 404)
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    });
    await expect(fetchTableData()).rejects.toThrow('Network response was not ok Not Found');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('throws an error when a network error occurs', async () => {
    fetch.mockRejectedValueOnce(new Error('Network Error'));
    await expect(fetchTableData()).rejects.toThrow('Network Error');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
