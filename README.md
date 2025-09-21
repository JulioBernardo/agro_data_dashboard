# 🌱 Agro Data Dashboard  

Dashboard interativo para visualização de dados do agronegócio brasileiro, desenvolvido como parte de um **processo seletivo da Jacto**.  
A aplicação consome dados da **API SIDRA/IBGE**, processa-os via backend em **Python (Flask)** e exibe-os em um frontend em **React + TypeScript**, com gráficos analíticos e mapa interativo.  

---

## 🚀 Funcionalidades

- **Filtros dinâmicos**  
  - Seleção de tabela (1612 – Lavouras temporárias, 1613 – Lavouras permanentes).  
  - Filtro por **ano**, **cultura agrícola** e **região**.  

- **Dashboard**  
  - **Mapa Interativo (Leaflet)**: exibição geográfica dos dados.  
  - **Gráficos Analíticos (Recharts)**:  
    - Gráfico de linha → evolução temporal da produção.  
    - Espaços reservados para novos gráficos (ex: pizza, radar, etc).  

- **Backend Flask**  
  - Camada de integração com a API **SIDRA/IBGE**.  
  - Roteamento REST para consulta dos dados.  
  - Tratamento de filtros (ano, região, cultura).  

---

## 🏗️ Arquitetura do Projeto

```
agro-data-dashboard/
│── backend/              # API Flask
│   │── app/              # Código principal
│   │   ├── routes.py     # Definição das rotas
│   │   ├── services/     # Integração com a SIDRA/IBGE
│   │   ├── config.py     # Configurações globais
│   │   └── ...
│   │── wsgi.py           # Ponto de entrada do backend
│   │── requirements.txt  # Dependências Python
│   │── Dockerfile        # Configuração de container
│
│── frontend/             # Interface em React + TS
│   │── src/
│   │   ├── components/   # Componentes da UI
│   │   ├── services/     # Conexão com backend (axios)
│   │   ├── types.ts      # Tipagem global
│   │   └── App.tsx
│   │── vite.config.ts    # Configuração Vite
│   │── package.json      # Dependências JS
│
│── README.md             # Documentação
```

---

## 🔄 Fluxo de Arquitetura  

```mermaid
flowchart LR
    A[Usuário no Navegador] --> B[Frontend React + TS]
    B -->|Axios HTTP Requests| C[Backend Flask API]
    C -->|Consulta| D[API SIDRA/IBGE]
    D -->|Dados em JSON| C
    C -->|Dados processados (JSON)| B
    B -->|Mapas e Gráficos| A
```

---

## ⚙️ Tecnologias Utilizadas

### Backend
- [Python](https://www.python.org/)  
- [Flask](https://flask.palletsprojects.com/)  
- [Flask-CORS](https://flask-cors.readthedocs.io/)  
- [Requests](https://docs.python-requests.org/en/latest/)  

### Frontend
- [React + TypeScript](https://react.dev/)  
- [Vite](https://vitejs.dev/)  
- [Axios](https://axios-http.com/)  
- [Leaflet (react-leaflet)](https://react-leaflet.js.org/)  
- [Recharts](https://recharts.org/en-US/)  

---

## ▶️ Como Rodar o Projeto

### 1️⃣ Backend (Flask)

```bash
cd backend
pip install -r requirements.txt
flask run --port=5000
```

👉 Backend disponível em: `http://localhost:5000/api`  

---

### 2️⃣ Frontend (React + TS)

```bash
cd frontend
npm install
npm run dev
```

👉 Frontend disponível em: `http://localhost:5173`  

---

## 📊 Exemplos de Uso

### Aplicando filtros
- **Tabela:** `1612 – Lavouras temporárias`  
- **Ano:** `2020`  
- **Cultura:** `Milho`  
- **Região:** `São Paulo`  

📍 O dashboard exibirá:  
- **Mapa** com marcadores em regiões produtoras.  
- **Gráfico de barras** com produção por cultura.  
- **Gráfico de linha** com evolução ao longo dos anos.  

---

## 🧩 Melhorias Futuras
- Gráficos adicionais (pizza, radar, etc).  
- Enriquecer o mapa com **shapes oficiais dos estados/municípios** (GeoJSON).  
- Cache de dados no backend para reduzir chamadas ao IBGE.  
- Deploy simplificado com **Docker**.  

---

## 👨‍💻 Autor
Projeto desenvolvido por **Julio Cesar Bernardo Leite**  
📌 Engenharia de Software | Processos e Inovação   
🔗 [LinkedIn](https://www.linkedin.com/in/juliocbleite)  
