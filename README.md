# Edukanza

Plataforma web profissional para gestão escolar digital, desenvolvida para escolas secundárias privadas em Angola e Moçambique.

---

## Índice

1. [Introdução](#introducao)
2. [Visão Geral](#visao-geral)
3. [Funcionalidades](#funcionalidades)
4. [Arquitetura do Projeto](#arquitetura-do-projeto)
5. [Instalação e Execução](#instalacao-e-execucao)
6. [Contribuição](#contribuicao)
7. [Licença](#licenca)

---

## <a name="introducao"></a>Introdução

O Edukanza é uma solução completa para gestão escolar, centralizando comunicação, dados acadêmicos e administrativos em uma única plataforma. O objetivo é modernizar a gestão escolar, tornando-a mais eficiente, transparente e acessível para toda a comunidade escolar.

## <a name="visao-geral"></a>Visão Geral

O Edukanza conecta alunos, professores, pais e direção em um ambiente seguro, moderno e eficiente. Elimina a dependência de WhatsApp, papéis e processos manuais, trazendo praticidade e transparência para toda a comunidade escolar.

## <a name="funcionalidades"></a>Funcionalidades

- **Alunos:**
	- Visualização de horários, notas, tarefas, materiais e comunicados.
	- Acesso multiplataforma (desktop e mobile).
- **Professores:**
	- Lançamento de conteúdos, notas, materiais e comunicados.
	- Ferramentas para chamada e acompanhamento de turmas.
- **Pais:**
	- Acompanhamento do desempenho dos filhos, faltas e notificações em tempo real.
- **Direção:**
	- Gestão de turmas, professores, alunos e relatórios completos de desempenho escolar.

## <a name="arquitetura-do-projeto"></a>Arquitetura do Projeto

O Edukanza é dividido em duas grandes camadas, seguindo as melhores práticas de desenvolvimento moderno:

### Frontend

- **Tecnologia:** [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Local:** `frontend/`
- **Descrição:** Interface web responsiva, moderna e escalável, garantindo ótima experiência ao usuário.

### Backend

- **Tecnologia:** [PHP](https://www.php.net/) (Framework [Laravel](https://laravel.com/))
- **Local:** `backend/`
- **Descrição:** API robusta, segura e de alta performance, responsável por toda a lógica de negócio e persistência de dados.

## <a name="instalacao-e-execucao"></a>Instalação e Execução

### Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18.x
- [npm](https://www.npmjs.com/) >= 9.x
- [PHP](https://www.php.net/) >= 8.1
- [Composer](https://getcomposer.org/)

### Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env # Configure o arquivo .env conforme seu ambiente
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend (React/TypeScript)

```bash
cd frontend
npm install
npm start
```

## <a name="contribuicao"></a>Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b minha-feature`)
3. Faça commit das suas alterações (`git commit -m 'feat: minha nova feature'`)
4. Faça push para a branch (`git push origin minha-feature`)
5. Abra um Pull Request

## <a name="licenca"></a>Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---
Desenvolvido por Fábio Rómulo, Feliciano Barta e Taha-Wur Pereira.
