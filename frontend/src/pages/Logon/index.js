import React, { useState } from 'react'
import './styles.css'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../services/api'

export default function Logon() {
    const [id, setID] = useState('');
    const history = useHistory()

    //função que vai controlar o login
  async  function handleLogin(e) {
        e.preventDefault() //evita o redirect

        try {

            const res = await api.post('sessions', { id })
            //armazenar o id no localstorage porque vai precisar em toda a aplicação
            localStorage.setItem('ongId',id)
            localStorage.setItem('ongName',res.data.name)
            history.push('/profile')
        } catch{
            alert('Erro de login, tente novamente.')
        }


    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Heroe" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>

                    <input
                        placeholder="Seu ID"
                        value={id}
                        onChange={e => setID(e.target.value)}

                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}