//services é a pasta dos arquivos que vão fazer alguma conexão com um serviço externo
import axios from 'axios'



const api = axios.create({
  baseURL: 'http://localhost:3333' ,
});

export default api;

