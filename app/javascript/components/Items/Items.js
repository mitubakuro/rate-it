import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import Grid from './Grid'
import styled from 'styled-components'
import media from "styled-media-query";

const Home = styled.div`
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
`
const Header = styled.div`
  padding: 20px 100px 10px 100px;
  
  h1{
    font-size: 42px;
  }
`

const Subheader = styled.div`
  font-weight:200;
  font-size: 26px
`

const Grids = styled.div`
${media.greaterThan("large")`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding: 20px 0;
  `}

  ${media.between("medium", "large")`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding: 20px 0;
  `}

  ${media.lessThan("medium")`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding: 20px 0;
  `}
  
`

const Items =()=>{
  const [items, setItems]=useState([])
  
  useEffect(()=>{
    axios.get('/api/v1/items.json')
    .then(resp=>setItems(resp.data.data))
    .catch(resp=>console.log(resp))
  }, [items.length])

  const list = items.map(item=>{
    return (
      <Grid 
        key={item.attributes.name}
        attributes={item.attributes}
        />
    )
  })

  return (
    <Home>
      <Header>
        <h1>Rate It!</h1>
        <Subheader>いろんなレビューができます</Subheader>
      </Header>
      <Grids>
        {list}
      </Grids>
    </Home>
  )
}

export default Items