"use client";

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'fittrack-exercise-log';

type ExerciseLog = Record<string, boolean>;

export function useExerciseLog() {
  const [log, setLog] = useState<ExerciseLog>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedLog = localStorage.getItem(STORAGE_KEY);
      if (storedLog) {
        setLog(JSON.parse(storedLog));
      }
    } catch (error) {
      console.error("Failed to parse exercise log from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  const toggleComplete = useCallback((exerciseId: string) => {
    setLog(prevLog => {
      const newLog = { ...prevLog, [exerciseId]: !prevLog[exerciseId] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newLog));
      } catch (error) {
        console.error("Failed to save exercise log to localStorage", error);
      }
      return newLog;
    });
  }, []);

  const isCompleted = useCallback((exerciseId: string) => !!log[exerciseId], [log]);

  return { isLoaded, isCompleted, toggleComplete, log };
}
