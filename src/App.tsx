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
      id: 0, name: 'yellow', selected: true, 
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
      <button onClick={switchTheme}>go {value.opposite}</button>
      <h1 className='text-4xl'>Gallery</h1>

      <div className='flex flex-col gap-4'>
        <CheckboxList
        classNames={{ container: 'bg-' }}
        htmlFor='color'
        list={colors}
        select={setColors}
        selectUsing='selected'
        onChange={(prev, curr, item) => console.log({prev, curr, item})}
        stateful
        />
        <CheckboxList
        classNames={{ overwriteContainer: 'flex bg-red-400', overwriteItem: 'text-blue-300' }}
        onChange={(prev, curr, item) => console.log({prev, curr, item})}
        htmlFor='color'
        list={colors}
        renderItemAs={(item) => {
          return (
            <div>{item.name}</div>  
          );
        }}
        />
      </div>
    </div>
  );
}

export default App;
