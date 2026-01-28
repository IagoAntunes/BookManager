<p align="center">
  <a href="#-português">🇧🇷 Português</a>
  <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
  <a href="#-english">🇺🇸 English</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular%2019-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white" alt="Angular Badge" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript Badge" />
  <img src="https://img.shields.io/badge/Sass-CC6699.svg?style=for-the-badge&logo=sass&logoColor=white" alt="Sass Badge" />
  <img src="https://img.shields.io/badge/.NET%209-512BD4.svg?style=for-the-badge&logo=dotnet&logoColor=white" alt=".NET Badge" />
  <img src="https://img.shields.io/badge/C%23-239120.svg?style=for-the-badge&logo=c-sharp&logoColor=white" alt="C# Badge" />
  <img src="https://img.shields.io/badge/SQL%20Server-CC2927.svg?style=for-the-badge&logo=microsoftsqlserver&logoColor=white" alt="SQL Server Badge" />
</p>

<p align="center">
  <img width="100%" alt="BookManager Banner" src="https://github.com/user-attachments/assets/b1e5bf5f-dcf1-4191-ac83-fac672ad59c5" />
</p>

---

## 🇺🇸 English

### 🛠️ Project Description

**BookManager** is a high-performance full-stack web application designed for personal library organization. Users can manage their reading progress through a dynamic dashboard and a custom-built interface. The project emphasizes modern reactive patterns and a proprietary design system.

### 🧰 Tools and Technologies Used

#### Frontend
- **Angular 19 🅰️** — Using **Standalone Components** and **Signals** for fine-grained reactivity.
- **TypeScript ⌨️** — Strongly typed development for robust code.
- **SCSS 🎨** — Advanced styling with Mixins and Variables for a custom Design System.
- **Reactive Forms 📝** — Complex validation and data handling.
- **RxJS ⚡** — Asynchronous stream management and HTTP flow control.
- **ngx-toastr 🔔** — Real-time user feedback notifications.

#### Backend
- **ASP.NET Core 🚀** — High-performance REST API.
- **C# ♯** — Main backend language with modern features.
- **Entity Framework Core 💾** — Data persistence and ORM.
- **SQL Server 🗃️** — Relational database.
- **JWT (JSON Web Tokens) 🔑** — Secure authentication and authorization.

### 🏛️ Project Architecture

#### Angular Frontend (Modern Reactive Architecture)
The frontend was built without external UI libraries, focusing on a **Custom Design System**:
- **Signals & Computed** — Used for the Dashboard (counters) and real-time filtering (Search + Status) with maximum performance.
- **Custom Components** — Development of `c-button`, `c-field`, `c-modal`, `c-dropdown`, `c-card`, and `c-rating`.
- **HTTP Interceptors** — Automatic JWT injection and 401 (Unauthorized) error handling.
- **Route Guards** — Protection of private routes and authentication flow management.

#### ASP.NET Core Backend (Clean Architecture)
- **API Layer** — Controllers, DTOs (Data Transfer Objects), and Middleware configuration.
- **Application Layer** — Business logic and service orchestration.
- **Infrastructure Layer** — Data Access (EF Core), Repositories, and Security (TokenService).
- **Domain Layer** — Core entities and business rules.

---

## 🇧🇷 Português

### 🛠️ Descrição do Projeto

**BookManager** é uma aplicação web full-stack de alta performance projetada para a organização de bibliotecas pessoais. Os usuários podem gerenciar seu progresso de leitura através de um dashboard dinâmico e uma interface construída sob medida. O projeto enfatiza padrões reativos modernos e um design system próprio.

### 🧰 Ferramentas e Tecnologias Utilizadas

#### Frontend
- **Angular 19 🅰️** — Utilizando **Standalone Components** e **Signals** para reatividade de alta performance.
- **TypeScript ⌨️** — Desenvolvimento tipado para um código robusto e seguro.
- **SCSS 🎨** — Estilização avançada com Mixins e Variáveis para um Design System customizado.
- **Reactive Forms 📝** — Validação complexa e manipulação de formulários.
- **RxJS ⚡** — Gerenciamento de fluxos assíncronos e controle de requisições HTTP.
- **ngx-toastr 🔔** — Notificações de feedback em tempo real para o usuário.

#### Backend
- **ASP.NET Core 🚀** — Construção de uma REST API de alta performance.
- **C# ♯** — Linguagem principal do backend com recursos modernos.
- **Entity Framework Core 💾** — Persistência de dados e ORM.
- **SQL Server 🗃️** — Banco de dados relacional.
- **JWT (JSON Web Tokens) 🔑** — Segurança e autenticação de endpoints.

### 🏛️ Arquitetura do Projeto

#### Arquitetura Frontend (Angular Moderno)
O frontend foi construído sem bibliotecas de UI externas, focando em um **Design System Próprio**:
- **Signals & Computed** — Utilizados para o Dashboard (contadores) e filtragem em tempo real (Busca + Status) com performance máxima.
- **Componentes Customizados** — Desenvolvimento de `c-button`, `c-field`, `c-modal`, `c-dropdown`, `c-card` e `c-rating`.
- **HTTP Interceptors** — Injeção automática de JWT e tratamento de erros 401 (Não autorizado).
- **Route Guards** — Proteção de rotas privadas e gerenciamento do fluxo de autenticação.

#### Arquitetura Backend (ASP.NET Core)
O backend segue os princípios de **Clean Architecture**:
- **Camada de API** — Controllers, DTOs (Data Transfer Objects) e configuração de Middlewares.
- **Camada de Aplicação** — Lógica de negócio e orquestração de serviços.
- **Camada de Infraestrutura** — Acesso a dados (EF Core), Repositórios e Segurança
