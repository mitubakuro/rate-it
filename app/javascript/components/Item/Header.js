import React from 'react'
import styled from 'styled-components'
import Rating from '../Rating/Rating'

const Wrapper = styled.div`
  padding: 50px 100px 50px 0px;
  font-size:30px;
  img {
    margin-right: 10px;
    height: 60px;
    width: 60px;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 100%;
    margin-bottom: -8px;
  }
`

const UserReviewCount = styled.div`
  font-size: 18px;
  padding:10px 0;
`

const TotalOutOf = styled.div`
  padding-top: 12px;
  font-size: 18px;
  font-weight: bold;
`

const Header=(props)=>{
  const {name, image_url, avg_score} =props.attributes
  const total= props.reviews.length
  return(
    <Wrapper>
      <h1><img src={image_url} alt={name} />{name}</h1>
      <div>
        <UserReviewCount>{total} 人のレビューがあります</UserReviewCount>
        <Rating score={avg_score}/>
        <TotalOutOf>評価：{avg_score}点／５点 </TotalOutOf>
      </div>
    </Wrapper>
  )
}

export default Header