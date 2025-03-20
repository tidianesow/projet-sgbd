"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      router.push('/dashboard');
    }
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role); // Assurez-vous que le backend renvoie le rôle
      toast.success('Connexion réussie !');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Erreur de connexion');
    }
  };

  const handleOAuth = (provider: string) => {
    window.location.href = `http://localhost:5000/auth/${provider}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6 mt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
            Connexion à votre espace
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
            Accédez à votre tableau de bord personnalisé pour gérer vos exercices ou soumettre vos réponses. Connectez-vous avec vos identifiants ou utilisez un compte OAuth pour une expérience rapide et sécurisée.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adresse email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@domaine.com"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition duration-200"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Se connecter
            </button>
          </form>
          <div className="mt-6 space-y-3">
            <button
              onClick={() => handleOAuth('google')}
              className="w-full p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
            >
              Connexion avec Google
            </button>
            <button
              onClick={() => handleOAuth('github')}
              className="w-full p-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition duration-300"
            >
              Connexion avec GitHub
            </button>
            <button
              onClick={() => handleOAuth('microsoft')}
              className="w-full p-3 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition duration-300"
            >
              Connexion avec Microsoft
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
            Pas encore inscrit ? <a href="/register" className="text-indigo-600 hover:underline">Créez un compte</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}