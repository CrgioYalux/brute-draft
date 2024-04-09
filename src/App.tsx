import './App.css';
import { Grid, Row, Cell, DatePicker, TimePicker, DateTimePicker, Switcher, GenericRadioInputList, } from './components/';

import { useState } from 'react';
import { useTheme } from './providers/Theme';

const options: Variant[] = ['initial', 'warning', 'error', 'success'];

type Object = { x: Variant; y: number };
const objects: Object[] = [
  { x: 'initial', y: 1},
  { x: 'initial', y: 2},
  { x: 'initial', y: 3},
  { x: 'initial', y: 4},
];

function App() {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [dateTime, setDateTime] = useState<string>('');
  const [, switchTheme] = useTheme();
  const [optionChecked, setOptionChecked] = useState<Variant>(options[0]);
  const [objectChecked, setObjectChecked] = useState<Object>(objects[0]);

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
      <DatePicker date={date} setDate={setDate} defaultValueToCurrentDate />
      <TimePicker time={time} setTime={setTime} defaultValueToCurrentTime />
      <DateTimePicker variant='warning' dateTime={dateTime} setDateTime={setDateTime} defaultValueToCurrentDateTime />
      {date}
      <button onClick={switchTheme}> switch theme </button>
      <Switcher 
      variant={optionChecked}
      options={options}
      optionChecked={optionChecked}
      setOptionChecked={setOptionChecked}
      />
      <GenericRadioInputList 
      variant={optionChecked}
      list={options}
      select={(item) => setOptionChecked(prev => item === null ? prev : item)}
      selected={optionChecked}
      />
      <GenericRadioInputList
      list={objects}
      select={(item) => setObjectChecked(prev => item === null ? prev : item)}
      selected={objectChecked}
      renderItemAs={(item) => <span className='text-white dark:text-black'>{item.y}</span>}
      checkOnProp={'y'}
      />
    </div>
  );
}

export default App;
