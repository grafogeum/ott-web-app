import Spinner from 'react-bootstrap/Spinner'

const SplashScreen = () => {
	return (
		<>
			<h2>Hello I'm Spalsh screen</h2>
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		</>
	)
}

export default SplashScreen
