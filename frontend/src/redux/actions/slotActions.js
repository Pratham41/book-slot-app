import axios from 'axios'; // AXIOS

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

// LIST ALL SLOT ACTION
export const listSlots = () => async (dispatch) => {
  try {
    dispatch({ type: SLOT_LIST_REQUEST });

    const { data } = await axios.get('/api/slot/getall');
    dispatch({ type: SLOT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SLOT_LIST_FAIL, payload: error });
  }
};

// SLOT DETAIL ACTION
export const listSlotDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SLOT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/slot/${id}`);

    dispatch({ type: SLOT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SLOT_DETAILS_FAIL, payload: error });
  }
};

// UPDATE SLOT ACTION
export const updateSlot =
  (firstname, lastname, mobile, id) => async (dispatch) => {
    try {
      dispatch({
        type: SLOT_UPDATE_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.put(
        `/api/slot/:${id}`,
        { firstname, lastname, mobile, id },
        config
      );

      dispatch({
        type: SLOT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SLOT_UPDATE_FAIL,
        payload: error.message,
      });
    }
  };
