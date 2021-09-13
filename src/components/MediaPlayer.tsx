import ReactPlayer from 'react-player'

type MediaInfo = {
	mediaInfo: {
		ContentUrl?: string
	}
	play: boolean
}
export const MediaPlayer: React.FC<MediaInfo> = ({ mediaInfo, play }) => {
	return (
		<>
			<ReactPlayer
				className='media-player'
				controls
				url={mediaInfo.ContentUrl}
				playing={play}
			/>
		</>
	)
}
