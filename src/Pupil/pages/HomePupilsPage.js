import React from 'react'

// Components
import OrderedProducts from '../components/OrderedProducts/OrderedProducts'

const HomePupilsPage = () => {
    return (
        <div className="custom-page--wrapper">
        <h1 className="custom-page--title">Čekáš sovu s:</h1>
        <OrderedProducts />
      </div>
  
    )
}

export default HomePupilsPage
