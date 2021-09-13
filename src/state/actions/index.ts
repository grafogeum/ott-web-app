import { ActionType } from '../action-types'

interface AuthUser {
	type: ActionType.AUTH_USER
}
interface AuthUserSuccess {
	type: ActionType.AUTH_USER_SUCCESS
	payload: []
}
interface AuthUserError {
	type: ActionType.AUTH_USER_ERROR
	payload: string
}

export type Action = AuthUser | AuthUserSuccess | AuthUserError
