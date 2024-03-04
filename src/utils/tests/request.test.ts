import {request} from '../request';
import {enableFetchMocks, FetchMock} from 'jest-fetch-mock';

describe('request', () => {
  enableFetchMocks();
  const fetchMock = fetch as FetchMock;
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('stubbing successful response', () => {
    it('should format the response correctly', done => {
      fetchMock.mockResponse(JSON.stringify({hello: 'world'}));
      request('/thisurliscorrect')
        .catch(done)
        .then(json => {
          expect(json.hello).toBe('world');
          done();
        });
    });
  });

  describe('stubbing 204 response', () => {
    it('should return null on 204 response', done => {
      fetchMock.mockResponse('', {status: 204, statusText: 'No Content'});
      request('/thisurliscorrect')
        .catch(done)
        .then(json => {
          expect(json).toBeNull();
          done();
        });
    });
  });

  describe('stubbing error response', () => {
    it('should catch errors', done => {
      fetchMock.mockResponse('', {
        status: 404,
        statusText: 'Not Found',
        headers: {
          'Content-type': 'application/json',
        },
      });
      request('/thisdoesntexist').catch(err => {
        expect(err.toString()).toBe('Error: Not Found');
        done();
      });
    });
  });
});
