import React from 'react';

import './global.css'
import Routes from './routes'

//componente é uma função que retorna html
//propriedade: title é uma propriedade do header,  ele vai como parametro da função header
//estado: informação que vai ser mantida/armazenada pelo componente
//imutabilidade: nunca podemos manipular o valor do estado de forma direta, tem que ser sobreposto o valor da variavel do estado

/**exemplo de contador 
 * let [counter, setCounter] = useState(0); // useState retorna um array com 2 posicoes : Array [valor, função]

  function increment() {
    setCounter(counter + 1)
    console.log(counter)
  }

  return (
    <div>
      <Header>Contador: {counter} </Header>
      <button onClick={increment}>Incrementar</button>
    </div>
  ); */

function App() {
 return(
   <Routes />
 )

}

export default App;
