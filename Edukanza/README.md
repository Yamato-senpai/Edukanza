# Edukanza

> Plataforma web profissional para gestão escolar digital, desenvolvida para escolas secundárias privadas em Angola e Moçambique.

## Visão Geral
O Edukanza centraliza a comunicação e a gestão escolar, conectando alunos, professores, pais e direção em um ambiente seguro, moderno e eficiente. Elimina a dependência de WhatsApp, papéis e processos manuais, trazendo praticidade e transparência para toda a comunidade escolar.

### Funcionalidades
- **Alunos:** Acompanham horários, notas, tarefas, materiais e comunicados em um painel intuitivo, acessível de qualquer dispositivo.
- **Professores:** Realizam chamadas, lançam notas, compartilham materiais e comunicados, tudo digitalmente.
- **Pais:** Acompanham o desempenho dos filhos, faltas e recebem notificações importantes em tempo real.
- **Direção:** Gerencia turmas, professores, alunos e acessa relatórios completos de desempenho escolar.

## Arquitetura do Projeto

O Edukanza é dividido em duas grandes camadas, seguindo as melhores práticas de desenvolvimento moderno:

### Frontend
- **Tecnologia:** [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Local:** `frontend/`
- **Descrição:** Interface web responsiva, moderna e escalável, garantindo ótima experiência ao usuário.

### Backend
- **Tecnologia:** [PHP](https://www.php.net/) (Framework [Laravel](https://laravel.com/))
- **Local:** `backend/`
- **Descrição:** API robusta, segura e de alta performance, responsável por toda a lógica de negócio e persistência de dados.

## Como Executar

1. **Backend (Laravel):**
	- Instale as dependências com `composer install` dentro da pasta `backend/`.
	- Configure o arquivo `.env` conforme o ambiente.
	- Execute as migrações e rode o servidor com `php artisan migrate` e `php artisan serve`.

2. **Frontend (React/TypeScript):**
	- Instale as dependências com `npm install` dentro da pasta `frontend/`.
	- Inicie o frontend com `npm start`.

## Sobre o Projeto

O Edukanza foi criado para substituir cadernos de pautas, folhas de presença, comunicados em papel e grupos de WhatsApp desorganizados, oferecendo uma solução profissional, moderna e adaptada à realidade angolana e moçambicana.

---
Desenvolvido por [Seu Nome ou Equipe].