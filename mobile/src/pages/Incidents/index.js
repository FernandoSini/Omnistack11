import React, { useEffect, useState } from 'react'; //use effect é uma função que vai ser disparadas quando as variaveis do array mudar
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import logoImg from '../../assets/logo.png'
import styles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

export default function Incidents() {
  //no flatlist o data vai receber um array de dados, renderitem é uma função que vai renderizar os items, key extractor vai pegar os incidentes e retornar a informação dos incidentes,showsVerticalScrollIndicator={false} tira a barra de scroll
  const navigation = useNavigation() //mesma coisa do use history
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0) //total de casos é um estado que vai mostrar o total de itens
  const [page, setPage] = useState(1)//controlando a pagina na qual estou no momento
  const [loading, setLoading] = useState(false) //armazenar a informação quando buscar dados novos e evitar buscá-los de novo

  //função que irá navegar para a tela de detalhes
  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident })
  }

  async function loadIncidents() {
    if (loading) { //se estiver carregando, evite que outra requisição seje feita, não tente fazer otra requisição
      return;
    }
    if (total > 0 && incidents.length === total) { //se o total de registros ja estiver carregado
      return; //se o total>0 significa que ja carregou a primeira pagina, e o numero de incidentes for = ao total
    }
    setLoading(true);
    const res = await api.get('incidents', { 
      params: { page } }) //enviando o numero da pagina para api

    setIncidents([...incidents, ...res.data]) // anexando os novos valores da api, copiando os valores de incidents e de response.datas, 
    //o onEndReached significa que quando chegar ao final da pagina ele vai disparar a função que carrega os dados
    //e o endReachedTreshold significa a quantidade ( em porcentagem) da tela que falta e ja dispara o onEndReached
    setTotal(res.headers['x-total-count'])
    setPage(page + 1) //pula para a proxima pagina
    setLoading(false);
  }
  useEffect(() => {
    loadIncidents()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo para ajudar.</Text>

      <FlatList
        data={incidents}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={true}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>Caso:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>Valor:</Text>
            <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(incident.value)}</Text>
            <TouchableOpacity style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >

              <Text style={styles.detailsButtonText}> Ver mais detalhes</Text>
              <Icon name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />


    </View>
  );
};

