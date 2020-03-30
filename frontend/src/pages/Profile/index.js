import React, { useState, useEffect } from 'react'; // useEffect - disparar uma ação em alguma momento
import { Link, useHistory } from 'react-router-dom'; // Link que faz a pagina ter o comportamento de SPA - não recarrega toda a pagina
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css'
import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const history = useHistory()
    const [incidents, setIncidents] = useState([])

    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')

    //recebe 2 parametros - 1- qual função que vai ser chamada - 2 quando essa função sera executada,
    //2-definido por um array - se deixar vazio vai executar apenas umas vez
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data)
        })

    }, [ongId])

    async function handleDeleteIncident(id) {

        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (error) {
            alert('Erro ao tentar deletar, tente novamente.')
        }

    }

    function handleLogout() {
        localStorage.clear() // limpa
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem Vinda, {ongName}</span>

                <Link className="button" to='/incident/new'>Cadastrar novo caso</Link>

                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color='#E02041'></FiPower>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {
                    incidents.map(incident => (
                        //precisa usar o key para apagar
                        <li key={incident.id}>
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO:</strong>
                            <p>{incident.description}</p>

                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                            <button onClick={() => handleDeleteIncident(incident.id)} type='button'>
                                <FiTrash2 size={20} color='#a8a8b3'></FiTrash2>
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}