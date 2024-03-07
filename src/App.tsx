import './App.css';
import { useTheme } from './providers/Theme/';
import { TextInput, PasswordInput, Grid, Row, Cell, CheckboxList } from './components/';
import { useState } from 'react';

type Color = {
  id: number;
  name: string;
  selected: boolean;
};

function App() {
  const [value, switchTheme] = useTheme();
  const [colors, setColors] = useState<Color[]>([
    {
      id: 0, name: 'yellow', selected: true, 
    },
      {
      id: 1, name: 'red', selected: true, 
    },
    {
      id: 2, name: 'green', selected: false, 
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div className='min-h-screen bg-gray-200 dark:bg-gray-900'>
      <button onClick={switchTheme}>go {value.opposite}</button>
      <h1 className='text-4xl'>Gallery</h1>

      <div className='flex flex-col gap-4'>
        <CheckboxList
        htmlFor='color'
        list={colors}
        select={setColors}
        selectUsing='selected'
        onChange={(prev, curr, item) => console.log({prev, curr, item})}
        stateful
        />
        <CheckboxList
        classNames={{ overwriteContainer: 'flex bg-red-100 gap-4 w-max p-4' }}
        onChange={(prev, curr, item) => console.log({prev, curr, item})}
        htmlFor='color'
        list={colors}
        renderItemAs={(item) => {
          return (
            <div className='text-blue-500'>{item.name}</div>  
          );
        }}
        />
      </div>
      <Grid>
        <Row id={1}>
          <Cell id={1} isleId={1}>this</Cell>
          <Cell id={2} isleId={1}>is</Cell>
          <Cell id={3} isleId={1}>an</Cell>
          <Cell id={4} isleId={1}>isle</Cell>
        </Row>
      </Grid>
      <TextInput text={input} setText={setInput} onlyLetters allowSpaces variant='success' />
      <PasswordInput 
      password={password}
      setPassword={setPassword}
      label='Password here:'
      variant={password.length === 0 ? 'error' : 'success'}
      classNames={{ input: 'transition' }}
      placeholder='very difficult password'
      />
    </div>
  );
}

export default App;
