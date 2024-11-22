export interface Perfil {
  id_usuario: string;
    username: string;
    biografia: string;
    interesses_usuario: string[];
    resenhas: { 
      titulo_resenha: string; 
      resenha: string; 
      categorias_livro: string[]; 
    }[];
  }