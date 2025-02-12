# IT Patagonia Challenge

Banding application developed with **NextJs, React, TypeScript, Tailwind**, some components and functions are tested with **Jest**.
<br>

### 🚀 Clone Repository

<hr />

```bash
  $ git clone https://github.com/andreajhl/it-patagonia-challenge.git
```

### ⚙️ Project Configuration

<hr />

#### 1️⃣ Environmental Variables

1. In the root of the project, create a `.env` file.
2. Copy the content of `.env.template` and paste it into `.env`.

#### 2️⃣ Database Configuration

1. Install Docker Desktop (skip this step if Docker is already installed on your machine):

   - Download and install Docker Desktop from the official website: Docker Desktop.

   - Follow the installation instructions specific to your operating system.

2. Start the database with Docker:

   - In the terminal, navigate to the project directory and run the following command to start the database container:

     ```bash
       docker compose up -d
     ```

3. Apply Prisma migrations:

   - After starting the database, you need to apply the Prisma migrations to set up the database schema. Run the following command to apply the migrations:

     ```bash
       npx prisma migrate dev --name init
     ```

### 🚀 Compilation and Execution

<hr />

1. Install dependencies:

```bash
  npm install
```

2. Run the Project in Development Mode:

```bash
  npm run dev
```

3. Run Tests:

```bash
  npm run test
```

<br>
