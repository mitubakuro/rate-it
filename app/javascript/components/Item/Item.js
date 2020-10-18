import React,{useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import Header from './Header'
import styled from 'styled-components'
import ReviewForm from './ReviewForm'
import Review from './Review'

const Wrapper= styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

const Column= styled.div`
  background: #fff; 
  ${'' /* max-width: 50%; */}
  ${'' /* width: 50%; */}
  float: left; 
  height: 100vh;
  overflow-x: scroll;
  overflow-y: scroll; 
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  &:last-child {
    background: black;
    border-top: 1px solid rgba(255,255,255,0.5);
  }
`


const Main= styled.div`
  ${'' /* padding-left: 70px; */}
`

const Item =(props)=>{
  const [item, setItem]=useState({})
  const [review, setReview]=useState({})
  const [loaded, setLoaded]=useState(false)

  useEffect(()=>{
    const slug = props.match.params.slug
    const url = `/api/v1/items/${slug}`

    axios.get(url)
    .then(resp=> {
      setItem(resp.data)
      setLoaded(true)
    })
    .catch(resp=>console.log(resp))

  }, [])

  const handleChange=(e)=>{
    e.preventDefault()

    setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))
    console.log('review:', review)
  }
  const handleSubmit=(e)=>{
    e.preventDefault()

    const csrfToken= document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN']= csrfToken

    const item_id =parseInt(item.data.id)
    axios.post('/api/v1/reviews', {review, item_id})
    .then(resp=>{
      // スプレッド構文でresp.data.dataをコピーする
      const included=[...item.included, resp.data.data]
      setItem({...item, included})
      setReview({title: '', description: '', score: 0})
    })
    .catch(resp=>{})
  }

  const setRating=(score, e)=>{
    e.preventDefault

    setReview({...review, score})
  }

  let reviews
  if(loaded && item.included){
    reviews = item.included.map((box, index)=>{
      
      return(
        <Review
          key={index}
          attributes={box.attributes}
        />
      )
    })
  }


  return (
    <Wrapper>
      {loaded &&
      <>
        <Column>
          <Main>
              <Header
                attributes={item.data.attributes}
                reviews={item.included}
              />
          </Main> 
          {reviews}
        </Column>
        <Column>
          <ReviewForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setRating={setRating}
            attributes={item.data.attributes}
            review={review}
          />
        </Column>
      </>
      }
    </Wrapper>
  )
}

export default Item