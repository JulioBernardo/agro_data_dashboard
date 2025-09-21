# Usa imagem base oficial do Python
FROM python:3.11-slim

# Define diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas requirements primeiro (para cache)
COPY requirements.txt .

# Instala dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo o código do backend
COPY . .

# Expõe a porta do Flask
EXPOSE 5000

# Roda a aplicação usando o wsgi.py
CMD ["python", "wsgi.py"]
