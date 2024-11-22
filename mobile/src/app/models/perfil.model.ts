export interface Perfil {
  id_usuario?: string;
  username: string;
  biografia?: string;
  interesses_usuario: string[];
  resenhas: {
    id_livro: string;
    titulo_resenha: string;
    nome_livro: string;
    resenha: string;
    categorias_livro: string[];
  }[];
}