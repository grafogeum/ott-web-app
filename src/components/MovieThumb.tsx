import React from 'react'
// import Carousel from 'react-material-ui-carousel'
// import { Paper, Button } from '@material-ui/core'
import { Carousel, Image } from 'react-bootstrap'

interface MoviesProps {
	movies: {
		CategoryCode: string
		CategoryId: number
		CategoryName: string
	}
}

export const MovieThumb: React.FC<MoviesProps> = ({ movies }) => {
	return (
		<>
			<Carousel.Item key={movies.CategoryId}>
				<div className='movies'>{movies.CategoryName}</div>
			</Carousel.Item>
		</>
	)
}
