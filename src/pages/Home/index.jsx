import React, { useEffect, useState } from 'react';
import FilterPanel from '../../components/Home/FilterPanel';
import List from '../../components/Home/List';
import SearchBar from '../../components/Home/SearchBar';
import { dataList } from '../../constants';
import EmptyView from '../../components/common/EmptyView';
import './styles.css';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating ] = useState(null);
  const [cusines, selectCusines] = useState([
    {
      id: 1,
      checked: false,
      label: 'Americian'
    },
    {
      id: 2,
      checked: false,
      label: 'Chinese'
    },
    {
      id: 3,
      checked: false,
      label: 'Italian'
    }
  ]);
  const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);
  const [list, setList] = useState(dataList);
  const [searchInput, setSearchInput] = useState('');
  const [resultFound, setResultFound] = useState(false);

  const handleSelectCategory =(event, value) => 
      !value ? null: setSelectedCategory(value);

  const handleSelectRating = (event, value) => 
  !value ? null : setSelectedRating(value); 

  const handleChangeChecked = id=>{
    const cuisinesStateList= cusines;
    const changeCheckedCuisines = cuisinesStateList.map((item)=>
      item.id === id ? {...item, checked: !item.checked} : item
    );
    selectCusines(changeCheckedCuisines);
  }

  const handleChangedPrice = (event, value) => setSelectedPrice(value);
  
  const applyFilters = () => {
    let updatedList = dataList;

    //Rating Filter
    if(selectedRating) {
      updatedList = updatedList.filter(
        (item) => parseInt(item.rating) === parseInt(selectedRating)
      );
    }

    //Category Filter
    if(selectedCategory) {
      updatedList = updatedList.filter(
        (item) => item.category === selectedCategory
      )
    }

    //Cuisine Filter
    //['Americian', 'Chinese']
    const cuisineChecked = cusines.filter(item => item.checked).map(item =>item.label.toLowerCase());

    if(cuisineChecked.length) {
      updatedList = updatedList.filter((item)=>cuisineChecked.includes(item.cuisine))
    }

    //Price Filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];
    updatedList = updatedList.filter(
      (item)=>item.price>=minPrice && item.price<=maxPrice
    )
    
    //Search Filter
    // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item.title.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }

    !updatedList.length ? setResultFound(false) : setResultFound(true);

    setList(updatedList);
  }
  useEffect(()=>{
    applyFilters();
  },[selectedRating, selectedCategory, cusines, selectedPrice, searchInput])
  return (
      <div className='home'>
        {/* Search Bar */}
        <SearchBar value={searchInput}
        changeInput={(e) => setSearchInput(e.target.value)} />
        <div className="home-panellist-wrap">
            <div className="home-panel-wrap">
                {/* Side Panels */}
                <FilterPanel  selectedCategory={selectedCategory} selectToggle={handleSelectCategory} 
                selectedRating={selectedRating} selectRating={handleSelectRating}
                cusines={cusines} changeChecked={handleChangeChecked}
                selectedPrice={selectedPrice} changedPrice={handleChangedPrice}/>
            </div>
            <div className="home-list-wrap">
                {/* List & Empty View */}
                {resultFound ? <List list={list}/> : <EmptyView /> }
            </div>
        </div>
    </div>

  )
}

export default Home;