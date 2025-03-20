"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function RefineSubmission() {
  const [submission, setSubmission] = useState<any>(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const { submissionId } = useParams();

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await axios.get('http://localhost:5000/submission/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const sub = response.data.find((s: any) => s.id === parseInt(submissionId as string));
        if (!sub) throw new Error('Soumission introuvable');
        setSubmission(sub);
        setGrade(sub.grade !== null ? sub.grade.toString() : '');
        setFeedback(sub.feedback || '');
      } catch (error) {
        toast.error('Erreur lors du chargement');
        router.push('/dashboard');
      }
    };
    fetchSubmission();
  }, [submissionId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/submission/refine/${submissionId}`,
        { grade: parseInt(grade), feedback },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      toast.success('Soumission mise à jour !');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  if (!submission) return <div>Chargement...</div>;

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6">Affiner la soumission #{submissionId}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Note (sur 20)</label>
              <input
                type="number"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                min="0"
                max="20"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Feedback</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Feedback détaillé"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                rows={5}
                required
              />
            </div>
            <button type="submit" className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600">
              Mettre à jour
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