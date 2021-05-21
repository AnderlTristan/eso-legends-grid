import React from 'react'
import styled from 'styled-components'

export const Card = ({name, text, type, setName, imageUrl}) => {
    return (
        <StyledCard className="card">
            <h2 className="card__title">{name}</h2>
            <div className="card__image"><img src={imageUrl}/></div>
            <div className="card__detail-wrapper">
                <div className="card__accent-left">{type}</div>
                <div className="card__accent-right">{setName}</div>
                <div className="card__description">{text}</div>
            </div>
        </StyledCard>
    )
}

const StyledCard = styled.div`
    max-width: 250px;
    height: auto;
    min-height: 600px;
    padding: 15px;
    margin-top: 40px;
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #e0e5eb;
    color: #222;
    box-shadow: 17px 17px 27px #acb0b5, -17px -17px 27px #ffffff;
    text-align: center;

    img {
        width: 90%;
        height: auto;
    }
    div {
        font-family: 'lato', sans-serif;
        display: block;
        margin: 5px auto;
    }

    .card__detail-wrapper {
        display: flex;
        flex-direction: row;
        text-align: center;
        flex-wrap: wrap;
        align-items: center;
        width: 100%;
    }
    .card__image {
        min-height: 375px;
    }
    .card__image {
        text-align: center;
    }
    .card__title {
        font-family: 'Cardo', serif;
        display: block;
        margin: 5px auto;
        text-transform: uppercase;
        width: 100%;
        min-height: 55px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .card__description {
        width: 100%;
        min-height: 90px;
    }
    .card__accent-right,
    .card__accent-left {
        font-family: 'Cardo', serif;
        width: calc(50% - 24px);
        border-radius: 15px;
        padding: 5px 0;
        background: linear-gradient(145deg, #caced4, #f0f5fb);
        box-shadow:  20px 20px 60px #bec3c8, -20px -20px 60px #ffffff;
        font-weight: bold;
        min-height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
`;