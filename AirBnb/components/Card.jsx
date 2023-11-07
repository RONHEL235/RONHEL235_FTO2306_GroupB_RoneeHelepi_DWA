import React from "react"

export default function Card(props) {
    const { img, rating, reviewCount, location, title, price, openSpots } = props
    return (
        <div className="card">
            {openSpots === 0 && <div className="card--badge">SOLD OUT</div>}
            <img src={`../images/${img}`} className="card--image" />
            <div className="card--stats">
            <img src="../images/star.png" className="card--star" />
                <span>{rating}</span>
                <span className="gray">({reviewCount}) .</span>
                <span className="gray">{location}</span>
            </div>
            <p className="card--title">{title}</p>
            <div>
                <p className="card--price"><span className="bold">From ${price}</span>/ person</p>
            </div>
        </div>
    )
}