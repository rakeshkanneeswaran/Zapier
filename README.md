
# AutomateX

AutomateX is a microservices-based automation platform replicating Zapier's core functionalities. It enables users to create automated workflows (Zaps) triggered by webhooks, performing actions like sending emails. The system features a scalable microservices architecture and an event-driven design.

## System Design Architecture

![Untitled-2024-07-26-0244](https://github.com/user-attachments/assets/e09fcc53-897c-42b8-8fcd-0de3d5755d5f)


## Tech Stack

- **Apache Kafka:** Reliable event streaming.
- **Docker:** Consistent deployment environments.
- **Next.js:** React framework for frontend.
- **Express.js:** API handling and routing.
- **Prisma ORM:** Type-safe database access.
- **PostgreSQL:** Robust relational database.

## Getting Started

To get started with AutomateX, follow these steps:

### Prerequisites

Ensure you have Docker installed on your machine. You can download Docker from [here](https://www.docker.com/products/docker-desktop).

### Running PostgreSQL and Apache Kafka with Docker

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rakeshkanneeswaranofficial/AutomateX.git
   cd automatex
   ```

2. **Start PostgreSQL:**

   ```bash
   docker run -p 5432:5432 --name automatex_postgres -e POSTGRES_USER=automatex -e POSTGRES_PASSWORD=automatex -e POSTGRES_DB=automatex_db postgres:13
   ```

3. **Start Apache Kafka:**

   ```bash
   docker run --name automatex_kafka -p -d 9092:9092 apache/kafka:3.7.1
   ```

4. **Get shell access to the Kafka container:**

   ```bash
   docker ps
   docker exec -it automatex_kafka /bin/bash
   ```

5. **Create a Kafka topic:**

   Inside the Kafka container:

   ```bash
   cd /opt/kafka/bin
   ./kafka-topics.sh --create --topic zap-events --bootstrap-server localhost:9092
   ```

### Installing Dependencies

Navigate to each service directory and install the required dependencies:

```bash
cd hookservice
npm install

cd ../worker
npm install

cd ../processor
npm install

cd ../primarybackend
npm install
```

### Starting the Services

To start each service, use the following commands:

- **Hook Service:**

  ```bash
  cd hookservice
  npm run start
  ```

- **Worker Service:**

  ```bash
  cd worker
  npm run start
  ```

- **Processor Service:**

  ```bash
  cd processor
  npm run start
  ```

- **Primary Backend:**

  ```bash
  cd primarybackend
  npm run start
  ```

### Running the Application

- **Frontend:**

  Navigate to your frontend directory and start the frontend server:

  ```bash
  cd frontend
  npm run dev
  ```

Feel free to adjust any paths or details according to your project's structure.
