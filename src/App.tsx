import './App.css';
import { Grid, Row, Cell } from './components/';

function App() {
  return (
    <div className='min-h-screen bg-gray-200 dark:bg-gray-900 grid place-items-center'>
      <div className='w-full flex justify-center'>
        <div className='flex-1 max-w-2xl'>
          <Grid>
            <Row>
              <Cell isleId={1}>A</Cell>
              <Cell isleId={1}>A</Cell>
              <Cell isleId={1}>A</Cell>
              <Cell isleId={1}>A</Cell>
            </Row>
            <Row>
              <Cell isleId={3}>C</Cell>
              <Cell isleId={2}>B</Cell>
              <Cell isleId={2}>B</Cell>
              <Cell isleId={2}>B</Cell>
            </Row>
            <Row>
              <Cell isleId={3}>C</Cell>
              <Cell isleId={3}>C</Cell>
              <Cell isleId={2}>B</Cell>
              <Cell isleId={2}>B</Cell>
            </Row>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default App;
