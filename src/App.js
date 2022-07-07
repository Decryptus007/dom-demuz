
import AppUI from './components/AppUI/AppUI';

import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fab, fas, far)

function App() {
  return (
    <div className="App">
      <AppUI />
    </div>
  );
}

export default App;
