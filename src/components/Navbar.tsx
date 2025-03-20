"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sun, Moon, LogOut, Menu, X, User, Upload, BookOpen } from 'lucide-react';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    setIsLoggedIn(!!token);
    setRole(userRole);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole(null);
    router.push('/login');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-indigo-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">SGBD Platform</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="flex items-center text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <User className="h-5 w-5 mr-1" /> Dashboard
                </Link>
                {role === 'teacher' && (
                  <Link href="/exercise/new" className="flex items-center text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <BookOpen className="h-5 w-5 mr-1" /> Nouvel exercice
                  </Link>
                )}
                {role === 'student' && (
                  <Link href="/submission/new" className="flex items-center text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <Upload className="h-5 w-5 mr-1" /> Soumettre
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-1" /> Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Se connecter
                </Link>
                <Link href="/register" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                  S’inscrire
                </Link>
              </>
            )}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-white dark:bg-gray-800 px-4 py-2 space-y-2"
          >
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">Dashboard</Link>
                {role === 'teacher' && (
                  <Link href="/exercise/new" className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">Nouvel exercice</Link>
                )}
                {role === 'student' && (
                  <Link href="/submission/new" className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">Soumettre</Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-600 hover:text-red-700"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">Se connecter</Link>
                <Link href="/register" className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">S’inscrire</Link>
              </>
            )}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full text-left text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {darkMode ? 'Mode Clair' : 'Mode Sombre'}
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}