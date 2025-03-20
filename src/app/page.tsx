"use client";
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, BarChart2, MessageSquare, Database, Shield, Brain, Upload } from 'lucide-react';

export default function Home() {
  const features = [
    { title: "Correction Automatique", desc: "Évaluation rapide des exercices SQL avec IA.", icon: <CheckCircle className="h-6 w-6" /> },
    { title: "Tableaux de Bord", desc: "Visualisez les progrès avec des graphiques.", icon: <BarChart2 className="h-6 w-6" /> },
    { title: "Feedback Détaillé", desc: "Conseils personnalisés pour s’améliorer.", icon: <MessageSquare className="h-6 w-6" /> },
    { title: "Focus SGBD", desc: "Spécialisé en bases de données et SQL.", icon: <Database className="h-6 w-6" /> },
    { title: "Sécurité", desc: "Détection de plagiat et stockage sécurisé.", icon: <Shield className="h-6 w-6" /> },
    { title: "IA Évolutive", desc: "S’adapte aux retours des professeurs.", icon: <Brain className="h-6 w-6" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      {/* Hero */}
      <section className="py-20 md:py-28 bg-white dark:bg-gray-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
              Plateforme Éducative SGBD
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Apprenez et Enseignez les <span className="text-indigo-600 dark:text-indigo-400">SGBD</span> avec l’IA
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Une plateforme intelligente pour créer des exercices, soumettre des réponses, et recevoir des corrections automatiques avec des analyses détaillées.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/register" className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center">
                Commencer <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/login" className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                Se connecter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Fonctionnalités Clés</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour maîtriser ou enseigner les bases de données.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-indigo-600 dark:text-indigo-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Comment Ça Marche</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Un processus simple pour une expérience fluide.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Soumettre", desc: "Téléversez vos exercices ou réponses en PDF.", icon: <Upload className="h-6 w-6" /> },
              { step: "2", title: "Correction", desc: "L’IA évalue automatiquement vos travaux.", icon: <CheckCircle className="h-6 w-6" /> },
              { step: "3", title: "Analyser", desc: "Consultez feedbacks et statistiques.", icon: <BarChart2 className="h-6 w-6" /> },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.5 }}
                className="relative bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md"
              >
                <div className="absolute -top-4 left-4 bg-indigo-600 text-white h-8 w-8 rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div className="text-indigo-600 dark:text-indigo-400 mt-4 mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Rejoignez la Révolution SGBD</h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Simplifiez l’apprentissage et l’enseignement avec une plateforme intuitive et puissante.
            </p>
            <Link href="/register" className="px-6 py-3 bg-white text-indigo-600 rounded-md hover:bg-gray-100 transition-colors">
              Inscrivez-vous gratuitement
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}