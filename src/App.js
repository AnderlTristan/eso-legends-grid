import React, { useState, useRef, useCallback } from 'react'
// components
import { Card } from './components/Card'
import { Loader } from './components/Loader';
// hooks
import useFetch from './hooks/useFetch'
// css
import styled from 'styled-components';
import './App.css';

const App = () => {
	const [query, setQuery] = useState('');
	const [pageNumber, setPageNumber] = useState(1);
 
	// destructure variables returned from data fetch hook
	// useFetch(<query param>, <page number>, <request limit>)
	const { loading, error, cards, hasMore } = useFetch(query, pageNumber, 20);

	// Setting up hook for intersection observer which will let React know when we've scrolled to the last currently rendered element
	const observer = useRef();
	const lastCardElement = useCallback(node => {
		if(loading) return; 
		// update observer with new element
		if(observer.current) observer.current.disconnect();
		// set observe reference to the last currenlty rendered element (moving to next page of API)
		observer.current = new IntersectionObserver(entries => {
			if(entries[0].isIntersecting && hasMore) {
				setPageNumber(prevPageNumber => prevPageNumber + 1);
			}
		})
		if(node) observer.current.observe(node);
	}, [loading, hasMore]);

	// handling input query
	function handleSearch(e) {
		setQuery(e.target.value);
		setPageNumber(1);
	}
	
	return (
		<div className="App">
			<div className="textInput">
				<label className="textInput__label">Search for card</label>
				<input className="textInput__input" type="text" onChange={handleSearch} value={query} placeholder="Card name"></input>
			</div>
			<CardContainer>
				{cards.map((card, index) => {
					// check if current index is last index of most recent query
					// if last index, set ref attribute to use in useCallback hook
					if(cards.length === index + 1) {
						return (
							// wrap Card components in divs so that ref attribute can be used
							<div ref={lastCardElement} key={index}>
								<Card 
									name={card.name}
									type={card.type}
									imageUrl={card.imageUrl}
									setName={card.set.name}
									text={card.text}
								/>
							</div>
						)
					// if not last index, render component normally
					} else {
						return (
							<div key={index}>
								<Card 
									name={card.name}
									type={card.type}
									imageUrl={card.imageUrl}
									setName={card.set.name}
									text={card.text}
								/>
							</div>
						)
					}
				})}
				<div>{loading && <Loader/>}</div>
				<div>{error && 'Error...'}</div>
			</CardContainer>
		</div>
	);
};

const CardContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	background: #e0e5eb;
	padding: 3% 0;
	position: relative;
	z-index: 5;
`;

export default App;

