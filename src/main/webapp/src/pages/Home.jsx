import React, { useState } from 'react';
import Homew from '../components/Homew';
import Homem from '../components/Homem';
import Search from '../components/Search';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const onSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div>
      <Search searchTerm={searchTerm} onSearch={onSearch}/>
      <Homew searchTerm={searchTerm}/>
      <Homem searchTerm={searchTerm}/>
    </div>
  );
};

export default Home;