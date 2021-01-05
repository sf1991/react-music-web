import React from 'react';
import routes from './router'
// import { Provider } from "react-redux";
// import store from "./store";

import HYMain from './pages/main';
console.log(HYMain)
function App() {
  return (
    // <Provider store={store}>
      <HYMain/>
    // </Provider>
  );
}

export default App;