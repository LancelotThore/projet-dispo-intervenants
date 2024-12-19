"use client";

import { useEffect, useState } from 'react';
import { fetchIntervenantByKey } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import Calendar from '@/app/ui/calendar';
import { checkAvailabilityAndWorkweek } from '@/app/lib/actions';
import { useRouter } from 'next/router';

interface AvailabilitySlot {
  start_time: string;
  end_time: string;
}

interface Intervenant {
  availability: Record<string, AvailabilitySlot[]>;  // Définir le type de `availability`
  firstname: string;
  lastname: string;
  last_modified?: string;
  key: string;
}

const AvailabilityPage: React.FC = () => {
  const router = useRouter();
  const { key } = router.query; // Récupérer le paramètre key avec useRouter
  const [intervenant, setIntervenant] = useState<Intervenant | null>(null);
  const [missingWeeks, setMissingWeeks] = useState<string[]>([]);
  const [insufficientHours, setInsufficientHours] = useState<{ week: string; totalHours: number; requiredHours: number }[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      if (!key || typeof key !== 'string') {
        return; // Ne pas continuer si key est invalide
      }

      const { valid, intervenant, message = '' } = await fetchIntervenantByKey(key); // Définir message comme une chaîne vide par défaut

      if (!valid) {
        if (message === 'Clé inconnue') {
          notFound();
        }
        setMessage(message); // Message sera toujours une chaîne de caractères
        return;
      }

      const { missingWeeks, insufficientHours } = await checkAvailabilityAndWorkweek(key);
      setIntervenant(intervenant);
      setMissingWeeks(missingWeeks);
      setInsufficientHours(insufficientHours);
    };

    if (key) {
      fetchData();
    }
  }, [key]);

  if (!key) {
    // Optionnel : gérer lorsque key n'est pas encore disponible (avant que le routage soit terminé)
    return <div>Chargement...</div>;
  }

  if (message) {
    return <div>{message}</div>;
  }

  if (!intervenant) {
    return <div>Chargement...</div>;
  }

  // Transformation de la disponibilité dans le format attendu par le composant Calendar
  const formattedAvailability = Object.keys(intervenant.availability || {}).reduce((acc, day) => {
    acc[day] = intervenant.availability[day].map(timeSlot => ({
      days: day,  // jour de la semaine
      from: timeSlot.start_time,  // heure de début
      to: timeSlot.end_time  // heure de fin
    }));
    return acc;
  }, {} as Record<string, { days: string; from: string; to: string }[]>);

  return (
    <main className="container m-auto my-8">     
        <h1 className="text-center text-4xl mb-8">Disponibilités de {intervenant.firstname} {intervenant.lastname}</h1>
        {intervenant.last_modified && (
          <div className="text-center text-gray-600 mb-4">
            Dernière modification: {new Date(intervenant.last_modified).toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "short", timeZone: "Europe/Paris" })}
          </div>
        )}
        {missingWeeks.length > 0 && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
            <strong className="font-bold">Attention!</strong>
            <span className="block sm:inline"> Vous n&apos;avez pas encore saisi de disponibilités pour les semaines: {missingWeeks.join(', ')}.</span>
          </div>
        )}
        {insufficientHours.length > 0 && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <strong className="font-bold">Attention!</strong>
            <span className="block sm:inline"> Vous avez saisi moins d&apos;heures que nécessaire pour les semaines suivantes:</span>
            <ul className="list-disc list-inside">
              {insufficientHours.map(({ week, totalHours, requiredHours }) => (
                <li key={week}>Semaine {week}: {totalHours} heures saisies, {requiredHours} heures requises</li>
              ))}
            </ul>
          </div>
        )}
        <Calendar availability={formattedAvailability} intervenantKey={intervenant.key} />
    </main>
  );
};

export default AvailabilityPage;