"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Menu, X, Sun, Moon } from 'lucide-react';

export default function Headbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 w-full z-50 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">
          <Menu className="h-6 w-6" />
        </button>
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-indigo-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="text-xl font-semibold text-gray-900 dark:text-white">SGBD Platform</span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => {
            setDarkMode(!darkMode);
            document.documentElement.classList.toggle('dark');
          }}
          className="p-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-1" /> Déconnexion
        </button>
      </div>
    </header>
  );
}