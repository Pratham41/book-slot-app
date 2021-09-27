// GETTING CONSTANTS
import {
  SLOT_LIST_FAIL,
  SLOT_LIST_REQUEST,
  SLOT_LIST_SUCCESS,
  SLOT_DETAILS_REQUEST,
  SLOT_DETAILS_SUCCESS,
  SLOT_DETAILS_FAIL,
  SLOT_UPDATE_REQUEST,
  SLOT_UPDATE_SUCCESS,
  SLOT_UPDATE_FAIL,
} from '../constants/slotConstants';

// LIST SLOT REDUCER
export const slotListReducer = (state = { allSlots: [] }, action) => {
  switch (action.type) {
    case SLOT_LIST_REQUEST:
      return { loading: true, allSlots: [] };
    case SLOT_LIST_SUCCESS:
      return { loading: false, allSlots: action.payload };
    case SLOT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// SLOT DETAILS REDUCER
export const slotDetailsReducer = (state = { slot: null }, action) => {
  switch (action.type) {
    case SLOT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case SLOT_DETAILS_SUCCESS:
      return { loading: false, slot: action.payload };
    case SLOT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE SLOT REDUCER
export const slotUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SLOT_UPDATE_REQUEST:
      return { loading: true };
    case SLOT_UPDATE_SUCCESS:
      return { loading: false, success: true, updatedslot: action.payload };
    case SLOT_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
