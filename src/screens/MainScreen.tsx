import React, { useState, useEffect } from 'react'
import { Row, Col, Carousel, Image } from 'react-bootstrap'
import { MediaPlayer } from '../components/MediaPlayer'

interface MainScreenProps {
	moviesList: any
	isAuthorized: boolean
	mediaInfo: {
		ContentUrl?: string
	}
}

interface Movies {
	CategoryCode: string
	CategoryId: number
	CategoryName: string
}

const MainScreen: React.FC<MainScreenProps> = ({
	moviesList,
	isAuthorized,
	mediaInfo,
}) => {
	const [playVideo, setPlayVideo] = useState(false)

	const onMovieClick = () => {
		setPlayVideo(!playVideo)
	}

	useEffect(() => onMovieClick, [playVideo])

	return isAuthorized ? (
		<>
			Main screen - so many movies 📺
			<div>
				<Row>
					<Col sm={12} md={12} lg={12}>
						<Carousel pause='hover' className='bg-dark'>
							{moviesList.map((movie: Movies) => (
								<Carousel.Item key={movie.CategoryId}>
									<div onClick={onMovieClick}>
										<h2>{movie.CategoryName}</h2>
										<Image src='/images/movie-thumb.jpg' />
									</div>
								</Carousel.Item>
							))}
						</Carousel>
					</Col>
				</Row>
			</div>
			<MediaPlayer mediaInfo={mediaInfo} play={playVideo} />
		</>
	) : (
		<>Main screen - Movies 📺 Login first</>
	)
}

export default MainScreen
