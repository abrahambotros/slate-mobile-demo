import { apiRequest as request } from '../../apiRequest';

export const CREATING_CASE = 'CREATING_CASE';
export const CREATE_CASE_SUCCESS = 'CREATE_CASE_SUCCESS';
export const CREATE_CASE_ERROR = 'CREATE_CASE_ERROR';
export const FETCHING_CASES = 'FETCHING_CASES';
export const FETCH_CASES_SUCCESS = 'FETCH_CASES_SUCCESS';
export const FETCH_CASES_ERROR = 'FETCH_CASES_ERROR';
export const UPDATING_CASE = 'UPDATING_CASE';
export const UPDATE_CASE_SUCCESS = 'UPDATE_CASE_SUCCESS';
export const UPDATE_CASE_ERROR = 'UPDATE_CASE_ERROR';

export const create = data => (dispatch) => {
  dispatch({
    type: CREATING_PENDING
  });
  request({
    method : 'post',
    url    : '/',
    body   : data,
  })
  .then((reply) => {
    return dispatch({
      type    : CREATE_CASE_SUCCESS,
      payload : {
        case: reply.case
      }
    });
  })
  .catch((e) => {
    return dispatch({
      type    : CREATE_CASE_ERROR,
      payload : {
        message: err.message || 'API error, kindly try again'
      }
    });
  });
};

export const fetch = () => (dispatch) => {
  dispatch({
    type: FETCHING_CASES
  });
  request({
    method : 'get',
    url    : '/'
  })
  .then((reply) => {
    return dispatch({
      type    : FETCH_CASES_SUCCESS,
      payload : {
        cases: reply.cases
      }
    });
  })
  .catch((e) => {
    return dispatch({
      type    : FETCH_CASES_ERROR,
      payload : {
        message: err.message || 'API error, kindly try again'
      }
    });
  });
};

export const update = (id, data) => (dispatch) => {
  dispatch({
    type: UPDATING_CASE
  });
  request({
    method : 'put',
    url    : `/${id}`,
    body   : data,
  })
  .then((reply) => {
    return dispatch({
      type    : UPDATE_CASE_SUCCESS,
      payload : {
        case: reply.case
      }
    });
  })
  .catch((e) => {
    return dispatch({
      type    : UPDATE_CASE_ERROR,
      payload : {
        message: err.message || 'API error, kindly try again'
      }
    });
  });
};