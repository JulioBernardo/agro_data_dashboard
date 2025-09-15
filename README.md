# 🌱 Agro Data Dashboard

Dashboard interativo para visualização de dados do agronegócio brasileiro, desenvolvido como parte de um **processo seletivo da Jacto**.  
A aplicação consome dados da **API SIDRA/IBGE**, processa-os via backend em **Python (Flask)** e exibe-os em um frontend moderno em **React + TypeScript**, com gráficos analíticos e mapa interativo.

---

## 🚀 Funcionalidades

- **Filtros dinâmicos**  
  - Seleção de tabela (1612 – Lavouras temporárias, 1613 – Lavouras permanentes, 5457 – Consolidação).  
  - Filtro por **ano**, **cultura agrícola** e **região**.  
  - Botão **Aplicar Filtros** que atualiza mapa e gráficos.

- **Dashboard**  
  - **Mapa Interativo (Leaflet)**: exibição geográfica dos dados.  
  - **Gráficos Analíticos (Recharts)**:  
    - Gráfico de barras → produção por cultura.  
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
│   │   └── ...
│── frontend/             # Interface em React + TS
│   │── src/
│   │   ├── components/   # Componentes da UI
│   │   ├── services/     # Conexão com backend (axios)
│   │   ├── types.ts      # Tipagem global
│   │   └── App.tsx
│── README.md             # Documentação
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
python wsgi.py

pip install -r requirements.txt
flask run --port=5000
```

O backend estará disponível em:  
👉 `http://localhost:5000/api`

---

### 2️⃣ Frontend (React + TS)

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em:  
👉 `http://localhost:5173`

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
- Implementar gráficos adicionais (pizza, radar, etc).  
- Enriquecer o mapa com **shapes oficiais dos estados/municípios** (GeoJSON).  
- Cache de dados no backend para evitar excesso de chamadas à API do IBGE.  
- Deploy em **Docker** para simplificar execução.  

---

## 👨‍💻 Autor
Projeto desenvolvido por **Julio Cesar Bernardo Leite**  
📌 Engenharia de Software | Processos e Inovação   
🔗 [LinkedIn](https://www.linkedin.com/in/juliocbleite)
