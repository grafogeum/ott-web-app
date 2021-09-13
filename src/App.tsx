import React, { useState, useEffect } from 'react'
import './App.css'
import SplashScreen from './screens/SplashScreen'
import MainScreen from './screens/MainScreen'
import { LoginForm } from './components/LoginForm'
import { Params } from './types'
import { UsernameDB, PasswordDB } from './constants'
import { MediaPlayer } from './components/MediaPlayer'
// import { isEmpty } from 'lodash'

import {
	getProfileAuth,
	getMediaCategories,
	getMediaInfo,
} from './middleware/authMiddleware'

interface UserData {
	username: string
	password: string
}

function App() {
	const [loading, setLoading] = useState(false)
	const [isAuthorized, setIsAuthorized] = useState(false)
	const [data, setData] = useState([])
	const [login, setLogin] = useState({})
	const [mediaInfo, setMediaInfo] = useState({})

	const onLogin = (loginData: UserData) => {
		setLogin(loginData)
	}

	const isUser = (params: Params) => {
		if (params.username === UsernameDB && params.password === PasswordDB) {
			setIsAuthorized(true)
			return true
		} else {
			return false
		}
	}

	useEffect(() => {
		isUser(login)
	}, [login, isAuthorized])

	useEffect(() => {
		getProfileAuth().then((result) => {
			getMediaCategories(result).then((result) => {
				setData(result?.data)
			})
		})

		getProfileAuth().then((result) => {
			getMediaInfo(result).then((result) => {
				setMediaInfo(result)
			})
		})

		setTimeout(() => {
			setLoading(true)
		}, 1500)
	}, [])

	return (
		<div className='App'>
			<LoginForm onLogin={onLogin} data={login} />
			{!loading ? (
				<>
					<SplashScreen />
				</>
			) : (
				<>
					<MainScreen
						moviesList={data}
						isAuthorized={isAuthorized}
						mediaInfo={mediaInfo}
					/>
				</>
			)}
		</div>
	)
}

export default App
