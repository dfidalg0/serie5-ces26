import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function Form(){
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (Number.isNaN(age)) {
            setError('A idade deve ser um número');
        }
        else if (age !== '' && age < 18) {
            setError('Você deve ter 18 anos ou mais para acessar');
        }
        else setError('');
    }, [age]);

    const sendForm = useCallback(async e => {
        e.preventDefault();
        try {
            if (!error) {
                const { data } = await axios.post('/send', { name, age });
                alert(data.message);
                setName('');
                setAge('');
            }
            else {
                alert('Formulário inválido');
            }
        }
        catch ({ response }) {
            alert(response.data.message);
        }
    }, [name, age, error]);

    return <form id="form" onSubmit={sendForm}>
        <input
            placeholder="Nome"
            type="text"
            className="form-field"
            value={name}
            onChange={e => setName(e.target.value)}
        />
        <input
            placeholder="Idade"
            type="number"
            className="form-field"
            style={{
                borderColor: error ? 'red' : undefined
            }}
            value={age}
            onChange={e => {
                const n = Number(e.target.value);
                if (n > 0) setAge(n);
                else if (n === 0) setAge('');
            }}
        />
        <span className="error-message">
            {error}
        </span>
        <input type="submit" value="Enviar"
            className="form-field"
        />
    </form>
}
