import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import api from "./services/api";

function App() {
  const [ input, setInput ] = useState("")
  const [ response, setResponse ] = useState({})
 
  const handleSearch = async () => {
    if(input == "") return alert("Preencha algum CEP!")

    try {
      const call = await api.get(`${input}/json`)

      if(!call.data.cep) {
        alert("CEP NÃO ENCONTRADO!")
        return setInput("") 
      }

      setResponse(call.data)
      setInput("")
    } catch {
      alert("ERRO AO BUSCAR!")
      setInput("")
    }
  }

  return (
    <div className="App">
      <div className="bg-slate-900 w-screen h-screen flex flex-col justify-center items-center">
        <h1 className="text-white font-semibold">Buscador de CEP</h1>

        <div className="mt-5 flex justify-center p-4 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500">
          <input className="bg-transparent text-white outline-none mr-2 w-full" type="text" placeholder="CEP" value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={handleSearch}>
            <FiSearch size={25} color="#fff" />
          </button>
        </div>

        {
          response.cep && (
            <div className="mt-2 p-2 flex flex-col justify-center items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              <span className="font-medium">CEP: {response.cep}</span>
              <span>{response.logradouro}</span>
              <span>Complemento: {response.complemento}</span>
              <span>Bairro: {response.bairro}</span>
              <span>Cidade: {response.localidade} - {response.uf}</span>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;