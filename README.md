# Exercise Platform Backend

Ce projet est le backend d'une plateforme d'exercices éducatifs permettant aux enseignants de créer des exercices et aux étudiants de soumettre leurs réponses. Les soumissions sont automatiquement corrigées par une IA (via Ollama) et stockées dans MinIO. L'authentification est gérée via email/mot de passe et OAuth (Google/GitHub).

## Fonctionnalités

- **Authentification** : Inscription, connexion et OAuth (Google/GitHub).
- **Gestion des exercices** : Création et consultation par les enseignants.
- **Soumissions** : Upload de fichiers PDF par les étudiants, stockage dans MinIO et correction automatique par IA.
- **Base de données** : PostgreSQL pour stocker les utilisateurs, exercices et soumissions.
- **Stockage** : MinIO pour les fichiers soumis.
- **IA** : Correction automatique via Ollama (modèle configurable).

## Prérequis

- **Python** : Version 3.10 ou supérieure.
- **Django** : Framework web.
- **PostgreSQL** : Base de données.
- **MinIO** : Stockage des fichiers.
- **Ollama** : Correction automatique des soumissions par IA.
- **OAuth** : Comptes Google et GitHub pour l'authentification (optionnel).

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/<ton-utilisateur>/<ton-repo>.git
cd <ton-repo>
```

### 2. Créer un environnement virtuel et installer les dépendances

```bash
python -m venv venv
source venv/bin/activate  # Sous Windows : venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Configurer l’environnement

Créer un fichier `.env` à la racine du projet avec les variables suivantes :

```plaintext
SECRET_KEY=your_secret_key
DEBUG=True
ALLOWED_HOSTS=*

DATABASE_NAME=db_exercise_platform
DATABASE_USER=postgres
DATABASE_PASSWORD=passer
DATABASE_HOST=localhost
DATABASE_PORT=5432

MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=your_minio_access_key
MINIO_SECRET_KEY=your_minio_secret_key
MINIO_BUCKET=exercise-submissions

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8000/auth/google/callback
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:8000/auth/github/callback
```

### 4. Configurer PostgreSQL

Créer la base de données et l'utilisateur :

```sql
CREATE DATABASE db_exercise_platform;
CREATE USER postgres WITH PASSWORD 'passer';
ALTER ROLE postgres SET client_encoding TO 'utf8';
ALTER ROLE postgres SET default_transaction_isolation TO 'read committed';
ALTER ROLE postgres SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE db_exercise_platform TO postgres;
```

Appliquer les migrations Django :

```bash
python manage.py migrate
```

### 5. Configurer MinIO

Télécharger et lancer MinIO :

```bash
wget https://dl.min.io/server/minio/release/linux-amd64/minio
chmod +x minio
./minio server /data --console-address ":9001" &
```

Créer un bucket :

```bash
mc alias set local http://localhost:9000 your_minio_access_key your_minio_secret_key
mc mb local/exercise-submissions
```

### 6. Configurer Ollama (IA)

Installer Ollama :

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Lancer le serveur Ollama :

```bash
ollama serve &
```

### 7. Lancer le serveur Django

En mode développement :

```bash
python manage.py runserver
```

En mode production (avec Gunicorn) :

```bash
gunicorn exercise_platform.wsgi:application --bind 0.0.0.0:8000
```

## Contribution

1. Fork le projet.
2. Créer une branche (`git checkout -b feature/ton-feature`).
3. Commit tes changements (`git commit -m "Ajoute une feature"`).
4. Push ta branche (`git push origin feature/ton-feature`).
5. Ouvre une Pull Request.

## Licence

MIT - À adapter selon tes préférences.

