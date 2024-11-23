export interface Perfil {
  id_usuario?: string;
  username: string;
  biografia?: string;
  interesses_usuario: string[];
  resenhas: {
    livroId: string;
    titulo: string;
    nome_livro: string;
    resenha: string;
    categorias_livro: string[];
  }[];
  likes: string[];
  matches: string[];
}