import React from 'react';
import Homew from '../components/Homew';
import Homem from '../components/Homem';
import Search from '../components/Search';

const Home = () => {
  return (
    <div>
      <div>
        <Search />
      </div>
      <Homew />
      <Homem />
    </div>
  );
};

export default Home;