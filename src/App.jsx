import './App.css';
import Form from './components/form';
import AppBar from './components/app-bar';
import Table from './components/table';

export default function App() {
    return (
        <div id="app">
            <AppBar />
            <div id="main">
                <div>
                    <Form />
                    <Table />
                </div>
            </div>
        </div>
    );
}
