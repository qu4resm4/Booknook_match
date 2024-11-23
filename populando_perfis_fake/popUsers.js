const admin = require('firebase-admin');
const { firebaseConfig } = require('./enviroment');

// Inicializa o Firebase Admin SDK com as credenciais do seu projeto (necessário o arquivo de chave de serviço)
admin.initializeApp({
  credential: admin.credential.cert(require('./booknook-3a6ff-firebase-adminsdk-o4q70-5ba97b0a11.json')), // Utilize o arquivo JSON da chave do serviço
  databaseURL: `https://booknook-3a6ff.firebaseio.com` // Usando o projectId da configuração
});

const auth = admin.auth();
const firestore = admin.firestore();
firestore.settings({
    ignoreUndefinedProperties: true
  });

// Função para criar usuários fake com base no array de JSONs fornecido

const createFakeUsers = async (userData) => {
    try {
      // Verifique se resenhas é um array
      /*if (!Array.isArray(userData.resenhas)) {
        console.log(typeof(userData.resenhas))
        let array_resenhas = Array(userData.resenhas)
        console.log(array_resenhas)
      }*/
        for (const user of userData) {
            // Criação do usuário no Firebase Authentication
            const userRecord = await auth.createUser({
              email: user.email,
              password: '123456', // Senha padrão para todos
              displayName: user.username,
              emailVerified: true,
            });

            console.log(`Usuário criado: ${userRecord.uid}`);

            const userRef = admin.firestore().collection('users').doc(userRecord.uid);
      
            // Adiciona os dados do usuário na coleção 'users'
            await userRef.set({
              email: user.email,
              interesses_usuario: user.interesses_usuario,
              username: user.username,
              updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            });
            console.log("Resenhas desse usuario: ", user.resenhas);
            // Adiciona as resenhas do usuário na sub-coleção 'resenhas'
            // Cria a subcoleção de resenhas para o usuário
            for (const resenha of user.resenhas) {
                await userRef.collection('resenhas').add({
                livroId: resenha.livroId,
                titulo: resenha.titulo,
                nome_livro: resenha.nome_livro,
                resenha: resenha.resenha,
                categorias_livro: resenha.categorias_livro,
                titulo_resenha: resenha.titulo_resenha,
                data: admin.firestore.Timestamp.now()
                });
            }
          }
    } catch (error) {
      console.error("Erro ao criar usuário ou documento:", error);
    }
  };

const fakeUsersData = [
    {
      "email": "o39zVf8XADhr14jIJL26pKUTJZg2@example.com",
      "username": "MestreDasPalavras",
      "interesses_usuario": [
        { "id": 1, "preferencia": "J.K. Rowling" },
        { "id": 2, "preferencia": "Fantasia" },
        { "id": 3, "preferencia": "2010" },
        { "id": 4, "preferencia": "Longa" }
      ],
      "uid": "o39zVf8XADhr14jIJL26pKUTJZg2",
      "updatedAt": "2024-11-23T00:00:00Z",
      "resenhas": [
        {
          "livroId": "9xzQzAQAQBAJ",
          "titulo_resenha": "Reflexões sobre Humanidade",
          "nome_livro": "1984",
          "resenha": "Esse livro me impactou profundamente, não só pela escrita envolvente, mas porque ele aborda questões sobre a humanidade e nossos valores de uma forma que raramente se vê. As personagens foram construídas de forma tão realista que parecia que eu as conhecia.",
          "categorias_livro": ["Ficção Científica", "Distopia"]
        },
        {
          "livroId": "hU9DAQAAQBAJ",
          "titulo_resenha": "Amizade e Laços Familiares",
          "nome_livro": "Orgulho e Preconceito",
          "resenha": "Achei fascinante a forma como o autor explora os dilemas da amizade e da família, trazendo reflexões sobre nossos próprios laços. A narrativa é cativante e prende do início ao fim.",
          "categorias_livro": ["Romance", "Contos"]
        }
      ]
    },
    {
      "email": "oTp9F8nCv4RqtJZTxI2Uh4XGTYp2@example.com",
      "username": "ExploradorLiterario",
      "interesses_usuario": [
        { "id": 1, "preferencia": "Neil Gaiman" },
        { "id": 2, "preferencia": "História" },
        { "id": 3, "preferencia": "'80" },
        { "id": 4, "preferencia": "Contos" }
      ],
      "uid": "oTp9F8nCv4RqtJZTxI2Uh4XGTYp2",
      "updatedAt": "2024-11-23T00:00:00Z",
      "resenhas": [
        {
          "livroId": "aOXyBAAAQBAJ",
          "titulo_resenha": "Humanidade e Sensibilidade",
          "nome_livro": "O Senhor dos Anéis",
          "resenha": "Um dos aspectos que mais gostei foi como o autor trouxe à tona temas delicados de maneira tão humana. A escrita foi tão envolvente que mal conseguia parar de ler, e os detalhes criaram uma ambientação quase real.",
          "categorias_livro": ["Aventura", "Fantasia"]
        },
        {
          "livroId": "D_U8BQAAQBAJ",
          "titulo_resenha": "Profundidade dos Personagens",
          "nome_livro": "Anna Karenina",
          "resenha": "A profundidade dos personagens é algo que me cativou, pois pude ver partes de mim neles. O enredo é emocional e carrega um misto de tristeza e superação que com certeza marcou.",
          "categorias_livro": ["Romance", "História"]
        },
        {
          "livroId": "sVcnDwAAQBAJ",
          "titulo_resenha": "Memórias e Tempo",
          "nome_livro": "Memórias Póstumas de Brás Cubas",
          "resenha": "Senti uma ligação com este livro que é difícil de explicar. A maneira como aborda a passagem do tempo e o significado de nossas memórias foi especialmente tocante.",
          "categorias_livro": ["Biografia", "Autoajuda"]
        }
      ]
    },
    {
      "email": "h4F78OpQ6Jv2cDfELZn5IMoWy9G3@example.com",
      "username": "SagaSussurrante",
      "interesses_usuario": [
        { "id": 1, "preferencia": "Agatha Christie" },
        { "id": 2, "preferencia": "Thriller" },
        { "id": 3, "preferencia": "'50" },
        { "id": 4, "preferencia": "Novelas" }
      ],
      "uid": "h4F78OpQ6Jv2cDfELZn5IMoWy9G3",
      "updatedAt": "2024-11-23T00:00:00Z",
      "resenhas": [
        {
          "livroId": "m4TOCwAAQBAJ",
          "titulo_resenha": "O Peso da Realidade",
          "nome_livro": "Admirável Mundo Novo",
          "resenha": "Este livro aborda temas complexos de uma maneira acessível, o que fez com que eu refletisse sobre questões que raramente vejo discutidas. A narrativa é rica em detalhes e a construção do mundo é impressionante.",
          "categorias_livro": ["Distopia", "Thriller"]
        }
      ]
    },
    {
      "email": "KL5dNf0pXmW7Z34tAhI1QOaYb8H2@example.com",
      "username": "FantasiaEmVoo",
      "interesses_usuario": [
        { "id": 1, "preferencia": "George R.R. Martin" },
        { "id": 2, "preferencia": "Aventura" },
        { "id": 3, "preferencia": "2015" },
        { "id": 4, "preferencia": "Saga" }
      ],
      "uid": "KL5dNf0pXmW7Z34tAhI1QOaYb8H2",
      "updatedAt": "2024-11-23T00:00:00Z",
      "resenhas": [
        {
          "livroId": "gczlAAAAMAAJ",
          "titulo_resenha": "Entre Sonhos e Coragem",
          "nome_livro": "Harry Potter e a Pedra Filosofal",
          "resenha": "Eu adorei como o autor consegue misturar fantasia e realidade de uma forma tão harmoniosa. As mensagens que passam sobre coragem e amizade são inspiradoras, e o final foi simplesmente épico!",
          "categorias_livro": ["Fantasia", "Aventura"]
        },
        {
          "livroId": "FwD5DwAAQBAJ",
          "titulo_resenha": "Reflexões da Vida",
          "nome_livro": "O Pequeno Príncipe",
          "resenha": "Esse livro me trouxe uma nova perspectiva sobre temas que achava simples. A complexidade dos personagens e do enredo realmente me fez questionar algumas crenças e ver o mundo com outros olhos.",
          "categorias_livro": ["Poesia", "Romance"]
        }
      ]
    },
    {
      "email": "gPzT3m9vNjXl5K7aIbQ0vO1WFhY4@example.com",
      "username": "PensadorEterno",
      "interesses_usuario": [
        { "id": 1, "preferencia": "Jane Austen" },
        { "id": 2, "preferencia": "Biografia" },
        { "id": 3, "preferencia": "'20" },
        { "id": 4, "preferencia": "Contos" }
      ],
      "uid": "gPzT3m9vNjXl5K7aIbQ0vO1WFhY4",
      "updatedAt": "2024-11-23T00:00:00Z",
      "resenhas": [
        {
          "livroId": "yn1GAAAAQBAJ",
          "titulo_resenha": "Complexidade das Relações",
          "nome_livro": "Os Miseráveis",
          "resenha": "O que mais me chamou atenção foi a maneira como o autor fala sobre a complexidade das relações humanas e o que nos define. A cada capítulo, fui surpreendido por reflexões profundas que ficam com a gente mesmo depois de fechar o livro.",
          "categorias_livro": ["Biografia", "Autoajuda"]
        },
        {
          "livroId": "ZlhpDwAAQBAJ",
          "titulo_resenha": "A Jornada Interior",
          "nome_livro": "O Alquimista",
          "resenha": "Foi uma leitura leve, mas que ao mesmo tempo carrega mensagens fortes sobre nossa jornada pessoal. Senti que o livro é como um amigo oferecendo conselhos.",
          "categorias_livro": ["Autoajuda", "História"]
        },
        {
          "livroId": "GcEyDQAAQBAJ",
          "titulo_resenha": "Reflexões Existenciais",
          "nome_livro": "Poemas de Fernando Pessoa",
          "resenha": "A profundidade deste livro é algo raro. O autor apresenta questões existenciais de forma poética e encantadora, e foi uma leitura extremamente enriquecedora.",
          "categorias_livro": ["Poesia", "Distopia"]
        }
      ]
    }
  ]
  
  
// Chama a função passando os dados de usuários fake
createFakeUsers(fakeUsersData);
