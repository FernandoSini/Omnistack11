import React from 'react'


//sempre colocar {} para injetar uma variavel ou função dentro do html, pode usar o atributo title com props ou o children para as propiedade
export default function Header({ children }){
    return(
        <header>
            <h1>{children}</h1>
        </header>
    )
}