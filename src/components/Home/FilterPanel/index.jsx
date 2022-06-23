import React from 'react';
import {categoryList, ratingList} from '../../../constants';
import CheckboxProton from '../../common/CheckboxProton';
import FilterListToggle from '../../common/FilterListToggle';
import SliderProton from '../../common/SliderProton';
import './styles.css';

const FilterPanel = ({
    selectedCategory, 
    selectToggle, 
    selectedRating, 
    selectRating, 
    cusines,
    changeChecked,
    selectedPrice,
    changedPrice
}) => {
  return (
      <div>
          {/* Category */}
          <div className="input-group">
              <p className="label">Category</p>
              <FilterListToggle options={categoryList} value={selectedCategory} selectToggle={selectToggle} />
          </div>

          {/* Cusines */}
          <div className="input-group">
              <p className="label">Cuisines</p>
              {cusines.map((cuisine) => <CheckboxProton 
              key={cuisine.id} 
              cuisine={cuisine} 
              changeChecked={changeChecked}/>)}
          </div>

          {/* Price Range */}
          <div className="input-group">
              <p className="label-range">Price</p>
              <SliderProton value={selectedPrice} changedPrice={changedPrice}/>
          </div>
          {/* ratings */}
          <div className="input-group">
              <p className="label">Star Rating</p>
              {/* <FilterListToggle options={ratingList} value={selectedRating} selectRating={selectRating} /> */}
              <FilterListToggle
                options={ratingList}
                value={selectedRating}
                selectToggle={selectRating}
              />
          </div>
      </div>
  )
}

export default FilterPanel