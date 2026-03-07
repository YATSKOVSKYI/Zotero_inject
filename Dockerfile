FROM python:3.11-slim

# Install Node.js 20
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy all source
COPY . .

# Build frontend (creates fresh dist/)
RUN cd app/frontend && npm ci && npm run build

EXPOSE 8080

CMD ["sh", "-c", "cd app/backend && uvicorn server:app --host 0.0.0.0 --port ${PORT:-8080}"]
