import { Configuration, OpenAIApi } from 'openai'
import { useState } from 'react'
import { useFilm } from '../../context/film-context'
import Loading from '../loading'
import './index.css'

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPEN_AI_KEY,
})
const openai = new OpenAIApi(configuration)

const FilmReview = ({ title }) => {
  const { FilmReview, setFilmReview } = useFilm()
  const [isLoading, setIsLoading] = useState(false)
  const reviewByGPT = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        setIsLoading(true)
        const response = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: `Imagine you are a film critic, review the movie: ${title}, if you don't know the movie, give me some background information`,
          max_tokens: 1000,
          temperature: 0.8,
        })

        const answer = response.data.choices[0].text.trim()
        setFilmReview(answer)
        setIsLoading(false)
        resolve(answer)
      } catch (err) {
        console.log(err)
        reject('Failed to fetch answer from OpenAI API')
      }
    })
  }
  return (
    <div className="film-review">
      <button className="netflix-button" onClick={reviewByGPT}>
        Review By GPT
      </button>
      {isLoading && <Loading />}
      <div>{FilmReview}</div>
    </div>
  )
}

export default FilmReview
