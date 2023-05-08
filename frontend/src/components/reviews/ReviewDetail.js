import React from "react";
export default function ReviewDetail({ review: data }) {

    const { review, stars, User, createdAt } = data;
    const year = createdAt.slice(0, 4)
    const month = createdAt.slice(5, 7)
    return (
        <div>
            <h4>{User.firstName}</h4>
            <span>{`${year} ${month} `}</span>
            <span>{`${stars} stars`}</span>
            <p>{review}</p>
        </div>



    )


}
