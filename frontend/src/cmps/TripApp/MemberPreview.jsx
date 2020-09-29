import React from 'react'
export function MembersPreview({ member }) {
    const url=member.imgUrl||'https://res.cloudinary.com/roidinary/image/upload/v1600790523/Untitled-1_xumtnf.jpg'
    return (
        <div className="member-preview" >
            <img className="image-preview" src={url} alt="img Preview"></img>
            <div className="is-active-circle"></div>
        </div>
    )
}