import React from 'react'

const Card = ({heading, number}) => {
  return (
    <div class="card text-white bg-dark mb-3 mt-5">
        <div style={{fontWeight:'bold'}} class="card-header">{heading}</div>
        <div class="card-body">
            <h5 class="card-title">{number}</h5>
            {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
        </div>
    </div>
  )
}

export default Card