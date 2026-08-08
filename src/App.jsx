import { Routes, Route } from 'react-router';
import AppLayout from '@/layouts/AppLayout';
import Home from '@/pages/Home';
import Items from '@/pages/Items';
import Moves from '@/pages/Moves';
import Map from '@/pages/Map';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="items" element={<Items />} />
        <Route path="moves" element={<Moves />} />
        <Route path="map" element={<Map />} />
      </Route>
    </Routes>
  );
}

export default App;
