import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Card } from '../Card';

afterEach(() => {
    cleanup();
});

test('should render card component', () => {
    const cardProps = {
        "name": "Adoring Fan",
        "set": {
            "name": "Core Set",
        },
        "text": "Prophecy, Guard. Last Gasp: Adoring Fan will return. Adoring Fan is immune to Silence.",
        "imageUrl": "https://images.elderscrollslegends.io/cs/adoring_fan.png",
        "type": "Creature"
    }

    render(
        <Card 
            name={cardProps.name} 
            imageUrl={cardProps.imageUrl}
            type={cardProps.type}
            setName={cardProps.set.name}
            text={cardProps.text} 
        />
    );

    const cardElement = screen.getByTestId('card');
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveTextContent("Adoring Fan");  
});

test('matches snapshot', () => {
    const cardProps = {
        "name": "Adoring Fan",
        "set": {
            "name": "Core Set",
        },
        "text": "Prophecy, Guard. Last Gasp: Adoring Fan will return. Adoring Fan is immune to Silence.",
        "imageUrl": "https://images.elderscrollslegends.io/cs/adoring_fan.png",
        "type": "Creature"
    };

    const tree = renderer.create(        
        <Card 
            name={cardProps.name} 
            imageUrl={cardProps.imageUrl}
            type={cardProps.type}
            setName={cardProps.set.name}
            text={cardProps.text} 
        />
    );
    
    expect(tree).toMatchSnapshot();
});