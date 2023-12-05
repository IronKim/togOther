import React from 'react';
import Main from './components/Main';
import { QueryClient, QueryClientProvider } from 'react-query';
import './css/default.css';

const queryClient = new QueryClient();

function App() {
  return (

    <QueryClientProvider client={ queryClient }>
      <div>
        <Main />
      </div>
    </QueryClientProvider>
  );
}

export default App;