import React from "react"

export default function Card(props) {
    const { coverImg, stats, location, title, price, openSpots } = props.element

    let badgeText
    if (openSpots === 0) {
        badgeText = 'SOLD OUT'
    }else if (location === 'Online') {
        badgeText ='ONLINE'
    }

    return (
        <div className="card">
            {badgeText && <div className="card--badge">{badgeText}</div>}
            <img src={`../images/${coverImg}`} className="card--image" />
            <div className="card--stats">
            <img src="../images/star.png" className="card--star" />
                <span>{stats.rating}</span>
                <span className="gray">({stats.reviewCount}) .</span>
                <span className="gray">{location}</span>
            </div>
            <p className="card--title">{title}</p>
            <div>
                <p className="card--price"><span className="bold">From ${price}</span>/ person</p>
            </div>
        </div>
    )
}