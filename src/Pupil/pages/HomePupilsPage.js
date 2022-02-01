import React from 'react'

// Components
import UndeliveredProducts from '../components/UndeliveredProducts/UndeliveredProducts'
import DeliveredProducts from '../components/DeliveredProducts/DeliveredProducts'

const HomePupilsPage = () => {
    return (
        <div className="custom-page--wrapper">
        <h1 className="custom-page--title">Čekáš sovu s:</h1>
        <UndeliveredProducts />
        <h1 className="custom-page--title">Sova doručila:</h1>
        <DeliveredProducts />
      </div>
  
    )
}

export default HomePupilsPage
