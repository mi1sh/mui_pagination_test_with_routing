import { Container } from '@mui/material';
import {Routes, Route} from 'react-router-dom';

import HomePage from './HomePage';
import NotFound from './NotFound';
import About from './About';

function App() {

  return (
    <Container sx={{mathinTop: 5}} maxWidth="md">
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Container>
  );
};

export default App;
