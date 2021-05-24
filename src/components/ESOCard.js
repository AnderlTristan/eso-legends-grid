import React from 'react'
import styled from 'styled-components'

export const ESOCard = ({card}) => {
    if(!card.health) card.health = 0;
    if(!card.cost) card.cost = 0;
    if(!card.power) card.power = 0;

    return (
        <StyledCard className="ESOCard" data-testid="ESOCard">
            <div className="ESOCard__image"><img src={card.imageUrl} alt={card.name}/></div>
            <h2 className="ESOCard__name">{card.name}</h2>
            <span className="ESOCard__type">{card.type}</span>
            <div className="ESOCard__attribute-container">
                {card.attributes.map(attribute => (
                    <span className="ESOCard__attribute">{attribute}</span>
                ))}
            </div>
            <span className="ESOCard__cost"><b>Cost:</b> {card.cost}</span>
            <span className="ESOCard__health"><b>Health:</b> {card.health}</span>
            <span className="ESOCard__power"><b>Power:</b> {card.power}</span>
            <span className="ESOCard__setName">{card.setName}</span>
            <em className="ESOCard__text">{card.text}</em>
        </StyledCard>
    )
}

const StyledCard = styled.div`
    max-width: 250px;
    height: auto;
    min-height: 680px;
    padding: 15px;
    margin-top: 40px;
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background: #e0e5eb;
    color: #222;
    box-shadow: 17px 17px 27px #acb0b5, -17px -17px 27px #ffffff;
    text-align: left;

    .ESOCard__image {
        width: 250px;
        align-self: center;
    }

    .ESOCard__type {
        padding: 2px 5px;
        background: #333;
        color: #fff;
        border-radius: 10px;
        margin-bottom: 5px;
        width: fit-content;
    }

    .ESOCard__name {
        margin: 5px 0;
        font-family: 'Georgia', serif;
    }

    .ESOCard__image img {
        width: 100%;
    }

    .ESOCard__attribute-container {
        margin: 5px 0;
    }

    .ESOCard__attribute {
        display: inline-block;
        margin-right: 3px;
        padding: 3px 8px;
        border-radius: 10px;
        background: #418fe8;
        color: #fff;
    }

    .ESOCard__text {
        margin-top: 5px;
    }
`;