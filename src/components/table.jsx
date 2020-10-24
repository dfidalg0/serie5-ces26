import axios from 'axios';
import { useState } from 'react';

export default function Table(){
    const [table, setTable] = useState([]);

    async function fetch(){
        try {
            const { data } = await axios.get('/data');
            setTable(data);
        }
        catch(err){
            alert('Erro ao buscar dados');
        }
    }

    return <div>
        <button onClick={fetch} className="form-field">
            Buscar dados
        </button>
        { table.length ?
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Idade</th>
                </tr>
            </thead>
            <tbody>
                {table.map((d, i) => <tr key={i}>
                    <td>{d.name}</td>
                    <td>{d.age}</td>
                </tr>)}
            </tbody>
        </table> : null}
    </div>
}
