import axios from 'axios'
import {
	profileDevice,
	sessionUrl,
	GetMediaCategories,
	GetMediaPlayInfo,
	UsernameDB,
	PasswordDB,
} from '../constants'

export const getProfileAuth = async () => {
	try {
		const result = await axios.post(sessionUrl, {
			Username: UsernameDB,
			Password: PasswordDB,
			Device: profileDevice,
		})
		const { AuthorizationToken } = result.data
		const { Token } = AuthorizationToken

		return Token
	} catch (error) {
		console.log(error)
	}
}

export const getMediaCategories = async (BearerToken: string) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + BearerToken,
		},
	}

	try {
		const result = await axios.get(GetMediaCategories, config)
		console.log('getMediaCategories', result)
		return result
	} catch (error) {}
}

export const getMediaInfo = async (BearerToken: string) => {
	const data = { MediaId: 3217, StreamType: 'TRIAL' }
	const config = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + BearerToken,
		},
		body: JSON.stringify(data),
	}

	try {
		const result = await fetch(GetMediaPlayInfo, config)
			.then((response) => response.body)
			.then((rb) => {
				const reader = rb?.getReader()

				return new ReadableStream({
					start(controller) {
						// The following function handles each data chunk
						function push() {
							// "done" is a Boolean and value a "Uint8Array"
							reader?.read().then(({ done, value }) => {
								// If there is no more data to read
								if (done) {
									// console.log('done', done)
									controller.close()
									return
								}
								// Get the data and send it to the browser via the controller
								controller.enqueue(value)
								// Check chunks by logging to the console
								// console.log(done, value)
								push()
							})
						}

						push()
					},
				})
			})
			.then((stream) => {
				// Respond with our stream
				return new Response(stream, {
					headers: { 'Content-Type': 'text/html' },
				}).text()
			})
			.then((result) => {
				// Do things with result
				const parsedRes = JSON.parse(result)
				return parsedRes
			})

		return result
	} catch (error) {
		console.log(error)
	}
}
