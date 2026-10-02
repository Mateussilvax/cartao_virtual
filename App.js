import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  Switch,
  Pressable,
  Modal,
  Alert,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [bio, setBio] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [novaBio, setNovaBio] = useState('');
  const [notificacoes, setNotificacoes] = useState(true);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    if (!notificacoes){
      setMensagem('');
      return;
    }

    const intervalo = setInterval(() => {
      const mensagens = [
        'Bom dia',
        'boa tarde',
        'boa noite',
        'boa semana',
        'bom fim de semana',
      ];

      const mensagemAleatoria =
        mensagens[Math.floor(Math.random() * mensagens.length)];

      setMensagem(mensagemAleatoria);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [notificacoes]);

  function abrirModal() {
    setNovaBio(bio);
    setModalVisivel(true);
  }

  function salvarBio() {
    setBio(novaBio);
    setModalVisivel(false);
  }

  function salvarDados() {
    Alert.alert('Ótimo', 'Bio salva com sucesso!');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        <Image
          source={require('./assets/avatar.jpeg')}
          style={styles.avatar}
        />

        <Text style={styles.nome}>
          Mateus Silva Xavier
        </Text>

        <View style={styles.secao}>
          <Text style={styles.titulo}>
            Bio
          </Text>

          <View style={styles.bioContainer}>
            <Text style={styles.bio}>
              {bio}
            </Text>
          </View>

          <Pressable
            style={styles.botaoEditar}
            onPress={abrirModal}
          >
            <Text style={styles.textoBotao}>
              Editar Bio
            </Text>
          </Pressable>
        </View>

        <View style={styles.secao}>
          <Text style={styles.titulo}>
            Configurações
          </Text>

          <View style={styles.configuracao}>
            <Text style={styles.textoConfiguracao}>
              Receber Notificações
            </Text>

            <Switch
              value={notificacoes}
              onValueChange={setNotificacoes}
            />
          </View>
        </View>

        <Pressable
          style={styles.botaoSalvar}
          onPress={salvarDados}
        >
          <Text style={styles.textoSalvar}>
            Salvar
          </Text>
        </Pressable>

        {/* NOTIFICAÇÃO */}
      </ScrollView>
        {mensagem !== '' && (
          <View style={styles.notificacao}>
            <Text style={styles.textoNotificacao}>
              {mensagem}
            </Text>
          </View>
        )}

      

      {/* MODAL */}

      <Modal
        visible={modalVisivel}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.fundoModal}>
          <View style={styles.modal}>

            <Text style={styles.tituloModal}>
              Editar Bio
            </Text>

            <TextInput
              style={styles.input}
              value={novaBio}
              onChangeText={setNovaBio}
              placeholder="Digite sua bio"
              multiline
            />

            <View style={styles.botoesModal}>

              <Pressable
                style={styles.botaoCancelar}
                onPress={() => setModalVisivel(false)}
              >
                <Text style={styles.textoBotao}>
                  Cancelar
                </Text>
              </Pressable>

              <Pressable
                style={styles.botaoConfirmar}
                onPress={salvarBio}
              >
                <Text style={styles.textoBotao}>
                  Salvar
                </Text>
              </Pressable>

            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  scroll: {
    padding: 20,
    alignItems: 'center',
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 10,
  },

  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },

  secao: {
    width: '100%',
    marginBottom: 20,
  },

  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  bioContainer: {
    width: '100%',
    minHeight: 70,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 6,
    padding: 10,
    justifyContent: 'center',
  },

  bio: {
    fontSize: 14,
    color: '#555555',
  },

  botaoEditar: {
    alignSelf: 'flex-start',
    backgroundColor: '#2764e7',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 8,
  },

  textoBotao: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  configuracao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    paddingVertical: 10,
  },

  textoConfiguracao: {
    fontSize: 14,
  },

  botaoSalvar: {
    width: '100%',
    backgroundColor: '#2764e7',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },

  textoSalvar: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  notificacao: {
  width: '100%',
  backgroundColor: '#222222',
  padding: 12,
  marginBottom: 10,
},

  textoNotificacao: {
    color: '#ffffff',
    textAlign: 'center',
  },

  fundoModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modal: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
  },

  tituloModal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 6,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
  },

  botoesModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
    gap: 10,
  },

  botaoCancelar: {
    backgroundColor: '#777777',
    padding: 10,
    borderRadius: 5,
  },

  botaoConfirmar: {
    backgroundColor: '#2764e7',
    padding: 10,
    borderRadius: 5,
  },
});

