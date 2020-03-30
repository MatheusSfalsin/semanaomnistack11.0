import React, { useState } from 'react';
import { Link, useHistory} from 'react-router-dom'; // Link que faz a pagina ter o comportamento de SPA - não recarrega toda a pagina
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';


import './styles.css'
import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId')
    const history = useHistory() 


    async function handleNewIncident(e){
        e.preventDefault() // previnir comportamento padrão de recarregamento de pagina
        const data ={
            title,
            description,
            value,
        }

        try {
            await api.post('incidents',data,{
                headers: {
                    Authorization: ongId 
                }
            })

            history.push('/profile')
        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente')
        }

    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um Herói para resolver isso.</p>

                    <Link className='back-link' to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                    Voltar para home
                </Link>
                </section>
                <form>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder='Titulo do caso' />
                    <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder='Descrição'></textarea>

                    <input value={value} onChange={e => setValue(e.target.value)} placeholder='Valor em reais' />
                    <button className="button" onClick={handleNewIncident} type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    )

}