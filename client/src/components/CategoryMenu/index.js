import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { useStoreContext } from '../../utils/GlobalState';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {

  // const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  // const categories = categoryData?.categories || [];
  // same just using context

  const [state, dispatch] = useStoreContext();
  // we only need categories so we destructure it out of state
  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  // we need to get the data back from the query and set it as global state, 
    // useEffect is nice because it not only runs on component load, but also when the state changes in the component.
  useEffect(() => {
    // if category exists or has changed from the response of useQuery
    if (categoryData) {
      // execute our dispatch function with our action type, and the data to change our state
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      }); 
      // save each category to idb
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category)
      })
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    })
  }

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
