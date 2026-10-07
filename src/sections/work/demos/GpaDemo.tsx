'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'motion/react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import DeviceFrame from '@/components/ui/DeviceFrame';
import { easeCss, springUi } from '@/components/motion/tokens';
import { useReducedMotion } from '@/components/motion/useReducedMotion';

const GRADES = [
  { value: 'A', label: 'A', points: 4 },
  { value: 'A-', label: 'A−', points: 3.7 },
  { value: 'B+', label: 'B+', points: 3.3 },
  { value: 'B', label: 'B', points: 3 },
  { value: 'B-', label: 'B−', points: 2.7 },
  { value: 'C+', label: 'C+', points: 2.3 },
  { value: 'C', label: 'C', points: 2 },
  { value: 'D', label: 'D', points: 1 },
  { value: 'E', label: 'E', points: 0 },
] as const;

type Grade = (typeof GRADES)[number]['value'];

const POINTS = Object.fromEntries(GRADES.map((g) => [g.value, g.points])) as Record<Grade, number>;
const SKS_OPTIONS = [1, 2, 3, 4, 5, 6] as const;
const MAX_ROWS = 6;
const MIN_ROWS = 1;

interface Course {
  id: number;
  name: string;
  sks: number;
  grade: Grade;
}

// Fictional courses — demo data only.
const INITIAL_COURSES: Course[] = [
  { id: 1, name: 'Interface Studio', sks: 3, grade: 'A' },
  { id: 2, name: 'Data Wrangling', sks: 4, grade: 'B+' },
  { id: 3, name: 'Systems Thinking', sks: 2, grade: 'A-' },
];
const EXTRA_NAMES = ['Creative Coding', 'Ethics & Tech', 'Cloud Basics'];

const RING_R = 42;
const RING_C = 2 * Math.PI * RING_R;
const GRID_COLS = 'grid-cols-[minmax(0,1fr)_3.25rem_4.25rem_2rem]';

function computeGpa(courses: Course[]) {
  const totalSks = courses.reduce((sum, c) => sum + c.sks, 0);
  const totalPoints = courses.reduce((sum, c) => sum + POINTS[c.grade] * c.sks, 0);
  return { totalSks, gpa: totalSks > 0 ? totalPoints / totalSks : 0 };
}

interface GpaDemoProps {
  className?: string;
}

export default function GpaDemo({ className = '' }: GpaDemoProps) {
  const reduced = useReducedMotion();
  const uid = useId();
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const focusAfterRemove = useRef<string | null>(null);

  const { gpa, totalSks } = computeGpa(courses);
  const atMax = courses.length >= MAX_ROWS;
  const atMin = courses.length <= MIN_ROWS;
  const hintId = `${uid}-hint`;

  // Tweened GPA drives both the number and the ring
  const gpaValue = useMotionValue(gpa);
  const gpaText = useTransform(gpaValue, (v) => v.toFixed(2));
  const dashOffset = useTransform(gpaValue, (v) => RING_C * (1 - Math.min(Math.max(v, 0), 4) / 4));

  useEffect(() => {
    if (reduced) {
      gpaValue.set(gpa);
      return;
    }
    const controls = animate(gpaValue, gpa, { duration: 0.6, ease: easeCss.out });
    return () => controls.stop();
  }, [gpa, reduced, gpaValue]);

  // Removing a row deletes the focused button — hand focus to a sensible neighbour
  useEffect(() => {
    const target = focusAfterRemove.current;
    if (!target) return;
    focusAfterRemove.current = null;
    document.getElementById(target)?.focus();
  }, [courses]);

  function update(id: number, patch: Partial<Omit<Course, 'id'>>) {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  function addCourse() {
    if (atMax) return;
    const used = new Set(courses.map((c) => c.name));
    const name = EXTRA_NAMES.find((n) => !used.has(n)) ?? `Course ${courses.length + 1}`;
    const id = Math.max(0, ...courses.map((c) => c.id)) + 1;
    setCourses([...courses, { id, name, sks: 3, grade: 'B' }]);
  }

  function removeCourse(index: number) {
    if (atMin) return;
    const next = courses.filter((_, i) => i !== index);
    const neighbour = next[Math.min(index, next.length - 1)];
    focusAfterRemove.current = neighbour ? `${uid}-remove-${neighbour.id}` : `${uid}-add`;
    setCourses(next);
  }

  const rowTransition = reduced ? { duration: 0 } : springUi;
  const hint = atMax
    ? `Maximum of ${MAX_ROWS} courses reached.`
    : atMin
      ? 'At least one course is required.'
      : `${courses.length} of ${MAX_ROWS} courses. Edit names, SKS and grades.`;

  return (
    <DeviceFrame screenClassName="bg-[#F5F3FF]" className={className}>
      <div className="flex flex-col gap-4 px-3 pb-4 text-[#1E1B3A]">
        {/* App bar */}
        <div className="px-1">
          <p className="flex items-center gap-1 text-[0.6875rem] font-bold text-accent-temankuliah">
            <GraduationCap aria-hidden="true" className="h-3.5 w-3.5" />
            TemanKuliah
          </p>
          <p className="text-lg font-extrabold leading-tight">GPA Calculator</p>
        </div>

        {/* Result */}
        <div aria-live="polite" aria-atomic="true">
          <p className="sr-only">
            {`GPA ${gpa.toFixed(2)} out of 4.00, from ${totalSks} SKS across ${courses.length} ${
              courses.length === 1 ? 'course' : 'courses'
            }.`}
          </p>
          <div
            aria-hidden="true"
            className="flex items-center gap-4 rounded-3xl bg-gradient-to-br from-[#5B3FD9] to-[#4328B8] p-4 text-white shadow-lg shadow-[#5B3FD9]/30"
          >
            <div className="relative h-24 w-24 shrink-0">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r={RING_R} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r={RING_R}
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={RING_C}
                  style={{ strokeDashoffset: dashOffset }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span className="text-2xl font-extrabold leading-none tabular-nums">{gpaText}</motion.span>
                <span className="mt-0.5 text-[0.625rem] font-medium text-white/80">/ 4.00</span>
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-white/80">Semester GPA</p>
              <p className="text-lg font-bold leading-tight">
                {totalSks} <span className="text-sm font-semibold">SKS</span>
              </p>
              <p className="text-xs text-white/80">
                {courses.length} {courses.length === 1 ? 'course' : 'courses'}
              </p>
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className="flex flex-col gap-1.5">
          <div
            aria-hidden="true"
            className={`grid ${GRID_COLS} gap-1.5 px-2 font-mono text-[0.625rem] uppercase tracking-wider text-[#5E5A7E]`}
          >
            <span className="px-1">Course</span>
            <span>SKS</span>
            <span>Grade</span>
            <span />
          </div>

          <ul className="relative flex flex-col gap-1.5">
            <AnimatePresence mode="popLayout" initial={false}>
              {courses.map((course, i) => {
                const label = course.name.trim() || `course ${i + 1}`;
                const nameId = `${uid}-name-${course.id}`;
                const sksId = `${uid}-sks-${course.id}`;
                const gradeId = `${uid}-grade-${course.id}`;
                return (
                  <motion.li
                    key={course.id}
                    layout
                    initial={{ opacity: 0, y: reduced ? 0 : -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
                    transition={rowTransition}
                    className={`relative grid ${GRID_COLS} items-center gap-1.5 rounded-xl bg-white px-2 py-1.5 shadow-sm ring-1 ring-[#E4DEFB]`}
                  >
                    <label htmlFor={nameId} className="sr-only">
                      Course name, row {i + 1}
                    </label>
                    <input
                      id={nameId}
                      type="text"
                      value={course.name}
                      maxLength={32}
                      placeholder="Course name"
                      onChange={(e) => update(course.id, { name: e.target.value })}
                      className="min-w-0 truncate rounded-md bg-transparent px-1 py-1 text-[0.8125rem] font-semibold text-[#1E1B3A] placeholder:text-[#6B6890] hover:bg-[#F5F3FF] focus:bg-[#F5F3FF]"
                    />

                    <label htmlFor={sksId} className="sr-only">
                      Credits (SKS) for {label}
                    </label>
                    <select
                      id={sksId}
                      value={course.sks}
                      onChange={(e) => update(course.id, { sks: Number(e.target.value) })}
                      className="w-full rounded-lg border border-[#DDD6FE] bg-[#FAF9FF] px-1.5 py-1 text-[0.8125rem] font-medium text-[#1E1B3A]"
                    >
                      {SKS_OPTIONS.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>

                    <label htmlFor={gradeId} className="sr-only">
                      Grade for {label}
                    </label>
                    <select
                      id={gradeId}
                      value={course.grade}
                      onChange={(e) => update(course.id, { grade: e.target.value as Grade })}
                      className="w-full rounded-lg border border-[#DDD6FE] bg-[#FAF9FF] px-1.5 py-1 text-[0.8125rem] font-medium text-[#1E1B3A]"
                    >
                      {GRADES.map((g) => (
                        <option key={g.value} value={g.value}>
                          {g.label}
                        </option>
                      ))}
                    </select>

                    <button
                      id={`${uid}-remove-${course.id}`}
                      type="button"
                      onClick={() => removeCourse(i)}
                      aria-label={`Remove ${label}`}
                      aria-disabled={atMin || undefined}
                      aria-describedby={atMin ? hintId : undefined}
                      title={atMin ? 'Keep at least one course' : `Remove ${label}`}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-micro ease-out ${
                        atMin
                          ? 'cursor-not-allowed text-[#A7A3C2]'
                          : 'text-[#5E5A7E] hover:bg-[#FDECEC] hover:text-[#B42318]'
                      }`}
                    >
                      <Trash2 aria-hidden="true" className="h-4 w-4" />
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>

          <button
            id={`${uid}-add`}
            type="button"
            onClick={addCourse}
            aria-disabled={atMax || undefined}
            aria-describedby={hintId}
            title={atMax ? `Maximum of ${MAX_ROWS} courses` : undefined}
            className={`mt-1 flex min-h-10 items-center justify-center gap-1.5 rounded-xl border-2 border-dashed text-sm font-semibold transition-colors duration-micro ease-out ${
              atMax
                ? 'cursor-not-allowed border-[#DDD6FE] text-[#7A76A0]'
                : 'border-[#C4B5FD] text-accent-temankuliah hover:bg-white'
            }`}
          >
            <Plus aria-hidden="true" className="h-4 w-4" />
            Add course
          </button>
          <p id={hintId} className="px-1 text-[0.6875rem] text-[#5E5A7E]">
            {hint}
          </p>
        </div>

        <p className="px-1 font-mono text-[0.625rem] leading-relaxed text-[#5E5A7E]">
          Scale: A 4.00 · A− 3.70 · B+ 3.30 · B 3.00 · B− 2.70 · C+ 2.30 · C 2.00 · D 1.00 · E 0.00
        </p>

        <span aria-hidden="true" className="mx-auto h-1 w-24 rounded-full bg-[#1E1B3A]/20" />
      </div>
    </DeviceFrame>
  );
}
