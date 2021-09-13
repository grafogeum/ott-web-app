import { ActionType } from '../action-types'
import { Action } from '../actions'
interface AuthUser {
	loading: boolean
	error: string | null
	data: any[]
}

export const reducer = (state: AuthUser, action: Action): AuthUser => {
	switch (action.type) {
		case ActionType.AUTH_USER:
			return { loading: true, error: null, data: [] }
		case ActionType.AUTH_USER_SUCCESS:
			return { loading: false, error: null, data: action.payload }
		case ActionType.AUTH_USER_ERROR:
			return { loading: false, error: action.payload, data: [] }
		default:
			return state
	}
}
