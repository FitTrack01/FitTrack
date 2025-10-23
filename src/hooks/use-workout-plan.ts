"use client";

import { useState, useEffect, useCallback } from 'react';
import type { WorkoutPlan } from '@/ai/flows/get-workout-plan';
import { differenceInDays, parseISO } from 'date-fns';

const PLAN_STORAGE_KEY = 'fittrack-workout-plan';
const START_DATE_STORAGE_KEY = 'fittrack-workout-start-date';

export function useWorkoutPlan() {
  const [activePlan, setActivePlan] = useState<WorkoutPlan | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(PLAN_STORAGE_KEY);
      const storedStartDate = localStorage.getItem(START_DATE_STORAGE_KEY);
      if (storedPlan && storedStartDate) {
        setActivePlan(JSON.parse(storedPlan));
        setStartDate(storedStartDate);
      }
    } catch (error) {
      console.error("Failed to parse workout plan from localStorage", error);
    }
    setIsLoaded(true);
  }, []);
  
  const savePlan = useCallback((plan: WorkoutPlan) => {
    const today = new Date().toISOString();
    try {
      localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plan));
      localStorage.setItem(START_DATE_STORAGE_KEY, today);
      setActivePlan(plan);
      setStartDate(today);
    } catch (error) {
       console.error("Failed to save workout plan to localStorage", error);
    }
  }, []);

  const clearPlan = useCallback(() => {
     try {
      localStorage.removeItem(PLAN_STORAGE_KEY);
      localStorage.removeItem(START_DATE_STORAGE_KEY);
      setActivePlan(null);
      setStartDate(null);
    } catch (error) {
       console.error("Failed to clear workout plan from localStorage", error);
    }
  }, []);
  
  const currentDayIndex = startDate ? differenceInDays(new Date(), parseISO(startDate)) : 0;

  return {
    isLoaded,
    activePlan,
    savePlan,
    clearPlan,
    currentDayIndex,
  };
}
