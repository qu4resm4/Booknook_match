# Booknook

## Sobre o projeto
**Booknook** é um aplicativo de correspondência voltado para leitores, permitindo conexões baseadas em experiências literárias compartilhadas.

### Funcionalidades principais:
- **Autenticação e autorização**: Utiliza Firebase Authenticate e Angular AuthGuard.
- **Cadastro de informações do usuário**: Registra interesses e preferências de leitura no Firestore Database.
- **Estante de livros**: Gerencia livros adicionados, favoritos e resenhados.
- **Pesquisa de livros**: Permite consultar informações, adicionar à estante ou criar resenhas.
- **Sistema de Match**: 
  - Interação com outros perfis por meio de **likes** ou **dislikes**.
  - Exibição de interesses, biografia e resenhas, mantendo o anonimato do livro até ocorrer um match.
- **Chats**: Liberados após a ocorrência de um match, permitindo interação direta entre os usuários.

---

## Tecnologias utilizadas
- **Ionic**: Framework para desenvolvimento híbrido, garantindo responsividade e suporte a dispositivos móveis.
- **Angular**: Framework para construção de interfaces dinâmicas e gestão do estado da aplicação.
- **Firebase Authenticate**: Gerenciamento de usuários com login seguro.
- **Firestore Database**: Armazenamento em nuvem de dados estruturados e sincronização em tempo real.
- **Angular AuthGuard**: Controle de rotas para autenticação.
- **Ionic Storage***: Biblioteca para gerenciamento de armazenamento local, permitindo salvar dados no dispositivo de forma persistente, com suporte a diversos mecanismos como IndexedDB, SQLite e LocalStorage.

---

## Como executar o projeto
### Pré-requisitos:
Certifique-se de que os seguintes itens estejam instalados no seu sistema:
- **Node.js** (versão 16 ou superior): [Baixar aqui](https://nodejs.org/)
- **Ionic CLI** (versão 7 ou superior): Instale com:
  ```bash
  npm install -g @ionic/cli
  ```
## Simulando o aplicativo:
- Clone este repositório em seu computador:
```bash
git clone <URL_DO_REPOSITORIO>
cd <PASTA_DO_PROJETO>
```
- Acesse o diretório Mobile, onde o projeto IONIC está localizado:
```bash
cd mobile
```
- Instale as dependências do projeto:
```bash
npm install
```
- Inicie a simulação no navegador:
```bash
ionic serve
```

Este comando abrirá a versão web do aplicativo híbrido no navegador padrão.
