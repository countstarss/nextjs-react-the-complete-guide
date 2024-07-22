import './App.css';
import { Routes, Route } from 'react-router-dom';
import AllMeetups from './pages/AllMeetups';
import Favourites from './pages/Favourite';  // 修正拼写错误
import NewMeetup from './pages/NewMeetups';  // 修正拼写错误
import Layout from './components/layout/layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<AllMeetups />}  />
        <Route path='/new-meetup' element={<NewMeetup />} />
        <Route path='/favourites' element={<Favourites />} />  // 修正拼写错误
      </Routes>
    </Layout>
  );
}

export default App;