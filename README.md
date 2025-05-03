# 📚 PageKeeper – Sistema de Gerenciamento de Bibliotecas

**PageKeeper** é uma aplicação robusta para gerenciamento de bibliotecas, oferecendo funcionalidades completas para controle de livros, clientes e empréstimos, com foco em organização, segurança e boas práticas de desenvolvimento.

---

## ✨ Principais Funcionalidades

- 🔐 **Autenticação Segura**  
  Sistema de autenticação para garantir acesso controlado ao ambiente administrativo.

- 👥 **Gestão de Clientes**  
  Cadastro, edição e visualização de clientes com dados detalhados.

- 📚 **Gerenciamento de Livros**  
  Registro completo de livros, incluindo classificação por gêneros e controle de status (disponível, emprestado, reservado).

- 🏷️ **Categorização por Gêneros**  
  Organização inteligente por gêneros literários para facilitar a navegação e busca.

- 🔄 **Sistema de Empréstimos**  
  Controle eficiente de empréstimos, com registro de datas de retirada e devolução.

---

## 🛠️ Stack Tecnológica

**Backend**  
- PHP 8.2+  
- Laravel 12  
- MySQL 8 (via Docker)  
- Princípios SOLID aplicados  

**Frontend**  
- Inertia.js  
- Vite  
- Tailwind CSS 3  
- ShadCN (opcional)

---

## 🚀 Instalação e Execução

### Pré-requisitos

- PHP 8.2+  
- Docker  
- Node.js 16+  
- Composer

### Passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/VictorRochaSilva/pagekeeper.git
cd pagekeeper
```

2. Suba o container do MySQL:

```bash
docker-compose up -d
```

3. Copie o arquivo de ambiente:

```bash
cp .env.example .env
```

4. Instale as dependências do backend:

```bash
composer install
```

5. Instale as dependências do frontend:

```bash
npm install
```

6. Execute os servidores:

```bash
php artisan serve
npm run dev
```

ou:

```bash
composer run dev
```

📝 Licença
Este projeto está licenciado sob a Licença MIT.

Desenvolvido por Victor Rocha.
