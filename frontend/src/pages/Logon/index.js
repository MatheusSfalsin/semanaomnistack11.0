import React, { useState } from 'react';
import { Link ,useHistory } from 'react-router-dom'; // Link que faz a pagina ter o comportamento de SPA - não recarrega toda a pagina
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import HeroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() { // Props são as propriedades chamadas qunado for usada
    const [id, setId] = useState('');


    const history = useHistory() // para navegação - redirecionamento

    async function handleLogin(e) {
        e.preventDefault() // previnir comportamento padrão de recarregamento de pagina



        try {
            const response = await api.post('sessions', { id })
            
            localStorage.setItem('ongId',id) // salvado global 
            localStorage.setItem('ongName',response.data.name)

            history.push('/profile') // manda para pagina inicial de logon

        } catch (error) {
            alert('Falha no Login, Tente novamente.')
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>

                    <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)} />
                    <button className='button' type='submit'>Entrar</button>

                    <Link className='back-link' to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho Cadastro
                    </Link>
                </form>
            </section>

            <img src={HeroesImg} alt="Heroes" />


        </div>
    );
}