import styled from 'styled-components'
import './App.css';
import MainScreen from './screens/MainScreen';

const Container = styled.div`
  width: 1200px;
  height: 700px;
  background: #FBFBFB;
`;

function App() {
  return (
    <div className="App">
      <Container>
        <MainScreen />
      </Container>
    </div>
  );
}

export default App;
