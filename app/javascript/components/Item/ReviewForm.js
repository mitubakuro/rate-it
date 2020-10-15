import React from 'react'

const ReviewForm=(props)=>{
  return(
  <div className="wrapper">
    <form onSubmit={props.handleSubmit}>
      <div>{props.attributes.name}について知っていることをレビューしましょう！</div>
      <div className="field">
        <input onChange={props.handleChange} value={props.review.title} type="text" name="title" placeholder="タイトル"/>
      </div>
      <div className="field">
        <input onChange={props.handleChange} value={props.review.description}type="text" name="description" placeholder="レビュー内容"/>
      </div>
      <div className="field">
        <div className="rating-container">
          <div className="rating-title-text">評価してください！</div>
          [Star Rating Goes Here]
        </div>
      </div>
      <button type="submit">送信</button>
    </form>
  </div>
  )
}

export default ReviewForm