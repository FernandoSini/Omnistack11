
import React, { useEffect, useState } from 'react' //useEffect dispara uma função em algum determinado elemento do componente

import logoImg from '../../assets/logo.svg'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import './styles.css'
import api from '../services/api'


export default function Profile() {
    const [incidents, setIncidents] = useState([])
    const history = useHistory()

    //buscando o nome da ong pra jogar no cabeçalho
    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')

    //listando os casos
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(res => {
            //os dados dessa resposta serão armazenadas dentro do estado
            setIncidents(res.data)
        })
    }, [ongId]) //todas as vezes que tiver uma  informação da variavel ongName mudasse dentro desse array  os valores seriam mudados pela arrow function dento do use effect, se estiver vazio  isso ocorrerá uma vez


    async function handleDeleteIncident(id) { // função para deletar incidente
        try {
            await api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (err) {
            alert('Erro, Tente novamente')
            console.log(err)
        }

        
    }
    //função para deslogar
        function handleLogout(){
            localStorage.clear()//removendo os dados do localstorage

            history.push('/')
        }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vindo(a), {ongName}</span>

                <Link className="button" to="/incidents/new"> Cadastrar novo caso  </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>
            <h1>Casos cadastrados </h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição </strong>
                        <p>{incident.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )

    //na parte do incidents.map vai mostrar uma lista de incidentes, () evita o uso de chaves e return
    //o key vai no li porque ajuda o react encontrar qual item é qual, então ele procura pelo id
} 