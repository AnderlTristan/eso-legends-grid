import React, { useState, useRef, useCallback } from 'react'
// components
import { ESOCard } from './components/ESOCard'
import { Loader } from './components/Loader';
// hooks
import useFetch from './hooks/useFetch'
// css
import styled from 'styled-components';
import './App.css';
// utility
import cardSort from './utility/cardSort';
// icons
import { FaSearch, FaFilter } from 'react-icons/fa'

const App = () => {
	const [query, setQuery] = useState('');
	const [pageNumber, setPageNumber] = useState(1);
	// default sort will be name ascending
	const [sortParam, setSortParam] = useState("DEFAULT");
 
	// destructure variables returned from data fetch hook
	// useFetch(<query param>, <page number>, <request limit>, <sort parameter>)
	const { loading, error, cards, hasMore } = useFetch(query, pageNumber, 20, sortParam);

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

	function handleSort(e) {
		setSortParam(e.target.value);
		cardSort(cards, sortParam);
	}

	function handleSearch(e) {
		setQuery(e.target.value);
		setPageNumber(1);
	}
	
	return (
		<div className="App">
			<StyledHeader>
				<StyledTextInputContainer>
					<input className="textInput__input" type="text" onChange={handleSearch} value={query} placeholder="Search by name">
					</input>
					<FaSearch className="textInput__icon"/>
				</StyledTextInputContainer>
				<StyledSelectContainer>
					<div class="selectContainer">
						<select className="selectContainer__select" onChange={handleSort} value={sortParam}>
							<option value="DEFAULT">Sort by</option>
							<option value="NAME_ASC">Name Ascending</option>
							<option value="NAME_DESC">Name Descending</option>
							<option value="COST_ASC">Cost (High to Low)</option>
							<option value="COST_DESC">Cost (Low to High)</option>
							<option value="HEALTH_ASC">Health (High to Low)</option>
							<option value="HEALTH_DESC">Health (Low to High)</option>
							<option value="POWER_ASC">Power (High to Low)</option>
							<option value="POWER_DESC">Power (Low to High)</option>
						</select>
						<FaFilter className="selectContainer__icon"/>
					</div>
				</StyledSelectContainer>
			</StyledHeader>
			<CardContainer data-testid="cardContainer">
				{cards.map((card, index) => {
					// check if current index is last index of most recent query
					// if last index, set ref attribute to use in useCallback hook
					if(cards.length === index + 1) {
						return (
							// wrap Card components in divs so that ref attribute can be used
							<div ref={lastCardElement} key={index}>
								<ESOCard card={card}/>
							</div>
						)
					// if not last index, render component normally
					} else {
						return (
							<div key={index}>
								<ESOCard card={card}/>
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

const StyledHeader = styled.div`
	display: flex;
	background: #333;
	text-align: center;
	padding: 20px;

	@media only screen and (max-width: 767px) {
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
`;

const StyledSelectContainer = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	padding-top: 0.75rem;
	padding-bottom: 1.25rem;
	color: #fff;
	position: relative;
	z-index: 1;
	justify-content: center;

	@media only screen and (max-width: 767px) {
		width: 187px;
		align-items: center;
		justify-content: center;
	}

	.selectContainer__icon {
		position: absolute;
		right: 10px;
		top: 25px;
	}

	.selectContainer__select {
		appearance: none;
		line-height: 1.5;
		font-weight: 400;
		color: #fff;
		background-color: rgba(255,255,255,0.05);
		border: 1px solid rgba(0, 0, 0, 0.12);
		border-radius: 0.25rem;
		padding: 0.5em 0.75em;
		transition: box-shadow 0.3s ease, border-color 0.3s ease;
		box-shadow: 17px 17px 27px #1a1a1a, -17px -17px 27px #2a2a2a;
		width: 187px;

		&:hover {
			border-color: #4a4a4a;
		}

		&:focus {
			outline: none;
			border: 1px solid rgba(0, 149, 255, 1);
			box-shadow: 0px 0px 1px 1px rgba(0, 149, 255, 1);
		}
	}
`;

const StyledTextInputContainer = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding-top: 0.75rem;
	padding-bottom: 1.25rem;
	color: #fff;
	position: relative;
	z-index: 1;

	@media only screen and (max-width: 767px) {
		width: fit-content;
	}
  
  .textInput__input {
	appearance: none;
	line-height: 1.5;
	font-weight: 400;
	color: #fff;
	background-color: rgba(255,255,255,0.05);
	border: 1px solid rgba(0, 0, 0, 0.12);
	border-radius: 0.25rem;
	padding: 0.5em 0.75em;
	transition: box-shadow 0.3s ease, border-color 0.3s ease;
	box-shadow: 17px 17px 27px #1a1a1a, -17px -17px 27px #2a2a2a;
  }

  .textInput__icon {
	  position: absolute;
	  left: 150px;
	  top: 25px;
  }
  
  .textInput__input::placeholder {
	color: #fff;
  }
  
  .textInput__input:hover {
	border-color: #4a4a4a;
  }
  
  .textInput__input:focus {
	outline: none;
	border: 1px solid rgba(0, 149, 255, 1);
	box-shadow: 0px 0px 1px 1px rgba(0, 149, 255, 1);
  }
`;

export default App;

