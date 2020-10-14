import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Header from './Header'

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

  return (
    <div className="warraper">
      <div className="column">
        {loaded &&
          <Header
            attributes={item.data.attributes}
            reviews={item.included}
          />
        }
        <div className="reviews"></div>
      </div>
      <div className="column">
        <div className="review-form">[レビューフォーム]</div>
      </div>

    </div>
  )
}

export default Item