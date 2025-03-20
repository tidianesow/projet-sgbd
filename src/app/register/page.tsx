"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/auth/register', { email, password, role });
      toast.success('Inscription réussie !');
      router.push('/login');
    } catch (error) {
      toast.error('Erreur d’inscription');
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6">Inscription</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="student">Étudiant</option>
              <option value="teacher">Professeur</option>
            </select>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              S’inscrire
            </button>
          </form>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mt-4 p-2 bg-gray-200 dark:bg-gray-700 rounded w-full"
          >
            {darkMode ? 'Mode clair' : 'Mode sombre'}
          </button>
        </motion.div>
      </div>
    </div>
  );
}