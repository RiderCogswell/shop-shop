// create a container to hold your global state(aka instantiate a new context object) and use it!
import React, { createContext, useContext } from "react";
import { useProductReducer } from "./reducers";

// create new context object
const StoreContext = createContext();
// provider is a special type of react component that we wrap our 
// application in so it can make ther state data available to all other components
const { Provider } = StoreContext;

// create custom provider function that will manage and update 
// our state using the reducer we created earlier
const StoreProvider = ({ value = [], ...props }) => {
  // because the useProductReducer wraps around the useReducer() hook from React, 
  // everytime we run it we will recieve a state = most up to date version of our global state obj
  // and a dispatch, which is the method used to update our state, specifically wit will look for an action obj passed in as an arg
  const [state, dispatch] = useProductReducer({
    products: [],
    categories: [],
    currentCategory: '',
  });
  // confirm it works
  console.log(state);
  // once given our state and dispatch we return the StoreContext's Provider component with our
  // state obj and dispatch provided as data for the value prop
  // the '...props' is there to handle any other props the user may need 
  // without ...props, nothing on the page would be rendered
  return <Provider value={[state, dispatch]} {...props} />;
};

// create a func that uses the useContext() hook to be used by the components that need the data our StoreProvider is providing 
// when we execute this in a component it will recieve the [state, dispatch] that our StoreProvider provider manages for us
const useStoreContext = () => {
  return useContext(StoreContext);
}

export { StoreProvider, useStoreContext };