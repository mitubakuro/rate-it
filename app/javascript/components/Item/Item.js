import React,{useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import Header from './Header'
import styled from 'styled-components'
import ReviewForm from './ReviewForm'

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
          <div className="reviews"></div>
        </Column>
        <Column>
          <ReviewForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
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