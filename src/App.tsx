import ReactPlayground from './ReactPlayground';
import './App.css'
import {PlaygroundProvider} from "./ReactPlayground/PlaygroundContext.tsx";

function App() {

    return (
        <PlaygroundProvider>
            <ReactPlayground/>
        </PlaygroundProvider>
    )
}

export default App

