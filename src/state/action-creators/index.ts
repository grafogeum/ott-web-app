import axios from 'axios'
import { ActionType } from '../action-types'
import {
	getProfileAuth,
	getMediaCategories,
} from '../../middleware/authMiddleware'

export const isProfileAuth = (term: string) => {
	return async (dispatch: any) => {
		dispatch({ type: ActionType.AUTH_USER })

		try {
			// dispatch({ type: ActionType.AUTH_USER })
			const BearerToken = getProfileAuth().then((result) => {
				getMediaCategories(result)
			})

			// console.log({ BearerToken })
		} catch (err: any) {
			dispatch({ type: ActionType.AUTH_USER_ERROR, payload: err.message })
		}
	}
}
