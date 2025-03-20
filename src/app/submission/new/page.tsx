"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Headbar from '../../../components/Headbar';
import Sidebar from '../../../components/Sidebar';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function SubmissionNew() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [exerciseId, setExerciseId] = useState('');
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !exerciseId) {
      toast.error('Veuillez remplir tous les champs.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('exerciseId', exerciseId);

    try {
      await axios.post('http://localhost:5000/submission/', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Soumission réussie !');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Erreur lors de la soumission.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Headbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />
      <main className="ml-0 md:ml-64 pt-16 p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Nouvelle Soumission</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Téléversez votre fichier PDF pour soumettre votre réponse à l’exercice.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">ID de l’exercice</label>
              <input
                type="text"
                value={exerciseId}
                onChange={(e) => setExerciseId(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ex: 123"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Fichier PDF</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Soumettre
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}