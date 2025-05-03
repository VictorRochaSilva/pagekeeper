📚 PageKeeper - Sistema de Gerenciamento de Biblioteca
<div align="center">
Laravel
MySQL
Docker
SOLID
PHP

</div>
✨ Funcionalidades Principais
🔐 Autenticação de usuários

👥 Gerenciamento de Clientes (cadastro, edição, visualização)

📚 Controle de Livros (cadastro, categorização, status)

🏷️ Classificação por Gêneros para organização

🔄 Sistema de Empréstimos com controle de datas

🛠 Stack Tecnológica
Backend
PHP 8.2+

Laravel 12

MySQL 8 (Docker)

Princípios SOLID

Frontend
Inertia.js

Vite

Tailwind CSS 3

ShadCN (opcional)

🚀 Instalação
Pré-requisitos
Docker

Node.js 16+

Composer

bash
# Clone o repositório
git clone https://github.com/VictorRochaSilva/pagekeeper.git
cd pagekeeper

# Inicie os containers
docker-compose up -d

# Configure o ambiente
cp .env.example .env
docker exec -it pagekeeper_app bash -c "composer install && php artisan key:generate && php artisan migrate --seed && npm install && npm run dev"
🔍 Acesso
Serviço	URL	Credenciais
Aplicação	http://localhost:8000	admin@admin.com / admin
phpMyAdmin	http://localhost:8080	root / password
🏗 Arquitetura SOLID
Repositórios para acesso a dados

Services para lógica de negócio

DTOs para transferência de dados

Interfaces para injeção de dependência

Requests validadas

🛠 Comandos Úteis
bash
# Recriar banco de dados
docker exec -it pagekeeper_app php artisan migrate:fresh --seed

# Build para produção
npm run build

# Listar rotas
php artisan route:list

# Executar testes
php artisan test
<div align="center">
Licença MIT

Desenvolvido com ❤️ por Victor

</div>