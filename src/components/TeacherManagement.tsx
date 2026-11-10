import React, { useEffect, useState } from 'react';
import { TeacherDashboard } from './TeacherDashboard';
import { UserProgress } from '../types';
import { useAuth } from '../utils/AuthContext';

/**
 * Component visible only to teachers.
 * It loads the list of students (their progress) from localStorage
 * and renders the TeacherDashboard.
 */
export const TeacherManagement: React.FC = () => {
  const { user } = useAuth();
  const [classStudents, setClassStudents] = useState<UserProgress[]>([]);

  useEffect(() => {
    if (user.role !== 'teacher') return;
    const CLASS_KEY = 'global_success_8_class_students';
    const saved = localStorage.getItem(CLASS_KEY);
    if (saved) {
      try {
        const arr = JSON.parse(saved);
        setClassStudents(arr);
      } catch (e) {
        console.warn('Failed to parse class student data', e);
      }
    }
  }, [user.role]);

  // Hide component for non‑teacher users
  if (user.role !== 'teacher') return null;

  return <TeacherDashboard classStudents={classStudents} />;
};
