📚 PageKeeper - Sistema de Gerenciamento de Biblioteca
PageKeeper é um sistema completo para o gerenciamento de bibliotecas, permitindo o controle de livros, clientes e empréstimos com funcionalidades robustas de autenticação e organização.

✨ Funcionalidades Principais
🔐 Autenticação de Usuários: Segurança com autenticação de usuários para garantir acesso controlado ao sistema.

👥 Gerenciamento de Clientes: Cadastro, edição e visualização de informações dos clientes.

📚 Controle de Livros: Cadastro de livros, categorização por gêneros e controle de status (disponível, emprestado, reservado).

🏷️ Classificação por Gêneros: Organize os livros por gênero para facilitar a busca e a organização.

🔄 Sistema de Empréstimos: Controle completo de empréstimos com datas de empréstimo e devolução.

🛠 Stack Tecnológica
Backend: PHP 8.2+, Laravel 12, MySQL 8 (Docker), Princípios SOLID

Frontend: Inertia.js, Vite, Tailwind CSS 3, ShadCN (opcional)

🚀 Instalação
Pré-requisitos:

PHP 8.2+

Docker

Node.js 16+

Composer

Passos para Instalação:

Clone o repositório:

git clone https://github.com/VictorRochaSilva/pagekeeper.git
cd pagekeeper

Inicie o contêiner MySQL:

docker-compose up -d

Configure o ambiente:

cp .env.example .env
Instale as dependências:

Backend:

composer install

Frontend:

npm install

Execute o ambiente de desenvolvimento:

Para rodar o Laravel (backend) e o Vite (frontend) separadamente, use:

php artisan serve
npm run dev

Ou, para rodar ambos com um único comando:

composer run dev

📝 Licença
Este projeto está sob a Licença MIT.

Desenvolvido com ❤️ por Victor Rocha