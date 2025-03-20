"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (!userRole) {
      router.push('/login');
    } else {
      setRole(userRole);
    }
  }, [router]);

  if (!role) return <div>Chargement...</div>;

  return (
    <div>
      <h1>{role === 'student' ? 'Dashboard Étudiant' : 'Dashboard Professeur'}</h1>
      <p>Rôle : {role}</p>
    </div>
  );
}