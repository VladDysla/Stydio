import React from 'react'
import Tsykanova from '../assents/images/tsykanova.jpg'

export default function Comand() {
  return (
    <section className='comand-sec' id="comand">
      <div className="comand-container">
        <h2>Команда</h2>
        <div className="comand-cart__block">
          <div className="comand-cart">
            <div className="comand-cart_icon">
              <img src={Tsykanova} alt="" />
            </div>
            <p>Ірина Цуканова</p>
          </div>
        </div>
      </div>
    </section>
  )
}
