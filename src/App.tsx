import Navigation from '@navigation/Navigation';
import {store} from '@store/store';
import React, {FC} from 'react';
import {Provider} from 'react-redux';

const App: FC = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
