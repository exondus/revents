import { ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import {
	asyncActionError,
	asyncActionFinish,
	asyncActionStart,
} from '../../app/async/asyncReducer';
import { delay } from '../../app/common/util/util';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export function Increment(amount) {
	return async function (dispatch) {
		dispatch(asyncActionStart());
		try {
			await delay(1000);
			dispatch({ type: INCREMENT_COUNTER, payload: amount });
			dispatch(asyncActionFinish());
		} catch (err) {
			dispatch(asyncActionError());
		}
	};
}

export function Decrement(amount) {
	return async function (dispatch) {
		dispatch(asyncActionStart());
		try {
			await delay(1000);
			dispatch({ type: DECREMENT_COUNTER, payload: amount });
			dispatch(asyncActionFinish());
		} catch (err) {
			dispatch(asyncActionError());
		}
	};
}

const initialState = {
	data: 42,
};

export default function testReducer(state = initialState, { type, payload }) {
	switch (type) {
		case INCREMENT_COUNTER:
			return {
				...state,
				data: state.data + payload,
			};
		case DECREMENT_COUNTER:
			return {
				...state,
				data: state.data - payload,
			};
		default:
			return state;
	}
}
