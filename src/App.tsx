import './App.css';
import { useTheme } from './providers/Theme/';
import { CheckboxList } from './components/';
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
      id: 0, name: 'red', selected: true, 
    },
      {
      id: 1, name: 'red', selected: true, 
    },
    {
      id: 2, name: 'green', selected: false, 
    },
  ]);

  return (
    <div className='min-h-screen bg-gray-200 dark:bg-gray-900'>
      <h1>Gallery</h1>
      <button onClick={switchTheme}>go {value.opposite}</button>

      <CheckboxList
      stateful
      htmlFor='color'
      list={colors}
      renderItemAs={(item) => {
        return (
          <div>{item.name}</div>  
        );
      }}
      select={setColors}
      selectUsing='selected'
      />
      <CheckboxList
      htmlFor='color'
      list={colors}
      renderItemAs={(item) => {
        return (
          <div>{item.name}</div>  
        );
      }}
      />
    </div>
  );
}

export default App;
