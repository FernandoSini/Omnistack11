import React from 'react';
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import styles from './styles'
import logoImg from '../../assets/logo.png'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation, useRoute } from '@react-navigation/native'
import email from 'react-native-email'



export default function Detail() {
  //Dentro de uma mesma tag vc usa um array para fazer duas estilizações ou mais como no  styles.incidentProperty
  const navigation = useNavigation();

  const route = useRoute()

  const incident = route.params.incident 
  const message = `Olá, ${incident.name}, estou entrndo em contato para pedir sua ajuda pro caso da "${incident.title}". Com o valor de ${Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(incident.value)}`
  //função que fara a volta para a tela anterior
  function navigateBack() {
    navigation.goBack();
  }

  //função para abrir whatsapp e email
  async function sendEmail() {

    const to = [incident.email] // string or array of email addresses
    await email(to, {
      // Optional additional arguments
      cc: ['', ''], // string or array of email addresses
      bcc: '', // string or array of email addresses
      subject: `Heroi do caso: ${incident.title}`,
      body: `${message}`
    }).catch(console.error)
  }



  async function sendWhatsApp() {
    await Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity onPress={navigateBack} >
          <Icon name="arrow-left" size={16} color="#e02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name} de {incident.city} / {incident.uf}</Text>

        <Text style={styles.incidentProperty}>Caso:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>Valor:</Text>
        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(incident.value)}</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o Dia!</Text>
        <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendEmail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
