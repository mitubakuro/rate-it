import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import Grid from './Grid'
import styled from 'styled-components'

const Home =styled.div`
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
`
const Header =styled.div`
  padding: 100px 100px 10px 100px;
  h1{
    font-size: 42px;
  }
`

const Subheader =styled.div`
  font-weight:200;
  font-size: 26px
`

const Grids =styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding: 20px;
`

const Items =()=>{
  const [items, setItems]=useState([])
  
  useEffect(()=>{
    // APIからItemsを取得する
    // stateのitemsを更新する
    axios.get('/api/v1/items.json')
    .then(resp=>{
      setItems(resp.data.data)
    })
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