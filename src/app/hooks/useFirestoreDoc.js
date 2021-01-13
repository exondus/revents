import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { asyncActionStart, asyncActionError, asyncActionFinish } from '../async/asyncReducer';
import { dataFromSnapshot } from '../firestore/FireStoreService';
export default function useFireStoreDoc({ query, data, deps, shouldExecute = true }) {
	const dispatch = useDispatch();

	useEffect(() => {
		if (!shouldExecute) return;
		dispatch(asyncActionStart());
		const unsubscribe = query().onSnapshot(
			(snapshot) => {
				if (!snapshot.exists) {
					dispatch(
						asyncActionError({
							code: 'not-found',
							message: 'Could not find document',
						})
					);
				}
				data(dataFromSnapshot(snapshot));
				dispatch(asyncActionFinish());
			},
			(error) => dispatch(asyncActionError(error))
		);

		return () => {
			unsubscribe();
		};
	}, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
