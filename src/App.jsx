import React, { useState, useEffect, useRef } from 'react';
import { Swords, Flame, Heart, Zap, Dumbbell, Trophy, Target, Check, Plus, X, Trash2, Search, ArrowLeft, Shield, Crown, Star, Apple, Camera, Loader, Scale, BarChart3, TrendingUp, TrendingDown, Calendar, Skull, Medal, Download, Upload, Save } from 'lucide-react';

const TITLES = [
  { level: 1, name: "Apprentice" },
  { level: 3, name: "Iron Squire" },
  { level: 5, name: "Forge Knight" },
  { level: 8, name: "Steel Warden" },
  { level: 12, name: "Iron Baron" },
  { level: 16, name: "Forge Master" },
  { level: 20, name: "Legendary Ironlord" },
  { level: 25, name: "Mythic Titan" },
];

const EXERCISE_LIBRARY = {
  Chest: ["Bench Press", "Incline Bench Press", "Decline Bench Press", "Dumbbell Bench Press", "Incline DB Press", "Dumbbell Flyes", "Cable Flyes", "Push-Ups", "Dips", "Pec Deck"],
  Back: ["Pull-Ups", "Lat Pulldown", "Barbell Row", "Dumbbell Row", "Seated Cable Row", "T-Bar Row", "Face Pulls", "Deadlift", "Shrugs", "Rear Delt Flyes"],
  Shoulders: ["Overhead Press", "Dumbbell Shoulder Press", "Lateral Raises", "Front Raises", "Arnold Press", "Upright Row", "Cable Lateral Raises"],
  Arms: ["Bicep Curls", "Hammer Curls", "Preacher Curls", "Cable Curls", "Tricep Pushdowns", "Skull Crushers", "Overhead Tricep Extension", "Close-Grip Bench"],
  Legs: ["Back Squat", "Front Squat", "Romanian Deadlift", "Leg Press", "Walking Lunges", "Bulgarian Split Squats", "Leg Extensions", "Leg Curls", "Calf Raises", "Hip Thrusts", "Goblet Squat"],
  Core: ["Plank", "Hanging Leg Raises", "Russian Twists", "Crunches", "Ab Rollout", "Cable Crunches", "Mountain Climbers", "Dead Bug", "Side Plank"],
  Cardio: ["Incline Treadmill Walk", "Treadmill Run", "Bike Intervals", "Stairmaster", "Rowing Machine", "Jump Rope", "Elliptical", "Sprints"],
};

const ALL_EXERCISES = Object.values(EXERCISE_LIBRARY).flat();

const FOOD_DATABASE = [
  { name: "Chicken breast (4oz)", cal: 185, protein: 35, carbs: 0, fat: 4 },
  { name: "Ground beef 85/15 (4oz)", cal: 240, protein: 22, carbs: 0, fat: 17 },
  { name: "Salmon (4oz)", cal: 235, protein: 25, carbs: 0, fat: 14 },
  { name: "Eggs (2 large)", cal: 140, protein: 12, carbs: 1, fat: 10 },
  { name: "Tuna can (5oz)", cal: 140, protein: 30, carbs: 0, fat: 1 },
  { name: "Greek yogurt (1 cup)", cal: 130, protein: 20, carbs: 9, fat: 0 },
  { name: "Cottage cheese (1 cup)", cal: 220, protein: 25, carbs: 9, fat: 10 },
  { name: "Whey protein scoop", cal: 120, protein: 25, carbs: 3, fat: 1 },
  { name: "Turkey breast (4oz)", cal: 155, protein: 34, carbs: 0, fat: 1 },
  { name: "White rice (1 cup cooked)", cal: 205, protein: 4, carbs: 45, fat: 0 },
  { name: "Brown rice (1 cup cooked)", cal: 215, protein: 5, carbs: 45, fat: 2 },
  { name: "Oatmeal (1 cup cooked)", cal: 165, protein: 6, carbs: 28, fat: 3 },
  { name: "Sweet potato (medium)", cal: 115, protein: 2, carbs: 27, fat: 0 },
  { name: "White potato (medium)", cal: 160, protein: 4, carbs: 37, fat: 0 },
  { name: "Pasta (1 cup cooked)", cal: 220, protein: 8, carbs: 43, fat: 1 },
  { name: "Bread slice", cal: 80, protein: 3, carbs: 15, fat: 1 },
  { name: "Bagel", cal: 270, protein: 10, carbs: 53, fat: 2 },
  { name: "Tortilla (flour)", cal: 150, protein: 4, carbs: 24, fat: 4 },
  { name: "Banana", cal: 105, protein: 1, carbs: 27, fat: 0 },
  { name: "Apple", cal: 95, protein: 0, carbs: 25, fat: 0 },
  { name: "Blueberries (1 cup)", cal: 85, protein: 1, carbs: 21, fat: 0 },
  { name: "Broccoli (1 cup)", cal: 55, protein: 4, carbs: 11, fat: 1 },
  { name: "Spinach (1 cup)", cal: 7, protein: 1, carbs: 1, fat: 0 },
  { name: "Avocado (half)", cal: 160, protein: 2, carbs: 9, fat: 15 },
  { name: "Chipotle chicken bowl (typical)", cal: 750, protein: 50, carbs: 65, fat: 30 },
  { name: "Big Mac", cal: 550, protein: 25, carbs: 45, fat: 30 },
  { name: "McDonald's medium fries", cal: 320, protein: 4, carbs: 43, fat: 15 },
  { name: "Subway 6in turkey", cal: 280, protein: 18, carbs: 40, fat: 4 },
  { name: "Slice of pizza (cheese)", cal: 285, protein: 12, carbs: 36, fat: 10 },
  { name: "Chick-fil-A sandwich", cal: 440, protein: 28, carbs: 41, fat: 19 },
  { name: "Peanut butter (2 tbsp)", cal: 190, protein: 8, carbs: 7, fat: 16 },
  { name: "Almonds (1 oz)", cal: 165, protein: 6, carbs: 6, fat: 14 },
  { name: "Cheese slice", cal: 110, protein: 7, carbs: 1, fat: 9 },
  { name: "Olive oil (1 tbsp)", cal: 120, protein: 0, carbs: 0, fat: 14 },
  { name: "Protein bar (typical)", cal: 210, protein: 20, carbs: 20, fat: 7 },
  { name: "Milk (1 cup, 2%)", cal: 120, protein: 8, carbs: 12, fat: 5 },
];

const WORKOUT_SETS = {
  beginner: {
    fullbody_a: {
      name: "Full Body A", icon: "A", color: "from-red-600 to-red-800", stat: "STR",
      exercises: [
        { name: "Goblet Squat", sets: 3, reps: "10" },
        { name: "Push-Ups", sets: 3, reps: "8-10" },
        { name: "Dumbbell Row", sets: 3, reps: "10" },
        { name: "Plank", sets: 3, reps: "30 sec" },
      ]
    },
    fullbody_b: {
      name: "Full Body B", icon: "B", color: "from-red-500 to-rose-700", stat: "STR",
      exercises: [
        { name: "Romanian Deadlift", sets: 3, reps: "10" },
        { name: "Dumbbell Shoulder Press", sets: 3, reps: "10" },
        { name: "Lat Pulldown", sets: 3, reps: "10" },
        { name: "Dead Bug", sets: 3, reps: "10 each" },
      ]
    },
    light_cardio: {
      name: "Easy Cardio", icon: "C", color: "from-orange-600 to-red-700", stat: "END",
      exercises: [
        { name: "Incline Treadmill Walk", sets: 1, reps: "20 min" },
        { name: "Plank", sets: 2, reps: "30 sec" },
        { name: "Crunches", sets: 2, reps: "15" },
      ]
    },
  },
  intermediate: {
    push: {
      name: "Push Day", icon: "P", color: "from-red-500 to-red-800", stat: "STR",
      exercises: [
        { name: "Bench Press", sets: 4, reps: "6-8" },
        { name: "Overhead Press", sets: 3, reps: "8-10" },
        { name: "Incline DB Press", sets: 3, reps: "10-12" },
        { name: "Lateral Raises", sets: 3, reps: "12-15" },
        { name: "Tricep Pushdowns", sets: 3, reps: "10-12" },
      ]
    },
    pull: {
      name: "Pull Day", icon: "L", color: "from-rose-600 to-red-900", stat: "STR",
      exercises: [
        { name: "Pull-Ups", sets: 4, reps: "6-10" },
        { name: "Barbell Row", sets: 3, reps: "8-10" },
        { name: "Seated Cable Row", sets: 3, reps: "10-12" },
        { name: "Face Pulls", sets: 3, reps: "12-15" },
        { name: "Bicep Curls", sets: 3, reps: "10-12" },
      ]
    },
    lower: {
      name: "Lower Body", icon: "X", color: "from-red-700 to-red-950", stat: "STR",
      exercises: [
        { name: "Back Squat", sets: 4, reps: "6-8" },
        { name: "Romanian Deadlift", sets: 3, reps: "8-10" },
        { name: "Leg Press", sets: 3, reps: "10-12" },
        { name: "Walking Lunges", sets: 3, reps: "12 each" },
        { name: "Calf Raises", sets: 4, reps: "12-15" },
      ]
    },
    cardio: {
      name: "Cardio + Core", icon: "R", color: "from-orange-500 to-red-700", stat: "END",
      exercises: [
        { name: "Incline Treadmill Walk", sets: 1, reps: "20-30 min" },
        { name: "Hanging Leg Raises", sets: 3, reps: "10-12" },
        { name: "Plank", sets: 3, reps: "45-60 sec" },
        { name: "Russian Twists", sets: 3, reps: "20" },
      ]
    },
  },
  expert: {
    chest_tri: {
      name: "Chest + Triceps", icon: "C", color: "from-red-500 to-pink-700", stat: "STR",
      exercises: [
        { name: "Bench Press", sets: 5, reps: "5" },
        { name: "Incline Bench Press", sets: 4, reps: "6-8" },
        { name: "Dumbbell Flyes", sets: 4, reps: "10-12" },
        { name: "Dips", sets: 4, reps: "AMRAP" },
        { name: "Skull Crushers", sets: 4, reps: "8-10" },
        { name: "Tricep Pushdowns", sets: 3, reps: "12-15" },
      ]
    },
    back_bi: {
      name: "Back + Biceps", icon: "B", color: "from-red-700 to-red-950", stat: "STR",
      exercises: [
        { name: "Deadlift", sets: 5, reps: "5" },
        { name: "Pull-Ups", sets: 4, reps: "8-10" },
        { name: "Barbell Row", sets: 4, reps: "6-8" },
        { name: "T-Bar Row", sets: 3, reps: "10" },
        { name: "Bicep Curls", sets: 4, reps: "8-10" },
        { name: "Hammer Curls", sets: 3, reps: "10-12" },
      ]
    },
    legs: {
      name: "Heavy Legs", icon: "L", color: "from-rose-700 to-red-900", stat: "STR",
      exercises: [
        { name: "Back Squat", sets: 5, reps: "5" },
        { name: "Romanian Deadlift", sets: 4, reps: "6-8" },
        { name: "Bulgarian Split Squats", sets: 3, reps: "8 each" },
        { name: "Leg Press", sets: 4, reps: "10-12" },
        { name: "Leg Curls", sets: 4, reps: "10" },
        { name: "Calf Raises", sets: 5, reps: "12-15" },
      ]
    },
    shoulders: {
      name: "Shoulders", icon: "S", color: "from-red-600 to-rose-800", stat: "STR",
      exercises: [
        { name: "Overhead Press", sets: 5, reps: "5" },
        { name: "Arnold Press", sets: 4, reps: "8-10" },
        { name: "Lateral Raises", sets: 4, reps: "12-15" },
        { name: "Rear Delt Flyes", sets: 4, reps: "12-15" },
        { name: "Face Pulls", sets: 3, reps: "15" },
        { name: "Shrugs", sets: 3, reps: "12" },
      ]
    },
    conditioning: {
      name: "Conditioning", icon: "R", color: "from-orange-600 to-red-800", stat: "END",
      exercises: [
        { name: "Sprints", sets: 8, reps: "30s on / 30s off" },
        { name: "Jump Rope", sets: 1, reps: "10 min" },
        { name: "Hanging Leg Raises", sets: 4, reps: "12" },
        { name: "Ab Rollout", sets: 4, reps: "10" },
        { name: "Plank", sets: 3, reps: "60 sec" },
      ]
    },
  }
};

const DIFFICULTY = {
  beginner: {
    name: "Apprentice",
    subtitle: "New to the forge",
    icon: Shield,
    color: "from-red-700 to-red-900",
    description: "3 days/week. Simple full-body workouts. Extra XP to get you hooked.",
    daysPerWeek: 3,
    xpMultiplier: 1.3,
    startingStats: { STR: 8, END: 8, AGI: 8 },
    streakQuestTarget: 2,
    workoutQuestTarget: 2,
    calorieTarget: 2200,
    proteinTarget: 120,
  },
  intermediate: {
    name: "Ironclad",
    subtitle: "Training consistently",
    icon: Star,
    color: "from-red-500 to-red-700",
    description: "4 days/week. Push/Pull/Lower/Cardio split. Balanced XP.",
    daysPerWeek: 4,
    xpMultiplier: 1.0,
    startingStats: { STR: 10, END: 10, AGI: 10 },
    streakQuestTarget: 3,
    workoutQuestTarget: 3,
    calorieTarget: 2400,
    proteinTarget: 150,
  },
  expert: {
    name: "Warforged",
    subtitle: "Experienced lifter",
    icon: Crown,
    color: "from-orange-500 via-red-600 to-red-900",
    description: "5 days/week. High-volume body-part splits. XP must be earned.",
    daysPerWeek: 5,
    xpMultiplier: 0.75,
    startingStats: { STR: 14, END: 12, AGI: 12 },
    streakQuestTarget: 5,
    workoutQuestTarget: 4,
    calorieTarget: 2800,
    proteinTarget: 180,
  },
};

const COLOR_OPTIONS = [
  "from-red-500 to-red-700", "from-red-600 to-rose-800", "from-orange-500 to-red-700",
  "from-rose-600 to-red-900", "from-red-700 to-red-950", "from-pink-600 to-red-800",
  "from-red-500 to-orange-700", "from-red-800 to-black",
];

const ICON_OPTIONS = ["A", "B", "C", "D", "X", "Y", "Z", "P", "R", "S"];

const BOSSES = [
  { name: "The Couch Goblin", emoji: "G", hp: 400, reward: 500, flavor: "Whispers 'just one more episode'" },
  { name: "Lord Pizza Slice", emoji: "P", hp: 550, reward: 700, flavor: "A greasy tyrant of temptation" },
  { name: "The Sleep Demon", emoji: "Z", hp: 600, reward: 750, flavor: "Beckons you back to bed" },
  { name: "Sir Skipsday", emoji: "S", hp: 700, reward: 900, flavor: "Master of 'I will go tomorrow'" },
  { name: "The Scale Wraith", emoji: "W", hp: 800, reward: 1100, flavor: "Haunts those avoiding the mirror" },
  { name: "Lord Leg Day Dodger", emoji: "D", hp: 900, reward: 1300, flavor: "Only trains the mirror muscles" },
  { name: "The Plateau Titan", emoji: "T", hp: 1100, reward: 1600, flavor: "Immovable. For now." },
];

const pickBossForWeek = (weekNum) => BOSSES[weekNum % BOSSES.length];

const ACHIEVEMENTS = [
  { id: 'first_workout', name: "First Blood", desc: "Complete your first workout", xp: 50 },
  { id: 'workouts_10', name: "Dedicated", desc: "Complete 10 workouts", xp: 100 },
  { id: 'workouts_25', name: "Committed", desc: "Complete 25 workouts", xp: 200 },
  { id: 'workouts_50', name: "Iron Willed", desc: "Complete 50 workouts", xp: 300 },
  { id: 'workouts_100', name: "Centurion", desc: "Complete 100 workouts", xp: 500 },
  { id: 'streak_3', name: "Getting Warm", desc: "3-day streak", xp: 75 },
  { id: 'streak_7', name: "Week Warrior", desc: "7-day streak", xp: 150 },
  { id: 'streak_14', name: "Fortnight Fighter", desc: "14-day streak", xp: 250 },
  { id: 'streak_30', name: "Monthly Monk", desc: "30-day streak", xp: 500 },
  { id: 'level_5', name: "Forge Knight", desc: "Reach level 5", xp: 100 },
  { id: 'level_10', name: "Iron Lord", desc: "Reach level 10", xp: 250 },
  { id: 'level_20', name: "Mythic Rank", desc: "Reach level 20", xp: 500 },
  { id: 'first_boss', name: "Boss Slayer", desc: "Defeat your first boss", xp: 200 },
  { id: 'bosses_5', name: "Legend", desc: "Defeat 5 bosses", xp: 500 },
  { id: 'first_weigh', name: "Step on the Scale", desc: "Log your first weigh-in", xp: 50 },
  { id: 'weigh_10', name: "Data Driven", desc: "Log 10 weigh-ins", xp: 150 },
  { id: 'goal_weight', name: "Goal Crusher", desc: "Hit your goal weight", xp: 300 },
  { id: 'protein_7', name: "Protein Prophet", desc: "Hit protein target 7 days", xp: 200 },
  { id: 'first_custom', name: "Architect", desc: "Build a custom workout", xp: 75 },
  { id: 'knockout_1', name: "Getting Back Up", desc: "Survive your first knockout", xp: 50 },
];

const QUIZ_QUESTIONS = [
  {
    id: 'experience',
    question: "How long have you been training?",
    subtitle: "Consistent lifting or cardio",
    options: [
      { label: "Less than 6 months", score: { beginner: 3, intermediate: 0, expert: 0 } },
      { label: "6 months to 2 years", score: { beginner: 1, intermediate: 3, expert: 0 } },
      { label: "2 to 5 years", score: { beginner: 0, intermediate: 2, expert: 2 } },
      { label: "5+ years", score: { beginner: 0, intermediate: 0, expert: 4 } },
    ]
  },
  {
    id: 'frequency',
    question: "How many days per week can you train?",
    subtitle: "Be honest",
    options: [
      { label: "2 to 3 days", score: { beginner: 3, intermediate: 0, expert: 0 } },
      { label: "4 days", score: { beginner: 0, intermediate: 3, expert: 1 } },
      { label: "5 days", score: { beginner: 0, intermediate: 2, expert: 3 } },
      { label: "6+ days", score: { beginner: 0, intermediate: 0, expert: 4 } },
    ]
  },
  {
    id: 'compound',
    question: "How familiar are you with barbell lifts?",
    subtitle: "Squat, bench, deadlift, overhead press",
    options: [
      { label: "Never done them", score: { beginner: 3, intermediate: 0, expert: 0 } },
      { label: "Learning form", score: { beginner: 2, intermediate: 2, expert: 0 } },
      { label: "Comfortable with all", score: { beginner: 0, intermediate: 3, expert: 1 } },
      { label: "Advanced / know my numbers", score: { beginner: 0, intermediate: 1, expert: 4 } },
    ]
  },
  {
    id: 'goal',
    question: "What is your main goal?",
    subtitle: "Pick the one that matters most",
    options: [
      { label: "Build a habit", score: { beginner: 3, intermediate: 0, expert: 0 } },
      { label: "Lose fat, tone up", score: { beginner: 1, intermediate: 3, expert: 1 } },
      { label: "Build muscle", score: { beginner: 0, intermediate: 3, expert: 2 } },
      { label: "Max strength", score: { beginner: 0, intermediate: 1, expert: 4 } },
    ]
  },
  {
    id: 'volume',
    question: "How long do your workouts usually last?",
    subtitle: "Actual time lifting",
    options: [
      { label: "Under 30 minutes", score: { beginner: 3, intermediate: 0, expert: 0 } },
      { label: "30 to 45 minutes", score: { beginner: 2, intermediate: 2, expert: 0 } },
      { label: "45 to 75 minutes", score: { beginner: 0, intermediate: 3, expert: 2 } },
      { label: "75+ minutes", score: { beginner: 0, intermediate: 1, expert: 4 } },
    ]
  },
];

const ACTIVITY_MULTIPLIER = { beginner: 1.375, intermediate: 1.55, expert: 1.725 };
const GOAL_ADJUSTMENT = { cut: -500, recomp: -200, maintain: 0, bulk: 300 };
const GOAL_LABELS = { cut: "Lose fat", recomp: "Recomp", maintain: "Maintain", bulk: "Lean bulk" };

const SAVE_VERSION = 'forge-1.0';

const calculateMacros = (body, diffKey) => {
  if (!body || !body.weight || !body.height || !body.age) return null;
  const weightKg = body.unit === 'metric' ? parseFloat(body.weight) : parseFloat(body.weight) * 0.453592;
  const heightCm = body.unit === 'metric' ? parseFloat(body.height) : parseFloat(body.height) * 2.54;
  const age = parseInt(body.age);
  let bmr;
  if (body.sex === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
  const tdee = bmr * (ACTIVITY_MULTIPLIER[diffKey] || 1.55);
  const adjustment = GOAL_ADJUSTMENT[body.goal] || 0;
  const calorieTarget = Math.round((tdee + adjustment) / 10) * 10;
  const weightLb = body.unit === 'metric' ? parseFloat(body.weight) * 2.20462 : parseFloat(body.weight);
  const proteinTarget = Math.round(weightLb * (body.goal === 'cut' ? 1.0 : 0.9) / 5) * 5;
  return { bmr: Math.round(bmr), tdee: Math.round(tdee), calorieTarget, proteinTarget };
};

const calculateRecommendation = (answers) => {
  const totals = { beginner: 0, intermediate: 0, expert: 0 };
  Object.values(answers).forEach(score => {
    totals.beginner += score.beginner;
    totals.intermediate += score.intermediate;
    totals.expert += score.expert;
  });
  const winner = Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
  return { winner, totals };
};

const xpForLevel = (lvl) => Math.floor(100 * Math.pow(1.15, lvl - 1));
const getTitle = (level) => {
  let title = TITLES[0].name;
  for (const t of TITLES) if (level >= t.level) title = t.name;
  return title;
};

export default function Forge() {
  const [difficulty, setDifficulty] = useState(null);
  const [playerName, setPlayerName] = useState("Kenzo");
  const [workouts, setWorkouts] = useState({});
  const [playerData, setPlayerData] = useState(null);

  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [recommendation, setRecommendation] = useState(null);

  const [bodyStats, setBodyStats] = useState({
    sex: 'male', age: '', heightFt: '', heightIn: '', height: '', weight: '', unit: 'imperial', goal: 'recomp',
  });
  const [editingBody, setEditingBody] = useState(false);

  const [activeWorkout, setActiveWorkout] = useState(null);
  const [activeExercises, setActiveExercises] = useState([]);
  const [completedExercises, setCompletedExercises] = useState({});
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showXpGain, setShowXpGain] = useState(null);
  const [view, setView] = useState('intro');

  const [builderName, setBuilderName] = useState("");
  const [builderIcon, setBuilderIcon] = useState("X");
  const [builderColor, setBuilderColor] = useState(COLOR_OPTIONS[0]);
  const [builderStat, setBuilderStat] = useState("STR");
  const [builderExercises, setBuilderExercises] = useState([]);
  const [librarySearch, setLibrarySearch] = useState("");

  const [addingExerciseInWorkout, setAddingExerciseInWorkout] = useState(false);
  const [inWorkoutSearch, setInWorkoutSearch] = useState("");
  const [showKnockout, setShowKnockout] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [daysAwayMessage, setDaysAwayMessage] = useState(null);

  const [mealsLog, setMealsLog] = useState({});
  const [foodSearch, setFoodSearch] = useState("");
  const [customFood, setCustomFood] = useState({ name: "", cal: "", protein: "", carbs: "", fat: "" });
  const [showCustomFood, setShowCustomFood] = useState(false);
  const [photoAnalyzing, setPhotoAnalyzing] = useState(false);
  const [photoResult, setPhotoResult] = useState(null);
  const [photoError, setPhotoError] = useState(null);
  const fileInputRef = useRef(null);

  const [weightLog, setWeightLog] = useState([]);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [newWeight, setNewWeight] = useState("");
  const [newBodyFat, setNewBodyFat] = useState("");
  const [goalWeight, setGoalWeight] = useState("");

  const [currentBoss, setCurrentBoss] = useState(null);
  const [bossesDefeated, setBossesDefeated] = useState(0);
  const [showBossDefeat, setShowBossDefeat] = useState(null);
  const [weekNumber, setWeekNumber] = useState(0);

  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState(null);
  const [proteinGoalDays, setProteinGoalDays] = useState([]);

  const [exerciseHistory, setExerciseHistory] = useState({});
  const [currentSetData, setCurrentSetData] = useState({});

  // --- NEW: Save data modal state ---
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null); // { type: 'success' | 'error', text: '...' }
  const importFileRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('forge-save');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.playerData && data.difficulty && data.workouts) {
          const today = new Date().toDateString();
          const lastPlayed = data.lastPlayed;
          let hydratedPlayer = { ...data.playerData };

          if (lastPlayed && lastPlayed !== today && hydratedPlayer.lastWorkout !== today) {
            const msPerDay = 1000 * 60 * 60 * 24;
            const daysAway = Math.floor((Date.now() - new Date(lastPlayed).getTime()) / msPerDay);

            if (daysAway >= 1) {
              const damage = daysAway * 20;
              let newHp = hydratedPlayer.hp - damage;
              let newStreak = hydratedPlayer.streak;
              let newKnockouts = hydratedPlayer.knockouts || 0;

              if (newHp <= 0) {
                newHp = 50;
                newStreak = 0;
                newKnockouts += 1;
              }

              hydratedPlayer = { ...hydratedPlayer, hp: newHp, streak: newStreak, knockouts: newKnockouts };

              if (damage > 0) {
                setDaysAwayMessage({ days: daysAway, damage });
                setTimeout(() => setDaysAwayMessage(null), 5000);
              }
            }
          }

          setPlayerName(data.playerName || "Kenzo");
          setDifficulty(data.difficulty);
          setWorkouts(data.workouts);
          setPlayerData(hydratedPlayer);
          setMealsLog(data.mealsLog || {});
          if (data.bodyStats) setBodyStats(data.bodyStats);
          setWeightLog(data.weightLog || []);
          setWorkoutHistory(data.workoutHistory || []);
          setGoalWeight(data.goalWeight || "");
          setCurrentBoss(data.currentBoss || null);
          setBossesDefeated(data.bossesDefeated || 0);
          setWeekNumber(data.weekNumber || 0);
          setUnlockedAchievements(data.unlockedAchievements || []);
          setProteinGoalDays(data.proteinGoalDays || []);
          setExerciseHistory(data.exerciseHistory || {});
          setView('home');
        }
      }
    } catch (err) {
      console.log('No save found or load error:', err);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded || !playerData || !difficulty) return;
    try {
      const data = {
        playerName, difficulty, workouts, playerData, mealsLog, bodyStats,
        weightLog, workoutHistory, goalWeight, currentBoss, bossesDefeated,
        weekNumber, unlockedAchievements, proteinGoalDays, exerciseHistory,
        lastPlayed: new Date().toISOString(), version: SAVE_VERSION,
      };
      localStorage.setItem('forge-save', JSON.stringify(data));
    } catch (err) {
      console.error('Save failed:', err);
    }
  }, [playerData, difficulty, workouts, playerName, mealsLog, bodyStats, weightLog, workoutHistory, goalWeight, currentBoss, bossesDefeated, weekNumber, unlockedAchievements, proteinGoalDays, exerciseHistory, isLoaded]);

  const resetGame = () => {
    try { localStorage.removeItem('forge-save'); } catch (err) {}
    setDifficulty(null);
    setPlayerData(null);
    setWorkouts({});
    setQuizStep(0);
    setQuizAnswers({});
    setRecommendation(null);
    setShowSaveModal(false);
    setView('intro');
  };

  // --- NEW: Export save as JSON file ---
  const exportSave = () => {
    try {
      const data = {
        playerName, difficulty, workouts, playerData, mealsLog, bodyStats,
        weightLog, workoutHistory, goalWeight, currentBoss, bossesDefeated,
        weekNumber, unlockedAchievements, proteinGoalDays, exerciseHistory,
        lastPlayed: new Date().toISOString(),
        version: SAVE_VERSION,
        exportedAt: new Date().toISOString(),
      };
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const safeName = (playerName || 'hero').replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const dateStr = new Date().toISOString().split('T')[0];
      a.href = url;
      a.download = `forge-save-${safeName}-${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSaveMessage({ type: 'success', text: 'Save exported. Keep the file safe — it is your backup.' });
      setTimeout(() => setSaveMessage(null), 4000);
    } catch (err) {
      setSaveMessage({ type: 'error', text: 'Export failed: ' + err.message });
      setTimeout(() => setSaveMessage(null), 4000);
    }
  };

  // --- NEW: Import save from JSON file ---
  const importSave = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        // Basic validation — must have the core playthrough data
        if (!data.playerData || !data.difficulty || !data.workouts || !data.playerData.level) {
          setSaveMessage({ type: 'error', text: 'Invalid save file: missing required fields.' });
          setTimeout(() => setSaveMessage(null), 4000);
          return;
        }

        // Destructive — confirm before overwriting
        const hasCurrentSave = playerData !== null;
        const confirmMsg = hasCurrentSave
          ? `This will overwrite your current save (Level ${playerData.level} ${playerData.name}) with Level ${data.playerData.level} ${data.playerData.name}. Continue?`
          : `Import save for ${data.playerData.name} (Level ${data.playerData.level})?`;

        if (!window.confirm(confirmMsg)) return;

        // Apply to state
        setPlayerName(data.playerName || 'Kenzo');
        setDifficulty(data.difficulty);
        setWorkouts(data.workouts);
        setPlayerData(data.playerData);
        setMealsLog(data.mealsLog || {});
        if (data.bodyStats) setBodyStats(data.bodyStats);
        setWeightLog(data.weightLog || []);
        setWorkoutHistory(data.workoutHistory || []);
        setGoalWeight(data.goalWeight || '');
        setCurrentBoss(data.currentBoss || null);
        setBossesDefeated(data.bossesDefeated || 0);
        setWeekNumber(data.weekNumber || 0);
        setUnlockedAchievements(data.unlockedAchievements || []);
        setProteinGoalDays(data.proteinGoalDays || []);
        setExerciseHistory(data.exerciseHistory || {});

        // Belt-and-suspenders write to localStorage in case the user closes the tab before re-render
        try {
          localStorage.setItem('forge-save', JSON.stringify({
            ...data,
            lastPlayed: new Date().toISOString(),
            version: SAVE_VERSION,
          }));
        } catch (writeErr) {
          console.warn('Immediate write failed, relying on auto-save:', writeErr);
        }

        setShowSaveModal(false);
        setView('home');
        setSaveMessage({ type: 'success', text: `Welcome back, ${data.playerData.name}. Save restored.` });
        setTimeout(() => setSaveMessage(null), 4000);
      } catch (err) {
        setSaveMessage({ type: 'error', text: 'Could not read save file: ' + err.message });
        setTimeout(() => setSaveMessage(null), 4000);
      }
    };
    reader.onerror = () => {
      setSaveMessage({ type: 'error', text: 'Failed to read file.' });
      setTimeout(() => setSaveMessage(null), 4000);
    };
    reader.readAsText(file);
  };

  const handleImportChange = (e) => {
    const file = e.target.files?.[0];
    if (file) importSave(file);
    // Reset so the same file can be re-selected if needed
    e.target.value = '';
  };

  const answerQuiz = (option) => {
    const q = QUIZ_QUESTIONS[quizStep];
    const newAnswers = { ...quizAnswers, [q.id]: option.score };
    setQuizAnswers(newAnswers);
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const rec = calculateRecommendation(newAnswers);
      setRecommendation(rec);
      setView('recommendation');
    }
  };

  const goBackQuiz = () => {
    if (quizStep === 0) setView('intro');
    else setQuizStep(quizStep - 1);
  };

  const startQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setView('quiz');
  };

  const startGame = (diff) => {
    const needsBody = !bodyStats.weight || !bodyStats.height || !bodyStats.age;
    if (needsBody) {
      setDifficulty(diff);
      setView('bodyStats');
      return;
    }
    actuallyStartGame(diff);
  };

  const actuallyStartGame = (diff) => {
    const config = DIFFICULTY[diff];
    setDifficulty(diff);
    setWorkouts(WORKOUT_SETS[diff]);
    setPlayerData({
      name: playerName || "Hero",
      level: 1, xp: 0, hp: 100, maxHp: 100, streak: 0, bestStreak: 0,
      lastWorkout: null, stats: { ...config.startingStats },
      totalWorkouts: 0, workoutsThisWeek: 0, cardioThisWeek: 0,
      questsCompleted: [], knockouts: 0,
    });
    setView('home');
  };

  const getNutritionTargets = () => {
    const diffConfig = DIFFICULTY[difficulty];
    const personalized = calculateMacros(bodyStats, difficulty);
    if (personalized) {
      return {
        calorieTarget: personalized.calorieTarget,
        proteinTarget: personalized.proteinTarget,
        personalized: true,
        tdee: personalized.tdee,
        bmr: personalized.bmr,
      };
    }
    return {
      calorieTarget: diffConfig.calorieTarget,
      proteinTarget: diffConfig.proteinTarget,
      personalized: false,
    };
  };

  const getTodayKey = () => new Date().toDateString();
  const getTodayMeals = () => mealsLog[getTodayKey()] || [];
  const getTodayTotals = () => {
    const meals = getTodayMeals();
    return meals.reduce((acc, m) => ({
      cal: acc.cal + (m.cal || 0),
      protein: acc.protein + (m.protein || 0),
      carbs: acc.carbs + (m.carbs || 0),
      fat: acc.fat + (m.fat || 0),
    }), { cal: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const addMeal = (food) => {
    const key = getTodayKey();
    const newMeals = { ...mealsLog, [key]: [...(mealsLog[key] || []), { ...food, id: Date.now() }] };
    setMealsLog(newMeals);

    const targets = getNutritionTargets();
    const todaysTotal = newMeals[key].reduce((acc, m) => acc + (m.protein || 0), 0);
    if (todaysTotal >= targets.proteinTarget && !proteinGoalDays.includes(key)) {
      const newProteinDays = [...proteinGoalDays, key];
      setProteinGoalDays(newProteinDays);
      damageBoss(80);
      checkAchievements(playerData, { proteinDays: newProteinDays.length });
    }
  };

  const removeMeal = (mealId) => {
    const key = getTodayKey();
    setMealsLog(prev => ({ ...prev, [key]: (prev[key] || []).filter(m => m.id !== mealId) }));
  };

  const analyzePhoto = async (file) => {
    setPhotoAnalyzing(true);
    setPhotoError(null);
    setPhotoResult(null);
    setTimeout(() => {
      setPhotoError("AI photo scanning is a premium feature. Use Quick Add or Custom Entry for now.");
      setPhotoAnalyzing(false);
    }, 600);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) analyzePhoto(file);
  };

  const acceptPhotoResult = () => {
    if (photoResult) {
      addMeal({
        name: photoResult.name,
        cal: photoResult.cal,
        protein: photoResult.protein,
        carbs: photoResult.carbs,
        fat: photoResult.fat,
      });
      setPhotoResult(null);
    }
  };

  const addCustomFood = () => {
    if (!customFood.name || !customFood.cal) return;
    addMeal({
      name: customFood.name,
      cal: parseInt(customFood.cal) || 0,
      protein: parseInt(customFood.protein) || 0,
      carbs: parseInt(customFood.carbs) || 0,
      fat: parseInt(customFood.fat) || 0,
    });
    setCustomFood({ name: "", cal: "", protein: "", carbs: "", fat: "" });
    setShowCustomFood(false);
  };

  const logWeight = () => {
    const weight = parseFloat(newWeight);
    if (!weight || weight <= 0) return;
    const bf = parseFloat(newBodyFat) || null;

    const entry = {
      date: new Date().toISOString(),
      weight, bodyFat: bf,
      unit: bodyStats.unit || 'imperial',
    };
    setWeightLog(prev => [...prev, entry]);
    setBodyStats(prev => ({ ...prev, weight: weight.toString() }));

    let xpGained = 25;
    let hitGoal = false;
    if (goalWeight) {
      const goal = parseFloat(goalWeight);
      if (weight === goal || (bodyStats.goal === 'cut' && weight <= goal) || (bodyStats.goal === 'bulk' && weight >= goal)) {
        xpGained += 200;
        hitGoal = true;
      }
    }

    let newXp = playerData.xp + xpGained;
    let newLevel = playerData.level;
    let leveledUp = false;
    while (newXp >= xpForLevel(newLevel)) {
      newXp -= xpForLevel(newLevel);
      newLevel++;
      leveledUp = true;
    }

    setPlayerData({ ...playerData, xp: newXp, level: newLevel });
    setShowXpGain({ xp: xpGained, bonus: hitGoal ? xpGained - 25 : 0, goalHit: hitGoal });
    setTimeout(() => setShowXpGain(null), 2500);
    if (leveledUp) setTimeout(() => setShowLevelUp(true), 500);

    checkAchievements({ ...playerData, level: newLevel }, {
      weighIns: weightLog.length + 1,
      hitGoalWeight: hitGoal,
    });

    setNewWeight("");
    setNewBodyFat("");
  };

  const removeWeightEntry = (date) => {
    setWeightLog(prev => prev.filter(w => w.date !== date));
  };

  const damageBoss = (damage) => {
    let boss = currentBoss;
    if (!boss) {
      const template = pickBossForWeek(weekNumber);
      boss = { ...template, currentHp: template.hp, spawnedAt: Date.now() };
    }
    const newHp = Math.max(0, boss.currentHp - damage);
    const updatedBoss = { ...boss, currentHp: newHp };

    if (newHp <= 0) {
      setShowBossDefeat({ boss: updatedBoss, reward: boss.reward });
      setBossesDefeated(bossesDefeated + 1);
      setWeekNumber(weekNumber + 1);
      setCurrentBoss(null);

      let newXp = playerData.xp + boss.reward;
      let newLevel = playerData.level;
      while (newXp >= xpForLevel(newLevel)) {
        newXp -= xpForLevel(newLevel);
        newLevel++;
      }
      setPlayerData(prev => ({ ...prev, xp: newXp, level: newLevel }));
    } else {
      setCurrentBoss(updatedBoss);
    }
  };

  const checkAchievements = (data, extras = {}) => {
    const newlyUnlocked = [];
    const current = unlockedAchievements;

    const checks = {
      first_workout: data.totalWorkouts >= 1,
      workouts_10: data.totalWorkouts >= 10,
      workouts_25: data.totalWorkouts >= 25,
      workouts_50: data.totalWorkouts >= 50,
      workouts_100: data.totalWorkouts >= 100,
      streak_3: data.streak >= 3,
      streak_7: data.streak >= 7,
      streak_14: data.streak >= 14,
      streak_30: data.streak >= 30,
      level_5: data.level >= 5,
      level_10: data.level >= 10,
      level_20: data.level >= 20,
      first_boss: (extras.bossesDefeated || bossesDefeated) >= 1,
      bosses_5: (extras.bossesDefeated || bossesDefeated) >= 5,
      first_weigh: (extras.weighIns || weightLog.length) >= 1,
      weigh_10: (extras.weighIns || weightLog.length) >= 10,
      goal_weight: extras.hitGoalWeight || false,
      protein_7: (extras.proteinDays || proteinGoalDays.length) >= 7,
      first_custom: extras.builtCustom || Object.values(workouts).some(w => w.custom),
      knockout_1: (data.knockouts || 0) >= 1,
    };

    Object.entries(checks).forEach(([id, unlocked]) => {
      if (unlocked && !current.includes(id)) newlyUnlocked.push(id);
    });

    if (newlyUnlocked.length > 0) {
      setUnlockedAchievements([...current, ...newlyUnlocked]);
      const firstNew = ACHIEVEMENTS.find(a => a.id === newlyUnlocked[0]);
      if (firstNew) setTimeout(() => setNewAchievement(firstNew), 800);

      const xpBonus = newlyUnlocked.reduce((sum, id) => {
        const ach = ACHIEVEMENTS.find(a => a.id === id);
        return sum + (ach?.xp || 0);
      }, 0);

      if (xpBonus > 0) {
        setTimeout(() => {
          setPlayerData(prev => {
            let xp = prev.xp + xpBonus;
            let lvl = prev.level;
            while (xp >= xpForLevel(lvl)) { xp -= xpForLevel(lvl); lvl++; }
            return { ...prev, xp, level: lvl };
          });
        }, 100);
      }
    }
  };

  const startWorkout = (key) => {
    setActiveWorkout(key);
    setActiveExercises([...workouts[key].exercises]);
    setCompletedExercises({});
    setCurrentSetData({});
    setView('workout');
  };

  const toggleExercise = (idx) => {
    setCompletedExercises(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const addExerciseDuringWorkout = (name) => {
    setActiveExercises(prev => [...prev, { name, sets: 3, reps: "10-12" }]);
    setAddingExerciseInWorkout(false);
    setInWorkoutSearch("");
  };

  const removeExerciseFromActive = (idx) => {
    setActiveExercises(prev => prev.filter((_, i) => i !== idx));
    setCompletedExercises(prev => {
      const next = {};
      Object.keys(prev).forEach(k => {
        const n = parseInt(k);
        if (n < idx) next[n] = prev[k];
        else if (n > idx) next[n - 1] = prev[k];
      });
      return next;
    });
  };

  const finishWorkout = () => {
    const workout = workouts[activeWorkout];
    const completedCount = Object.values(completedExercises).filter(Boolean).length;
    if (completedCount === 0) {
      setActiveWorkout(null);
      setView('home');
      return;
    }

    const mult = DIFFICULTY[difficulty].xpMultiplier;
    const baseXp = 50;
    const perExerciseXp = 15;
    const streakBonus = playerData.streak >= 3 ? 25 : 0;
    const xpGained = Math.round((baseXp + (completedCount * perExerciseXp) + streakBonus) * mult);

    const statGain = Math.ceil(completedCount / 2);
    const newStats = { ...playerData.stats };
    const stat = workout.stat || "STR";
    if (stat === "END") {
      newStats.END += statGain;
      newStats.AGI += Math.ceil(statGain / 2);
    } else if (stat === "AGI") {
      newStats.AGI += statGain;
      newStats.END += Math.ceil(statGain / 2);
    } else {
      newStats.STR += statGain;
    }

    const today = new Date().toDateString();
    let newStreak = playerData.streak;
    if (playerData.lastWorkout !== today) newStreak = playerData.streak + 1;

    const hpHealed = 15 + (completedCount * 3);
    let newHp = Math.min(playerData.maxHp, playerData.hp + hpHealed);

    let newXp = playerData.xp + xpGained;
    let newLevel = playerData.level;
    let leveledUp = false;
    while (newXp >= xpForLevel(newLevel)) {
      newXp -= xpForLevel(newLevel);
      newLevel++;
      leveledUp = true;
    }

    let newMaxHp = playerData.maxHp;
    if (leveledUp) {
      newMaxHp = playerData.maxHp + 10;
      newHp = newMaxHp;
    }

    const isCardio = stat === "END";

    setPlayerData({
      ...playerData,
      xp: newXp, level: newLevel, hp: newHp, maxHp: newMaxHp,
      streak: newStreak, lastWorkout: today, stats: newStats,
      totalWorkouts: playerData.totalWorkouts + 1,
      workoutsThisWeek: playerData.workoutsThisWeek + 1,
      cardioThisWeek: isCardio ? playerData.cardioThisWeek + 1 : playerData.cardioThisWeek,
      bestStreak: Math.max(playerData.bestStreak || 0, newStreak),
    });

    setWorkoutHistory(prev => [...prev, {
      date: new Date().toISOString(),
      type: workout.name,
      workoutKey: activeWorkout,
      xp: xpGained,
      exercises: completedCount,
    }]);

    const newExerciseHistory = { ...exerciseHistory };
    activeExercises.forEach((ex, idx) => {
      if (completedExercises[idx] && currentSetData[idx]?.weight) {
        const setData = currentSetData[idx];
        if (!newExerciseHistory[ex.name]) newExerciseHistory[ex.name] = [];
        newExerciseHistory[ex.name].push({
          date: new Date().toISOString(),
          weight: parseFloat(setData.weight) || 0,
          reps: parseInt(setData.reps) || 0,
          sets: ex.sets,
        });
      }
    });
    setExerciseHistory(newExerciseHistory);
    setCurrentSetData({});

    damageBoss(Math.round(xpGained / 2));

    checkAchievements({
      ...playerData,
      totalWorkouts: playerData.totalWorkouts + 1,
      level: newLevel,
      streak: newStreak,
    });

    setShowXpGain({ xp: xpGained, bonus: streakBonus, hp: hpHealed });
    setTimeout(() => setShowXpGain(null), 2500);
    if (leveledUp) setTimeout(() => setShowLevelUp(true), 500);

    setActiveWorkout(null);
    setView('home');
  };

  const claimQuest = (quest) => {
    if (playerData.questsCompleted.includes(quest.id)) return;
    let newXp = playerData.xp + quest.xp;
    let newLevel = playerData.level;
    let leveledUp = false;
    while (newXp >= xpForLevel(newLevel)) {
      newXp -= xpForLevel(newLevel);
      newLevel++;
      leveledUp = true;
    }
    setPlayerData({
      ...playerData,
      xp: newXp, level: newLevel,
      questsCompleted: [...playerData.questsCompleted, quest.id],
    });
    setShowXpGain({ xp: quest.xp, bonus: 0 });
    setTimeout(() => setShowXpGain(null), 2500);
    if (leveledUp) setTimeout(() => setShowLevelUp(true), 500);
  };

  const getWeeklyQuests = () => {
    if (!difficulty) return [];
    const d = DIFFICULTY[difficulty];
    return [
      { id: 'q1', name: `Complete ${d.workoutQuestTarget} workouts`, target: d.workoutQuestTarget, xp: 150, icon: Dumbbell },
      { id: 'q2', name: `Hit a ${d.streakQuestTarget}-day streak`, target: d.streakQuestTarget, xp: 100, icon: Flame },
      { id: 'q3', name: "Log 1 cardio session", target: 1, xp: 75, icon: Heart },
    ];
  };

  const questProgress = (quest) => {
    if (!playerData) return 0;
    if (quest.id === 'q1') return Math.min(playerData.workoutsThisWeek, quest.target);
    if (quest.id === 'q2') return Math.min(playerData.streak, quest.target);
    if (quest.id === 'q3') return Math.min(playerData.cardioThisWeek, quest.target);
    return 0;
  };

  const openBuilder = () => {
    setBuilderName("");
    setBuilderIcon("X");
    setBuilderColor(COLOR_OPTIONS[0]);
    setBuilderStat("STR");
    setBuilderExercises([]);
    setLibrarySearch("");
    setView('builder');
  };

  const saveCustomWorkout = () => {
    if (!builderName.trim() || builderExercises.length === 0) return;
    const key = `custom_${Date.now()}`;
    setWorkouts(prev => ({
      ...prev,
      [key]: {
        name: builderName.trim(),
        icon: builderIcon,
        color: builderColor,
        stat: builderStat,
        exercises: builderExercises,
        custom: true,
      }
    }));
    checkAchievements(playerData, { builtCustom: true });
    setView('home');
  };

  const deleteCustomWorkout = (key) => {
    setWorkouts(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const addToBuilder = (name) => {
    setBuilderExercises(prev => [...prev, { name, sets: 3, reps: "10-12" }]);
  };

  const updateBuilderExercise = (idx, field, value) => {
    setBuilderExercises(prev => prev.map((ex, i) => i === idx ? { ...ex, [field]: value } : ex));
  };

  const removeFromBuilder = (idx) => {
    setBuilderExercises(prev => prev.filter((_, i) => i !== idx));
  };

  // --- NEW: Save Data Modal ---
  const SaveDataModal = () => {
    if (!showSaveModal) return null;
    const hasSave = playerData !== null;

    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setShowSaveModal(false)}>
        <div className="bg-gradient-to-br from-red-950 to-black border-2 border-red-500/50 rounded-3xl p-6 max-w-sm w-full shadow-2xl shadow-red-950" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Save size={20} className="text-red-500" />
              <h3 className="text-lg font-black uppercase tracking-wider">Save Data</h3>
            </div>
            <button onClick={() => setShowSaveModal(false)} className="text-slate-500 hover:text-red-400">
              <X size={20} />
            </button>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Your progress lives in this browser. Export a backup file regularly — if you clear your browser, switch devices, or your laptop dies, a backup is the only way to keep your stats.
          </p>

          <div className="space-y-2">
            <button
              onClick={exportSave}
              disabled={!hasSave}
              className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-3 rounded-xl disabled:opacity-40 hover:brightness-110 uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-950/50"
            >
              <Download size={16} />
              Export Save
            </button>
            <div className="text-[10px] text-slate-500 text-center -mt-1 mb-1">Downloads a JSON file</div>

            <button
              onClick={() => importFileRef.current?.click()}
              className="w-full bg-slate-950 border border-red-500/50 text-white font-bold py-3 rounded-xl hover:bg-red-950/40 uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Upload size={16} />
              Import Save
            </button>
            <div className="text-[10px] text-slate-500 text-center -mt-1 mb-3">Overwrites current progress</div>

            <div className="border-t border-red-900/30 pt-3">
              <button
                onClick={() => { if (window.confirm('Reset all progress? This cannot be undone unless you have exported a backup.')) resetGame(); }}
                className="w-full bg-transparent border border-red-900/40 text-red-500 font-semibold py-2 rounded-xl hover:bg-red-950/40 text-sm uppercase tracking-wider"
              >
                Reset All Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin mb-4">
            <Swords size={48} className="text-red-500" />
          </div>
          <div className="text-slate-500 text-sm uppercase tracking-widest">Loading</div>
        </div>
      </div>
    );
  }

  if (view === 'intro') {
    return (
      <div className="min-h-screen bg-black text-white p-4 flex flex-col relative overflow-hidden">
        {/* Hidden file input for importing save from the intro screen */}
        <input type="file" accept="application/json,.json" ref={importFileRef} onChange={handleImportChange} className="hidden" />

        {/* Save message toast */}
        {saveMessage && (
          <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl border text-sm font-bold ${
            saveMessage.type === 'success' ? 'bg-red-950/90 border-red-500/50 text-red-200' : 'bg-red-950/90 border-red-500 text-red-100'
          }`}>
            {saveMessage.text}
          </div>
        )}

        {/* Ambient red glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-600/25 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-900/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 left-0 w-64 h-64 bg-red-700/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* HERO */}
        <div className="relative text-center pt-16 pb-8">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-red-500 blur-2xl opacity-70 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-red-500 via-red-700 to-red-950 p-5 rounded-3xl shadow-2xl shadow-red-900/80 border-2 border-red-400/50">
              <Swords size={52} className="text-white" strokeWidth={2.5} />
            </div>
          </div>

          <h1 className="relative text-8xl font-black tracking-[-0.05em] leading-none mb-3">
            <span className="bg-gradient-to-b from-red-300 via-red-500 to-red-900 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(239,68,68,0.6)]">
              FORGE
            </span>
          </h1>

          <p className="relative text-red-400 text-base font-black tracking-[0.4em] uppercase">
            Forge yourself.
          </p>
        </div>

        <div className="relative mb-4">
          <label className="text-xs text-red-500 uppercase tracking-[0.25em] mb-2 block font-bold">Your Name</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full bg-slate-950 border-2 border-red-900/60 rounded-xl px-4 py-3 text-white text-lg focus:border-red-500 outline-none shadow-lg shadow-red-950/30"
            placeholder="Enter your name..."
            maxLength={20}
          />
        </div>

        <div className="relative bg-gradient-to-br from-red-950 via-black to-red-950/80 border-2 border-red-500/50 rounded-2xl p-5 mb-4 shadow-2xl shadow-red-900/50 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/30 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Swords size={14} className="text-red-500" />
              <div className="text-xs text-red-500 uppercase tracking-[0.25em] font-black">Character Creation</div>
            </div>
            <h3 className="font-black mb-1 text-xl">Find Your Class</h3>
            <p className="text-sm text-slate-400 mb-4">5 quick questions to match you to the right tier.</p>

            <button
              onClick={startQuiz}
              disabled={!playerName.trim()}
              className="w-full relative group disabled:opacity-30"
            >
              <div className="absolute inset-0 bg-red-500 blur-lg opacity-60 group-hover:opacity-100 transition"></div>
              <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white font-black py-3 rounded-xl uppercase tracking-[0.25em] shadow-xl shadow-red-950/60 group-hover:brightness-125 transition border border-red-400/50">
                ▶ Begin Quiz
              </div>
            </button>
          </div>
        </div>

        <div className="relative grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="bg-gradient-to-br from-red-950/60 to-black border border-red-500/30 rounded-xl p-3 shadow-lg shadow-red-950/40">
            <Flame size={20} className="mx-auto text-red-500 mb-1" />
            <div className="text-xs font-black uppercase tracking-wider">Train</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Earn XP</div>
          </div>
          <div className="bg-gradient-to-br from-red-950/60 to-black border border-red-500/30 rounded-xl p-3 shadow-lg shadow-red-950/40">
            <Skull size={20} className="mx-auto text-red-500 mb-1" />
            <div className="text-xs font-black uppercase tracking-wider">Fight</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Weekly boss</div>
          </div>
          <div className="bg-gradient-to-br from-red-950/60 to-black border border-red-500/30 rounded-xl p-3 shadow-lg shadow-red-950/40">
            <Trophy size={20} className="mx-auto text-red-500 mb-1" />
            <div className="text-xs font-black uppercase tracking-wider">Conquer</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Level up</div>
          </div>
        </div>

        <button
          onClick={() => setView('manualSelect')}
          disabled={!playerName.trim()}
          className="relative text-sm text-slate-500 hover:text-red-400 underline disabled:opacity-40 mb-2"
        >
          Skip quiz · pick class manually
        </button>

        {/* NEW: Import existing save — critical for returning users on new devices */}
        <button
          onClick={() => importFileRef.current?.click()}
          className="relative text-sm text-slate-600 hover:text-red-400 underline flex items-center justify-center gap-1"
        >
          <Upload size={12} /> Returning? Import your save file
        </button>

        <div className="flex-1"></div>
        <div className="relative text-center text-xs text-slate-700 pt-6 pb-4 uppercase tracking-[0.3em] font-bold">
          Forge · v1.0
        </div>
      </div>
    );
  }

  if (view === 'quiz') {
    const q = QUIZ_QUESTIONS[quizStep];
    const progress = ((quizStep + 1) / QUIZ_QUESTIONS.length) * 100;

    return (
      <div className="min-h-screen bg-black text-white p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={goBackQuiz} className="bg-slate-950 border border-red-900/30 rounded-full p-2">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <div className="text-xs text-red-500 mb-1 uppercase tracking-widest font-bold">Question {quizStep + 1} of {QUIZ_QUESTIONS.length}</div>
            <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-red-900/30">
              <div className="h-full bg-gradient-to-r from-red-500 to-red-700 transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        <div className="pt-6 pb-4">
          <h2 className="text-2xl font-black mb-2">{q.question}</h2>
          <p className="text-sm text-slate-500">{q.subtitle}</p>
        </div>

        <div className="space-y-3 flex-1">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => answerQuiz(opt)}
              className="w-full bg-slate-950 hover:bg-red-950/40 border border-red-900/30 hover:border-red-500 rounded-2xl p-4 text-left transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-950/60 border border-red-800/50 flex items-center justify-center text-sm font-bold text-red-300">
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="font-semibold">{opt.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'recommendation' && recommendation) {
    const rec = DIFFICULTY[recommendation.winner];
    const DIcon = rec.icon;
    const total = recommendation.totals.beginner + recommendation.totals.intermediate + recommendation.totals.expert;

    return (
      <div className="min-h-screen bg-black text-white p-4 flex flex-col">
        <div className="text-center pt-8 pb-4">
          <div className="text-xs text-red-500 uppercase tracking-widest mb-2 font-bold">Your Recommended Class</div>
          <div className={`inline-block bg-gradient-to-br ${rec.color} p-6 rounded-3xl mb-4 shadow-2xl shadow-red-950/50 border border-red-500/30`}>
            <DIcon size={56} className="text-white" />
          </div>
          <h1 className="text-4xl font-black mb-1 tracking-tight">{rec.name}</h1>
          <p className="text-slate-500">{rec.subtitle}</p>
        </div>

        <div className="bg-slate-950 border border-red-900/30 rounded-2xl p-4 mb-4">
          <p className="text-sm text-slate-300 mb-4">{rec.description}</p>
          <div className="space-y-2">
            {Object.entries(recommendation.totals).sort((a, b) => b[1] - a[1]).map(([tier, score]) => {
              const config = DIFFICULTY[tier];
              const percent = total > 0 ? (score / total) * 100 : 0;
              const isWinner = tier === recommendation.winner;
              return (
                <div key={tier}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={isWinner ? "font-bold text-red-400" : "text-slate-500"}>
                      {config.name} {isWinner && "— You"}
                    </span>
                    <span className={isWinner ? "font-bold text-red-400" : "text-slate-500"}>
                      {Math.round(percent)}%
                    </span>
                  </div>
                  <div className="h-2 bg-black rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${config.color} transition-all duration-700`} style={{ width: `${percent}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1"></div>

        <div className="space-y-2 pb-4">
          <button onClick={() => startGame(recommendation.winner)} className={`w-full bg-gradient-to-r ${rec.color} text-white font-bold py-4 rounded-xl shadow-xl shadow-red-950/50 hover:brightness-110 uppercase tracking-wider`}>
            Begin as {rec.name}
          </button>
          <button onClick={() => setView('manualSelect')} className="w-full bg-slate-950 border border-red-900/30 text-slate-300 font-semibold py-3 rounded-xl hover:bg-red-950/40">
            Choose a different class
          </button>
          <button onClick={() => { setQuizStep(0); setQuizAnswers({}); setView('quiz'); }} className="w-full text-slate-500 text-sm py-2 hover:text-red-400">
            Retake quiz
          </button>
        </div>
      </div>
    );
  }

  if (view === 'manualSelect') {
    return (
      <div className="min-h-screen bg-black text-white p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setView(recommendation ? 'recommendation' : 'intro')} className="bg-slate-950 border border-red-900/30 rounded-full p-2">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold">Choose Your Class</h2>
        </div>

        <div className="space-y-3 flex-1">
          {Object.entries(DIFFICULTY).map(([key, d]) => {
            const DIcon = d.icon;
            const isRecommended = recommendation && recommendation.winner === key;
            return (
              <button key={key} onClick={() => startGame(key)} className={`w-full bg-gradient-to-br ${d.color} rounded-2xl p-5 text-left shadow-xl shadow-red-950/50 border border-red-500/30 hover:scale-[1.02] transition-transform relative overflow-hidden`}>
                {isRecommended && (
                  <div className="absolute top-2 right-2 bg-black/60 rounded-full px-2 py-0.5 text-xs font-bold uppercase tracking-wider">
                    Recommended
                  </div>
                )}
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-black/40 rounded-xl p-2">
                    <DIcon size={24} />
                  </div>
                  <div>
                    <div className="text-xl font-black tracking-tight">{d.name}</div>
                    <div className="text-xs opacity-80 uppercase tracking-wider">{d.subtitle}</div>
                  </div>
                </div>
                <p className="text-sm opacity-90">{d.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (view === 'bodyStats') {
    const preview = calculateMacros(bodyStats, difficulty);
    const canSubmit = bodyStats.weight && bodyStats.height && bodyStats.age;
    const isMetric = bodyStats.unit === 'metric';

    return (
      <div className="min-h-screen bg-black text-white p-4 flex flex-col pb-24">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setView(editingBody ? 'nutrition' : 'manualSelect')} className="bg-slate-950 border border-red-900/30 rounded-full p-2">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold">{editingBody ? 'Update Body Stats' : 'Tell us about you'}</h2>
        </div>

        <p className="text-sm text-slate-500 mb-4">
          We'll calculate your personalized calorie and protein targets.
        </p>

        <div className="bg-slate-950 border border-red-900/30 rounded-full p-1 flex mb-4 w-fit">
          <button onClick={() => setBodyStats({ ...bodyStats, unit: 'imperial' })} className={`px-4 py-1.5 rounded-full text-sm font-bold ${!isMetric ? 'bg-red-600 text-white' : 'text-slate-500'}`}>
            lbs / in
          </button>
          <button onClick={() => setBodyStats({ ...bodyStats, unit: 'metric' })} className={`px-4 py-1.5 rounded-full text-sm font-bold ${isMetric ? 'bg-red-600 text-white' : 'text-slate-500'}`}>
            kg / cm
          </button>
        </div>

        <div className="mb-3">
          <label className="text-xs text-red-500 uppercase tracking-widest mb-2 block font-bold">Sex (for BMR formula)</label>
          <div className="grid grid-cols-2 gap-2">
            {['male', 'female'].map(s => (
              <button key={s} onClick={() => setBodyStats({ ...bodyStats, sex: s })} className={`py-3 rounded-xl font-bold capitalize ${bodyStats.sex === s ? 'bg-red-600 text-white' : 'bg-slate-950 border border-red-900/30 text-slate-400'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div>
            <label className="text-xs text-red-500 uppercase tracking-widest mb-2 block font-bold">Age</label>
            <input type="number" inputMode="numeric" value={bodyStats.age}
              onChange={(e) => setBodyStats({ ...bodyStats, age: e.target.value })}
              placeholder="20"
              className="w-full bg-slate-950 border border-red-900/30 rounded-xl px-3 py-3 text-white text-lg focus:border-red-500 outline-none" />
          </div>
          {isMetric ? (
            <div>
              <label className="text-xs text-red-500 uppercase tracking-widest mb-2 block font-bold">Height (cm)</label>
              <input type="number" inputMode="numeric" value={bodyStats.height}
                onChange={(e) => setBodyStats({ ...bodyStats, height: e.target.value })}
                placeholder="178"
                className="w-full bg-slate-950 border border-red-900/30 rounded-xl px-3 py-3 text-white text-lg focus:border-red-500 outline-none" />
            </div>
          ) : (
            <div>
              <label className="text-xs text-red-500 uppercase tracking-widest mb-2 block font-bold">Height</label>
              <div className="flex gap-1">
                <div className="flex-1 relative">
                  <input type="number" inputMode="numeric" value={bodyStats.heightFt || ''}
                    onChange={(e) => {
                      const ft = e.target.value;
                      const inches = bodyStats.heightIn || '';
                      const totalIn = (parseInt(ft) || 0) * 12 + (parseInt(inches) || 0);
                      setBodyStats({ ...bodyStats, heightFt: ft, height: totalIn ? totalIn.toString() : '' });
                    }}
                    placeholder="5"
                    className="w-full bg-slate-950 border border-red-900/30 rounded-xl px-2 py-3 text-white text-lg focus:border-red-500 outline-none text-center" />
                  <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs text-slate-600 pointer-events-none">ft</span>
                </div>
                <div className="flex-1 relative">
                  <input type="number" inputMode="numeric" value={bodyStats.heightIn || ''}
                    onChange={(e) => {
                      const inches = e.target.value;
                      const ft = bodyStats.heightFt || '';
                      const totalIn = (parseInt(ft) || 0) * 12 + (parseInt(inches) || 0);
                      setBodyStats({ ...bodyStats, heightIn: inches, height: totalIn ? totalIn.toString() : '' });
                    }}
                    placeholder="10"
                    max="11"
                    className="w-full bg-slate-950 border border-red-900/30 rounded-xl px-2 py-3 text-white text-lg focus:border-red-500 outline-none text-center" />
                  <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs text-slate-600 pointer-events-none">in</span>
                </div>
              </div>
            </div>
          )}
          <div>
            <label className="text-xs text-red-500 uppercase tracking-widest mb-2 block font-bold">Weight ({isMetric ? 'kg' : 'lbs'})</label>
            <input type="number" inputMode="numeric" value={bodyStats.weight}
              onChange={(e) => setBodyStats({ ...bodyStats, weight: e.target.value })}
              placeholder={isMetric ? "75" : "165"}
              className="w-full bg-slate-950 border border-red-900/30 rounded-xl px-3 py-3 text-white text-lg focus:border-red-500 outline-none" />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-xs text-red-500 uppercase tracking-widest mb-2 block font-bold">Primary Goal</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(GOAL_LABELS).map(([key, label]) => (
              <button key={key} onClick={() => setBodyStats({ ...bodyStats, goal: key })} className={`py-3 px-2 rounded-xl font-semibold text-sm ${bodyStats.goal === key ? 'bg-red-600 text-white' : 'bg-slate-950 border border-red-900/30 text-slate-400'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {preview && (
          <div className="bg-gradient-to-br from-red-950/60 to-black border border-red-900/50 rounded-2xl p-4 mb-4">
            <div className="text-xs uppercase tracking-widest text-red-500 mb-2 font-bold">Your Targets</div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <div className="text-xs text-slate-400">Daily Calories</div>
                <div className="text-2xl font-black text-red-300">{preview.calorieTarget}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Daily Protein</div>
                <div className="text-2xl font-black text-red-400">{preview.proteinTarget}g</div>
              </div>
            </div>
            <div className="text-xs text-slate-500">
              BMR: {preview.bmr} · TDEE: {preview.tdee} · Goal: {GOAL_LABELS[bodyStats.goal]}
            </div>
          </div>
        )}

        <div className="flex-1"></div>

        <button onClick={() => { if (editingBody) { setEditingBody(false); setView('nutrition'); } else { actuallyStartGame(difficulty); } }}
          disabled={!canSubmit}
          className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-4 rounded-xl disabled:opacity-40 hover:brightness-110 mb-2 uppercase tracking-wider shadow-lg shadow-red-950/50">
          {editingBody ? 'Save Changes' : 'Begin'}
        </button>

        {!editingBody && (
          <button onClick={() => actuallyStartGame(difficulty)} className="w-full text-slate-500 text-sm py-2 hover:text-red-400">
            Skip — use class defaults
          </button>
        )}
      </div>
    );
  }

  if (view === 'boss') {
    const boss = currentBoss || pickBossForWeek(weekNumber);
    const bossHp = currentBoss?.currentHp ?? boss.hp;
    const hpPct = (bossHp / boss.hp) * 100;

    return (
      <div className="min-h-screen bg-black text-white p-4 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setView('home')} className="bg-slate-950 border border-red-900/30 rounded-full p-2">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Skull size={20} className="text-red-500" />
            Weekly Boss
          </h2>
        </div>

        <div className="bg-gradient-to-br from-red-950 via-black to-black rounded-3xl p-8 mb-4 text-center border-2 border-red-500/50 shadow-2xl shadow-red-950">
          <div className="text-6xl font-black mb-3 text-red-400">{boss.emoji}</div>
          <h1 className="text-3xl font-black text-red-100 mb-1 tracking-tight">{boss.name}</h1>
          <div className="text-sm text-red-400 italic mb-4">{boss.flavor}</div>

          <div className="bg-black/80 rounded-2xl p-3 mb-3 border border-red-900/50">
            <div className="flex items-center gap-2 mb-2">
              <Heart size={16} className="text-red-500" fill="currentColor" />
              <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Boss HP</span>
              <span className="ml-auto font-black">{bossHp} / {boss.hp}</span>
            </div>
            <div className="h-4 bg-black rounded-full overflow-hidden border border-red-900/50">
              <div className="h-full bg-gradient-to-r from-red-700 to-red-500 transition-all duration-500" style={{ width: `${hpPct}%` }}></div>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-2 text-sm">
            <Trophy size={14} className="inline mr-1 text-red-400" />
            Reward: <span className="font-bold text-red-300">+{boss.reward} XP</span>
          </div>
        </div>

        <div className="bg-slate-950 border border-red-900/30 rounded-2xl p-4 mb-4">
          <div className="text-xs uppercase tracking-widest text-red-500 mb-3 font-bold">How to Fight</div>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <Dumbbell size={16} className="text-red-400 mt-0.5" />
              <div>
                <span className="font-bold">Complete workouts</span>
                <div className="text-xs text-slate-500">Deal damage equal to half your XP earned</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Apple size={16} className="text-red-400 mt-0.5" />
              <div>
                <span className="font-bold">Hit your protein goal</span>
                <div className="text-xs text-slate-500">Deal 80 damage per day you hit target</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-950 border border-red-900/30 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs uppercase tracking-widest text-red-500 font-bold">Boss Record</div>
            <div className="text-xs text-slate-600">Week {weekNumber + 1}</div>
          </div>
          <div className="flex items-center gap-3">
            <Trophy size={24} className="text-red-500" />
            <div>
              <div className="font-bold">{bossesDefeated} Bosses Defeated</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'achievements') {
    return (
      <div className="min-h-screen bg-black text-white p-4 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setView('home')} className="bg-slate-950 border border-red-900/30 rounded-full p-2">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Medal size={20} className="text-red-500" />
            Achievements
          </h2>
        </div>

        <div className="bg-gradient-to-br from-red-950/60 to-black border border-red-900/50 rounded-2xl p-4 mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-red-400 font-bold uppercase tracking-widest">Progress</span>
            <span className="font-bold">{unlockedAchievements.length} / {ACHIEVEMENTS.length}</span>
          </div>
          <div className="h-3 bg-black/60 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-500 to-red-700 transition-all duration-500"
              style={{ width: `${(unlockedAchievements.length / ACHIEVEMENTS.length) * 100}%` }}></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {ACHIEVEMENTS.map(ach => {
            const unlocked = unlockedAchievements.includes(ach.id);
            return (
              <div key={ach.id} className={`rounded-xl p-3 border ${unlocked ? 'bg-gradient-to-br from-red-950/60 to-black border-red-500/50' : 'bg-slate-950 border-red-900/20 opacity-40'}`}>
                <div className="mb-1">{unlocked ? <Trophy size={20} className="text-red-400" /> : <Shield size={20} className="text-slate-600" />}</div>
                <div className="font-bold text-sm">{ach.name}</div>
                <div className="text-xs text-slate-500 mb-1">{ach.desc}</div>
                <div className="text-xs text-red-400 font-bold">+{ach.xp} XP</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (view === 'stats') {
    const weightData = [...weightLog].sort((a, b) => new Date(a.date) - new Date(b.date));
    const weights = weightData.map(w => w.weight);
    const minW = weights.length > 0 ? Math.min(...weights) : 0;
    const maxW = weights.length > 0 ? Math.max(...weights) : 0;
    const wRange = Math.max(maxW - minW, 1);
    const latestWeight = weightData[weightData.length - 1]?.weight;
    const firstWeight = weightData[0]?.weight;
    const weightChange = latestWeight && firstWeight ? (latestWeight - firstWeight) : 0;

    const now = new Date();
    const weeklyXP = [0, 0, 0, 0, 0, 0, 0];
    const dayLabels = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      dayLabels.push(d.toLocaleDateString('en', { weekday: 'short' })[0]);
    }
    workoutHistory.forEach(w => {
      const d = new Date(w.date);
      const daysAgo = Math.floor((now - d) / (1000 * 60 * 60 * 24));
      if (daysAgo >= 0 && daysAgo < 7) weeklyXP[6 - daysAgo] += w.xp;
    });
    const maxDayXP = Math.max(...weeklyXP, 1);

    const byType = {};
    workoutHistory.forEach(w => { byType[w.type] = (byType[w.type] || 0) + 1; });
    const byTypeSorted = Object.entries(byType).sort((a, b) => b[1] - a[1]);
    const maxTypeCount = Math.max(...Object.values(byType), 1);

    return (
      <div className="min-h-screen bg-black text-white p-4 pb-24">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setView('home')} className="bg-slate-950 border border-red-900/30 rounded-full p-2">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BarChart3 size={20} className="text-red-500" />
            Stats
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-slate-950 border border-red-900/30 rounded-xl p-3">
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-1 font-bold">Total Workouts</div>
            <div className="text-2xl font-black text-red-400">{playerData.totalWorkouts}</div>
          </div>
          <div className="bg-slate-950 border border-red-900/30 rounded-xl p-3">
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-1 font-bold">Current Streak</div>
            <div className="text-2xl font-black text-red-500 flex items-center gap-1">
              {playerData.streak} <Flame size={18} />
            </div>
          </div>
          <div className="bg-slate-950 border border-red-900/30 rounded-xl p-3">
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-1 font-bold">Best Streak</div>
            <div className="text-2xl font-black text-red-400">{playerData.bestStreak || 0}</div>
          </div>
          <div className="bg-slate-950 border border-red-900/30 rounded-xl p-3">
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-1 font-bold">Knockouts</div>
            <div className="text-2xl font-black text-red-600">{playerData.knockouts || 0}</div>
          </div>
        </div>

        <div className="bg-slate-950 border border-red-900/30 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={16} className="text-red-500" />
            <h3 className="font-bold text-sm">Last 7 Days XP</h3>
            <div className="flex-1 text-right text-xs text-slate-500">
              Total: {weeklyXP.reduce((a, b) => a + b, 0)} XP
            </div>
          </div>
          <div className="flex items-end gap-2 h-32">
            {weeklyXP.map((xp, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs text-slate-500 font-mono">{xp > 0 ? xp : ''}</div>
                <div className="flex-1 w-full flex items-end">
                  <div className={`w-full rounded-t transition-all ${xp > 0 ? 'bg-gradient-to-t from-red-700 to-red-500' : 'bg-slate-900'}`}
                    style={{ height: `${Math.max(4, (xp / maxDayXP) * 100)}%` }}></div>
                </div>
                <div className="text-xs text-slate-600">{dayLabels[i]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-950 border border-red-900/30 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Scale size={16} className="text-red-500" />
              <h3 className="font-bold text-sm">Weight Trend</h3>
            </div>
            {weightData.length >= 2 && (
              <div className={`text-xs font-bold flex items-center gap-1 ${weightChange > 0 ? 'text-red-400' : weightChange < 0 ? 'text-green-400' : 'text-slate-500'}`}>
                {weightChange > 0 ? <TrendingUp size={14} /> : weightChange < 0 ? <TrendingDown size={14} /> : null}
                {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} {weightData[0].unit === 'metric' ? 'kg' : 'lbs'}
              </div>
            )}
          </div>

          {weightData.length === 0 ? (
            <div className="text-center text-slate-600 text-sm py-6">
              No weigh-ins yet. Log one below.
            </div>
          ) : weightData.length === 1 ? (
            <div className="text-center py-4">
              <div className="text-3xl font-black text-red-400">{weightData[0].weight}</div>
              <div className="text-xs text-slate-500">
                {weightData[0].unit === 'metric' ? 'kg' : 'lbs'}
              </div>
            </div>
          ) : (
            <div className="relative h-32 mb-2">
              <svg className="w-full h-full" viewBox={`0 0 ${weightData.length * 40} 100`} preserveAspectRatio="none">
                <polyline fill="none" stroke="#ef4444" strokeWidth="2"
                  points={weightData.map((w, i) => `${i * 40 + 20},${100 - ((w.weight - minW) / wRange) * 80 - 10}`).join(' ')} />
                {weightData.map((w, i) => (
                  <circle key={i} cx={i * 40 + 20} cy={100 - ((w.weight - minW) / wRange) * 80 - 10} r="3" fill="#ef4444" />
                ))}
              </svg>
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>{weightData[0].weight}</span>
                <span>{latestWeight}</span>
              </div>
            </div>
          )}

          <div className="bg-black border border-red-900/30 rounded-xl p-3 mt-3">
            <div className="text-xs text-red-500 uppercase tracking-widest mb-2 font-bold">Log Weigh-in</div>
            <div className="flex gap-2 mb-2">
              <input type="number" step="0.1" placeholder={`Weight (${bodyStats.unit === 'metric' ? 'kg' : 'lbs'})`}
                value={newWeight} onChange={(e) => setNewWeight(e.target.value)}
                className="flex-1 bg-slate-950 border border-red-900/30 rounded-lg px-3 py-2 text-sm" />
              <input type="number" step="0.1" placeholder="BF% (opt)"
                value={newBodyFat} onChange={(e) => setNewBodyFat(e.target.value)}
                className="w-24 bg-slate-950 border border-red-900/30 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="flex gap-2 mb-2 items-center">
              <input type="number" step="0.1" placeholder={`Goal weight (optional)`}
                value={goalWeight} onChange={(e) => setGoalWeight(e.target.value)}
                className="flex-1 bg-slate-950 border border-red-900/30 rounded-lg px-3 py-2 text-sm" />
            </div>
            <button onClick={logWeight} disabled={!newWeight}
              className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-2 rounded-lg disabled:opacity-40 text-sm uppercase tracking-wider">
              Log Weigh-in (+25 XP)
            </button>
          </div>
        </div>

        {weightData.length > 0 && (
          <div className="bg-slate-950 border border-red-900/30 rounded-2xl p-3 mb-4">
            <div className="text-xs uppercase tracking-widest text-red-500 mb-2 font-bold">History</div>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {[...weightData].reverse().map(w => (
                <div key={w.date} className="bg-black/60 rounded-lg p-2 flex items-center justify-between text-sm">
                  <div>
                    <span className="font-bold">{w.weight} {w.unit === 'metric' ? 'kg' : 'lbs'}</span>
                    {w.bodyFat && <span className="text-slate-500 ml-2">{w.bodyFat}% BF</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-600">
                      {new Date(w.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                    </span>
                    <button onClick={() => removeWeightEntry(w.date)} className="text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {byTypeSorted.length > 0 && (
          <div className="bg-slate-950 border border-red-900/30 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Dumbbell size={16} className="text-red-500" />
              <h3 className="font-bold text-sm">Workouts by Type</h3>
            </div>
            <div className="space-y-2">
              {byTypeSorted.map(([type, count]) => (
                <div key={type}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold">{type}</span>
                    <span className="text-slate-500">{count}×</span>
                  </div>
                  <div className="h-2 bg-black rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-600 to-red-800"
                      style={{ width: `${(count / maxTypeCount) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (view === 'nutrition') {
    const targets = getNutritionTargets();
    const totals = getTodayTotals();
    const calPct = Math.min(100, (totals.cal / targets.calorieTarget) * 100);
    const proteinPct = Math.min(100, (totals.protein / targets.proteinTarget) * 100);
    const meals = getTodayMeals();
    const filteredFoods = FOOD_DATABASE.filter(f => f.name.toLowerCase().includes(foodSearch.toLowerCase()));

    return (
      <div className="min-h-screen bg-black text-white p-4 pb-24">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setView('home')} className="bg-slate-950 border border-red-900/30 rounded-full p-2">
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Apple size={20} className="text-red-500" />
              Nutrition
            </h2>
          </div>
          <button onClick={() => { setEditingBody(true); setView('bodyStats'); }}
            className="text-xs text-slate-500 hover:text-red-400 bg-slate-950 border border-red-900/30 rounded-full px-3 py-1">
            Body stats
          </button>
        </div>

        <div className="bg-gradient-to-br from-red-950/60 to-black border border-red-900/50 rounded-2xl p-4 mb-4">
          <div className="text-xs uppercase tracking-widest text-red-500 mb-3 font-bold">Today's Totals</div>

          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold">Calories</span>
              <span><b>{totals.cal}</b> / {targets.calorieTarget}</span>
            </div>
            <div className="h-3 bg-black/60 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-500 to-red-700 rounded-full transition-all"
                style={{ width: `${calPct}%` }}></div>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold">Protein</span>
              <span><b>{totals.protein}g</b> / {targets.proteinTarget}g</span>
            </div>
            <div className="h-3 bg-black/60 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-600 to-pink-600 rounded-full transition-all"
                style={{ width: `${proteinPct}%` }}></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-black/60 rounded-lg p-2">
              <div className="text-xs text-slate-400">Carbs</div>
              <div className="font-bold">{totals.carbs}g</div>
            </div>
            <div className="bg-black/60 rounded-lg p-2">
              <div className="text-xs text-slate-400">Fat</div>
              <div className="font-bold">{totals.fat}g</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <button onClick={() => fileInputRef.current?.click()} disabled={photoAnalyzing}
            className="bg-gradient-to-br from-red-700 to-red-900 rounded-xl p-4 text-left disabled:opacity-60 border border-red-500/30">
            {photoAnalyzing ? <Loader className="animate-spin mb-1" size={20} /> : <Camera size={20} className="mb-1" />}
            <div className="font-bold text-sm">{photoAnalyzing ? "Analyzing..." : "Scan Photo"}</div>
            <div className="text-xs opacity-80">AI estimate</div>
          </button>
          <button onClick={() => setShowCustomFood(!showCustomFood)}
            className="bg-slate-950 border border-red-900/30 rounded-xl p-4 text-left">
            <Plus size={20} className="mb-1 text-red-500" />
            <div className="font-bold text-sm">Custom Entry</div>
            <div className="text-xs text-slate-500">Enter manually</div>
          </button>
        </div>

        <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" />

        {photoError && (
          <div className="bg-red-950/60 border border-red-500/50 rounded-xl p-3 mb-4 text-sm text-red-200 flex items-center justify-between">
            <span>{photoError}</span>
            <button onClick={() => setPhotoError(null)}><X size={14} /></button>
          </div>
        )}

        {showCustomFood && (
          <div className="bg-slate-950 border border-red-500/50 rounded-2xl p-4 mb-4">
            <div className="text-xs uppercase tracking-widest text-red-500 mb-2 font-bold">Add Custom Food</div>
            <input type="text" placeholder="Food name" value={customFood.name}
              onChange={(e) => setCustomFood({ ...customFood, name: e.target.value })}
              className="w-full bg-black border border-red-900/30 rounded-lg px-3 py-2 mb-2 text-sm" />
            <div className="grid grid-cols-4 gap-2 mb-3">
              <input type="number" placeholder="Cal" value={customFood.cal}
                onChange={(e) => setCustomFood({ ...customFood, cal: e.target.value })}
                className="bg-black border border-red-900/30 rounded-lg px-2 py-2 text-sm" />
              <input type="number" placeholder="P" value={customFood.protein}
                onChange={(e) => setCustomFood({ ...customFood, protein: e.target.value })}
                className="bg-black border border-red-900/30 rounded-lg px-2 py-2 text-sm" />
              <input type="number" placeholder="C" value={customFood.carbs}
                onChange={(e) => setCustomFood({ ...customFood, carbs: e.target.value })}
                className="bg-black border border-red-900/30 rounded-lg px-2 py-2 text-sm" />
              <input type="number" placeholder="F" value={customFood.fat}
                onChange={(e) => setCustomFood({ ...customFood, fat: e.target.value })}
                className="bg-black border border-red-900/30 rounded-lg px-2 py-2 text-sm" />
            </div>
            <button onClick={addCustomFood} disabled={!customFood.name || !customFood.cal}
              className="w-full bg-red-600 text-white font-bold py-2 rounded-lg disabled:opacity-40 uppercase tracking-wider">Add</button>
          </div>
        )}

        <div className="bg-slate-950 border border-red-900/30 rounded-2xl p-3 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Search size={16} className="text-slate-500" />
            <input type="text" placeholder="Quick add from library..."
              value={foodSearch} onChange={(e) => setFoodSearch(e.target.value)}
              className="bg-transparent flex-1 text-sm outline-none" />
          </div>
          <div className="max-h-56 overflow-y-auto space-y-1">
            {filteredFoods.slice(0, 15).map((food, idx) => (
              <button key={idx} onClick={() => addMeal(food)}
                className="w-full text-left bg-black hover:bg-red-950/40 rounded-lg px-3 py-2 text-sm flex items-center justify-between border border-transparent hover:border-red-900/50">
                <div>
                  <div className="font-semibold">{food.name}</div>
                  <div className="text-xs text-slate-500">{food.cal} cal · {food.protein}g P</div>
                </div>
                <Plus size={14} className="text-red-500" />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-950 border border-red-900/30 rounded-2xl p-3">
          <div className="text-xs uppercase tracking-widest text-red-500 mb-2 font-bold">Today's Log ({meals.length})</div>
          {meals.length === 0 ? (
            <div className="text-center text-slate-600 text-sm py-6">No meals logged yet today</div>
          ) : (
            <div className="space-y-2">
              {meals.map(meal => (
                <div key={meal.id} className="bg-black/60 rounded-lg p-3 flex items-center justify-between border border-red-900/20">
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{meal.name}</div>
                    <div className="text-xs text-slate-500">
                      {meal.cal} cal · {meal.protein}g P · {meal.carbs}g C · {meal.fat}g F
                    </div>
                  </div>
                  <button onClick={() => removeMeal(meal.id)} className="text-red-500 p-1">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (view === 'builder') {
    const filteredLibrary = Object.entries(EXERCISE_LIBRARY).map(([group, exs]) => ({
      group,
      exs: exs.filter(e => e.toLowerCase().includes(librarySearch.toLowerCase()))
    })).filter(g => g.exs.length > 0);

    return (
      <div className="min-h-screen bg-black text-white p-4 pb-32">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setView('home')} className="bg-slate-950 border border-red-900/30 rounded-full p-2">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold">Create Custom Workout</h2>
        </div>

        <input type="text" placeholder="Workout name"
          value={builderName} onChange={(e) => setBuilderName(e.target.value)}
          className="w-full bg-slate-950 border border-red-900/30 rounded-xl px-4 py-3 mb-3 text-white" />

        <div className="mb-3">
          <div className="text-xs text-red-500 mb-2 uppercase tracking-widest font-bold">Primary Stat</div>
          <div className="grid grid-cols-3 gap-2">
            {["STR", "END", "AGI"].map(s => (
              <button key={s} onClick={() => setBuilderStat(s)}
                className={`py-2 rounded-xl font-bold ${builderStat === s ? 'bg-red-600 text-white' : 'bg-slate-950 border border-red-900/30 text-slate-400'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-xs text-red-500 mb-2 uppercase tracking-widest font-bold">
            Exercises ({builderExercises.length})
          </div>
          <div className="space-y-2">
            {builderExercises.map((ex, idx) => (
              <div key={idx} className="bg-slate-950 border border-red-900/30 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-sm flex-1">{ex.name}</div>
                  <button onClick={() => removeFromBuilder(idx)} className="text-red-500 p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex gap-2">
                  <input type="number" value={ex.sets}
                    onChange={(e) => updateBuilderExercise(idx, 'sets', parseInt(e.target.value) || 1)}
                    className="bg-black border border-red-900/30 rounded-lg px-2 py-1 w-16 text-sm" />
                  <span className="text-slate-500 self-center text-xs">sets ×</span>
                  <input type="text" value={ex.reps}
                    onChange={(e) => updateBuilderExercise(idx, 'reps', e.target.value)}
                    className="bg-black border border-red-900/30 rounded-lg px-2 py-1 flex-1 text-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-950 border border-red-900/30 rounded-2xl p-3">
          <div className="flex items-center gap-2 mb-3">
            <Search size={16} className="text-slate-500" />
            <input type="text" placeholder="Search exercises..."
              value={librarySearch} onChange={(e) => setLibrarySearch(e.target.value)}
              className="bg-transparent flex-1 text-sm outline-none" />
          </div>
          <div className="max-h-80 overflow-y-auto space-y-3">
            {filteredLibrary.map(({ group, exs }) => (
              <div key={group}>
                <div className="text-xs font-bold text-red-500 uppercase tracking-widest mb-1">{group}</div>
                <div className="space-y-1">
                  {exs.map(name => (
                    <button key={name} onClick={() => addToBuilder(name)}
                      className="w-full text-left bg-black hover:bg-red-950/40 rounded-lg px-3 py-2 text-sm flex items-center justify-between border border-transparent hover:border-red-900/50">
                      <span>{name}</span>
                      <Plus size={14} className="text-red-500" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-red-900/30 p-4">
          <div className="max-w-md mx-auto">
            <button onClick={saveCustomWorkout}
              disabled={!builderName.trim() || builderExercises.length === 0}
              className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-3 rounded-xl disabled:opacity-40 uppercase tracking-wider shadow-lg shadow-red-950/50">
              Save Workout
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'workout' && activeWorkout && workouts[activeWorkout]) {
    const workout = workouts[activeWorkout];
    const completedCount = Object.values(completedExercises).filter(Boolean).length;
    const filteredInWorkout = ALL_EXERCISES.filter(e => e.toLowerCase().includes(inWorkoutSearch.toLowerCase()));
    const mult = DIFFICULTY[difficulty].xpMultiplier;
    const projectedXp = Math.round((50 + completedCount * 15 + (playerData.streak >= 3 ? 25 : 0)) * mult);

    return (
      <div className="min-h-screen bg-black text-white p-4 pb-24">
        <div className={`bg-gradient-to-r ${workout.color} rounded-2xl p-5 mb-4 shadow-xl shadow-red-950/50 border border-red-500/30`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{workout.name}</h2>
              <p className="text-sm opacity-90 uppercase tracking-wider">Stat: +{workout.stat}</p>
            </div>
            <button onClick={() => { setActiveWorkout(null); setView('home'); }} className="bg-black/40 rounded-full p-2">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          {activeExercises.map((ex, idx) => {
            const lastSession = exerciseHistory[ex.name]?.[exerciseHistory[ex.name].length - 1];
            const currentData = currentSetData[idx] || {};
            return (
              <div key={idx} className={`rounded-xl p-3 transition-all ${completedExercises[idx] ? 'bg-red-950/60 border-2 border-red-500' : 'bg-slate-950 border-2 border-red-900/30'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <button onClick={() => toggleExercise(idx)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center ${completedExercises[idx] ? 'bg-red-500' : 'bg-black border border-red-900/50'}`}>
                    {completedExercises[idx] ? <Check size={18} /> : <span className="text-slate-500">{idx + 1}</span>}
                  </button>
                  <div className="flex-1">
                    <div className="font-semibold">{ex.name}</div>
                    <div className="text-xs text-slate-500">Target: {ex.sets} × {ex.reps}</div>
                  </div>
                  <button onClick={() => removeExerciseFromActive(idx)} className="text-red-500 p-1">
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="flex gap-2 items-center">
                  <input type="number" step="2.5"
                    placeholder={lastSession ? `${lastSession.weight}` : "Weight"}
                    value={currentData.weight || ''}
                    onChange={(e) => setCurrentSetData({ ...currentSetData, [idx]: { ...currentData, weight: e.target.value } })}
                    className="bg-black border border-red-900/30 rounded-lg px-2 py-1.5 w-20 text-sm" />
                  <span className="text-xs text-slate-500">lb ×</span>
                  <input type="number"
                    placeholder={lastSession ? `${lastSession.reps}` : "Reps"}
                    value={currentData.reps || ''}
                    onChange={(e) => setCurrentSetData({ ...currentSetData, [idx]: { ...currentData, reps: e.target.value } })}
                    className="bg-black border border-red-900/30 rounded-lg px-2 py-1.5 w-16 text-sm" />
                  {lastSession && (
                    <span className="text-xs text-red-400 ml-auto">
                      Last: {lastSession.weight}×{lastSession.reps}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!addingExerciseInWorkout ? (
          <button onClick={() => setAddingExerciseInWorkout(true)}
            className="w-full bg-slate-950 border-2 border-dashed border-red-900/50 rounded-xl py-3 text-slate-500 flex items-center justify-center gap-2 mb-4 hover:text-red-400 hover:border-red-500">
            <Plus size={18} /> Add Exercise
          </button>
        ) : (
          <div className="bg-slate-950 rounded-xl p-3 mb-4 border border-red-500/50">
            <div className="flex items-center gap-2 mb-2">
              <Search size={16} className="text-slate-500" />
              <input type="text" placeholder="Search exercises..."
                value={inWorkoutSearch} onChange={(e) => setInWorkoutSearch(e.target.value)}
                className="bg-transparent flex-1 text-sm outline-none" autoFocus />
              <button onClick={() => { setAddingExerciseInWorkout(false); setInWorkoutSearch(""); }} className="text-slate-500">
                <X size={16} />
              </button>
            </div>
            <div className="max-h-48 overflow-y-auto space-y-1">
              {filteredInWorkout.slice(0, 20).map(name => (
                <button key={name} onClick={() => addExerciseDuringWorkout(name)}
                  className="w-full text-left bg-black hover:bg-red-950/40 rounded-lg px-3 py-2 text-sm">
                  + {name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-red-900/30 p-4">
          <div className="max-w-md mx-auto">
            <div className="text-center text-sm text-slate-500 mb-2">
              {completedCount} / {activeExercises.length} completed
            </div>
            <button onClick={finishWorkout} disabled={completedCount === 0}
              className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-4 rounded-xl disabled:opacity-40 uppercase tracking-wider shadow-lg shadow-red-950/50">
              <Swords className="inline mr-2" size={20} />
              Finish (+{projectedXp} XP)
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!playerData || !difficulty) {
    return null;
  }

  const diffConfig = DIFFICULTY[difficulty];
  const DIcon = diffConfig.icon;
  const xpNeeded = xpForLevel(playerData.level);
  const xpPercent = (playerData.xp / xpNeeded) * 100;
  const title = getTitle(playerData.level);
  const quests = getWeeklyQuests();

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-8 relative overflow-hidden">
      {/* Hidden file input for importing save from the home screen */}
      <input type="file" accept="application/json,.json" ref={importFileRef} onChange={handleImportChange} className="hidden" />

      {/* Save data modal */}
      <SaveDataModal />

      {/* Save message toast */}
      {saveMessage && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl border text-sm font-bold max-w-sm text-center ${
          saveMessage.type === 'success' ? 'bg-red-950/90 border-red-500/50 text-red-200' : 'bg-red-950/90 border-red-500 text-red-100'
        }`}>
          {saveMessage.text}
        </div>
      )}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>

      {showXpGain && (
        <div className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-red-500 to-red-700 text-white font-black text-2xl px-6 py-3 rounded-2xl shadow-2xl shadow-red-950/80 text-center border border-red-400">
            +{showXpGain.xp} XP
            {showXpGain.hp > 0 && <div className="text-sm">+{showXpGain.hp} HP healed</div>}
            {showXpGain.goalHit && <div className="text-sm">GOAL HIT! +{showXpGain.bonus}</div>}
            {!showXpGain.goalHit && showXpGain.bonus > 0 && <span className="text-sm block">Streak bonus!</span>}
          </div>
        </div>
      )}

      {showLevelUp && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setShowLevelUp(false)}>
          <div className="bg-gradient-to-br from-red-600 to-red-900 rounded-3xl p-8 text-center max-w-sm border-4 border-red-400 shadow-2xl shadow-red-950">
            <Trophy size={64} className="mx-auto mb-3" />
            <div className="text-white/80 text-sm font-bold uppercase tracking-widest">Level Up</div>
            <div className="text-5xl font-black text-white mb-2">LVL {playerData.level}</div>
            <div className="text-white font-bold mb-4">{title}</div>
            <button className="bg-black text-red-400 px-6 py-2 rounded-full font-bold uppercase tracking-wider" onClick={() => setShowLevelUp(false)}>
              Continue
            </button>
          </div>
        </div>
      )}

      {showKnockout && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-red-700 to-red-950 rounded-3xl p-8 text-center max-w-sm border-4 border-red-500 shadow-2xl shadow-red-950">
            <div className="text-red-200 text-sm font-bold uppercase tracking-widest">Knocked Out</div>
            <div className="text-3xl font-black text-white mb-2">You passed out</div>
            <div className="text-red-200 text-sm mb-4">Streak reset. Respawn at 50 HP.</div>
            <button className="bg-white text-red-700 px-6 py-2 rounded-full font-bold uppercase tracking-wider" onClick={() => setShowKnockout(false)}>
              Get Back Up
            </button>
          </div>
        </div>
      )}

      {newAchievement && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setNewAchievement(null)}>
          <div className="bg-gradient-to-br from-red-600 to-red-900 rounded-3xl p-6 text-center max-w-sm border-4 border-red-400 shadow-2xl shadow-red-950 animate-bounce">
            <div className="text-xs text-white/80 font-bold uppercase tracking-widest">Achievement Unlocked</div>
            <Trophy size={56} className="mx-auto my-3 text-white" />
            <div className="text-2xl font-black text-white mb-1">{newAchievement.name}</div>
            <div className="text-sm text-white/90 mb-3">{newAchievement.desc}</div>
            <div className="bg-black/40 rounded-full px-3 py-1 inline-block text-sm font-bold text-white">
              +{newAchievement.xp} XP
            </div>
            <div className="mt-4">
              <button className="bg-black text-red-400 px-6 py-2 rounded-full font-bold uppercase tracking-wider" onClick={() => setNewAchievement(null)}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {showBossDefeat && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={() => setShowBossDefeat(null)}>
          <div className="bg-gradient-to-br from-red-700 via-red-900 to-black rounded-3xl p-8 text-center max-w-sm border-4 border-red-500 shadow-2xl shadow-red-950">
            <div className="text-sm text-white/80 font-bold uppercase tracking-widest">Boss Defeated</div>
            <Skull size={72} className="mx-auto my-3 text-white" />
            <div className="text-2xl font-black text-white mb-1">{showBossDefeat.boss.name}</div>
            <div className="text-sm text-white/80 mb-3">has been vanquished</div>
            <div className="bg-black/60 rounded-xl px-4 py-3 mb-4 border border-red-500/30">
              <div className="text-xs text-red-300 uppercase tracking-widest">Reward</div>
              <div className="text-3xl font-black text-red-300">+{showBossDefeat.reward} XP</div>
            </div>
            <button className="bg-white text-red-700 px-6 py-2 rounded-full font-bold uppercase tracking-wider" onClick={() => setShowBossDefeat(null)}>
              Victory
            </button>
          </div>
        </div>
      )}

      {daysAwayMessage && (
        <div className="bg-red-950/60 border border-red-500/50 rounded-2xl p-3 mb-3 flex items-center gap-3">
          <div className="flex-1">
            <div className="text-sm font-bold text-red-200 uppercase tracking-wider">Welcome back</div>
            <div className="text-xs text-red-300">
              Missed {daysAwayMessage.days} {daysAwayMessage.days === 1 ? 'day' : 'days'} — took {daysAwayMessage.damage} damage
            </div>
          </div>
          <button onClick={() => setDaysAwayMessage(null)} className="text-red-300">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="relative flex items-center justify-between mb-3">
        <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${diffConfig.color} rounded-full px-3 py-1 shadow-lg shadow-red-950/50 border border-red-500/30`}>
          <DIcon size={14} />
          <span className="text-xs font-bold uppercase tracking-wider">{diffConfig.name}</span>
        </div>
        {/* NEW: Save Data button replaces the old Reset link */}
        <button
          onClick={() => setShowSaveModal(true)}
          className="text-xs text-slate-500 hover:text-red-400 uppercase tracking-wider flex items-center gap-1 bg-slate-950 border border-red-900/30 rounded-full px-3 py-1"
        >
          <Save size={12} /> Save Data
        </button>
      </div>

      <div className="relative bg-gradient-to-br from-red-950 via-black to-red-950/60 rounded-3xl p-5 mb-4 shadow-2xl shadow-red-950/50 border border-red-500/30 overflow-hidden">
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs uppercase tracking-widest text-red-400 font-bold">{title}</div>
              <div className="text-2xl font-black tracking-tight">{playerData.name}</div>
            </div>
            <div className="bg-black/60 rounded-2xl px-3 py-2 text-center border border-red-500/30">
              <div className="text-xs opacity-70 uppercase tracking-wider">LVL</div>
              <div className="text-3xl font-black leading-none text-red-400">{playerData.level}</div>
            </div>
          </div>

          <div className="mb-2">
            <div className="flex justify-between text-xs mb-1 opacity-90">
              <span className="flex items-center gap-1 uppercase tracking-wider font-bold">
                <Heart size={12} className="text-red-400" fill="currentColor" />
                HP
              </span>
              <span className="font-bold">{playerData.hp} / {playerData.maxHp}</span>
            </div>
            <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-red-900/50">
              <div className={`h-full rounded-full transition-all duration-500 ${
                playerData.hp / playerData.maxHp > 0.6 ? 'bg-gradient-to-r from-red-400 to-red-500' :
                playerData.hp / playerData.maxHp > 0.3 ? 'bg-gradient-to-r from-red-500 to-red-700' :
                'bg-gradient-to-r from-red-700 to-red-900'
              }`}
              style={{ width: `${(playerData.hp / playerData.maxHp) * 100}%` }}></div>
            </div>
          </div>

          <div className="mb-2">
            <div className="flex justify-between text-xs mb-1 opacity-80">
              <span className="uppercase tracking-wider font-bold">XP</span>
              <span>{playerData.xp} / {xpNeeded}</span>
            </div>
            <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-red-900/50">
              <div className="h-full bg-gradient-to-r from-red-300 to-red-500 rounded-full transition-all duration-500"
                style={{ width: `${xpPercent}%` }}></div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <div className="bg-black/60 rounded-full px-3 py-1 flex items-center gap-1 border border-red-900/30">
              <Flame size={14} className="text-red-500" />
              <span className="text-sm font-bold">{playerData.streak} day</span>
            </div>
            <div className="bg-black/60 rounded-full px-3 py-1 flex items-center gap-1 border border-red-900/30">
              <Dumbbell size={14} />
              <span className="text-sm font-bold">{playerData.totalWorkouts} total</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-2 mb-4">
        <div className="bg-slate-950 border border-red-900/30 rounded-xl p-3 text-center">
          <Swords size={20} className="mx-auto text-red-500 mb-1" />
          <div className="text-xs text-slate-500 uppercase tracking-wider">STR</div>
          <div className="text-2xl font-black text-red-400">{playerData.stats.STR}</div>
        </div>
        <div className="bg-slate-950 border border-red-900/30 rounded-xl p-3 text-center">
          <Heart size={20} className="mx-auto text-red-400 mb-1" />
          <div className="text-xs text-slate-500 uppercase tracking-wider">END</div>
          <div className="text-2xl font-black text-red-400">{playerData.stats.END}</div>
        </div>
        <div className="bg-slate-950 border border-red-900/30 rounded-xl p-3 text-center">
          <Zap size={20} className="mx-auto text-red-300 mb-1" />
          <div className="text-xs text-slate-500 uppercase tracking-wider">AGI</div>
          <div className="text-2xl font-black text-red-400">{playerData.stats.AGI}</div>
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-2 mb-4">
        {(() => {
          const targets = getNutritionTargets();
          const totals = getTodayTotals();
          const calPct = Math.min(100, (totals.cal / targets.calorieTarget) * 100);
          return (
            <button onClick={() => setView('nutrition')}
              className="bg-gradient-to-br from-red-950/60 to-black border border-red-900/50 rounded-2xl p-3 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Apple size={14} className="text-red-500" />
                <div className="font-bold text-xs uppercase tracking-wider">Nutrition</div>
              </div>
              <div className="text-xs text-slate-400 mb-1">
                <span className="font-bold text-white">{totals.cal}</span>/{targets.calorieTarget} cal
              </div>
              <div className="h-1 bg-black/60 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-red-700" style={{ width: `${calPct}%` }}></div>
              </div>
            </button>
          );
        })()}

        <button onClick={() => setView('stats')}
          className="bg-gradient-to-br from-red-950/60 to-black border border-red-900/50 rounded-2xl p-3 text-left">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={14} className="text-red-500" />
            <div className="font-bold text-xs uppercase tracking-wider">Stats</div>
          </div>
          <div className="text-xs text-slate-400">
            <span className="font-bold text-white">{playerData.totalWorkouts}</span> workouts
          </div>
          <div className="text-xs text-slate-400">
            <span className="font-bold text-white">{weightLog.length}</span> weigh-ins
          </div>
        </button>
      </div>

      {(() => {
        const boss = currentBoss || pickBossForWeek(weekNumber);
        const bossHp = currentBoss?.currentHp ?? boss.hp;
        const hpPct = (bossHp / boss.hp) * 100;
        return (
          <button onClick={() => setView('boss')}
            className="relative w-full bg-gradient-to-br from-red-950 to-black border-2 border-red-500/50 rounded-2xl p-3 mb-4 text-left shadow-lg shadow-red-950/50">
            <div className="text-xs text-red-500 font-bold mb-1 uppercase tracking-widest">Weekly Boss</div>
            <div className="font-black text-lg tracking-tight">{boss.name}</div>
            <div className="text-xs text-red-400 italic mb-2">{boss.flavor}</div>
            <div className="flex items-center gap-2">
              <Heart size={12} className="text-red-500" fill="currentColor" />
              <div className="flex-1 h-2 bg-black rounded-full overflow-hidden border border-red-900/50">
                <div className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all" style={{ width: `${hpPct}%` }}></div>
              </div>
              <span className="text-xs font-bold">{bossHp}/{boss.hp}</span>
            </div>
          </button>
        );
      })()}

      <button onClick={() => setView('achievements')}
        className="relative w-full bg-slate-950 border border-red-900/30 rounded-xl p-3 mb-4 flex items-center gap-3">
        <Medal size={18} className="text-red-500" />
        <div className="flex-1 text-left">
          <div className="font-bold text-sm uppercase tracking-wider">Achievements</div>
          <div className="text-xs text-slate-500">{unlockedAchievements.length} / {ACHIEVEMENTS.length} unlocked</div>
        </div>
      </button>

      <div className="relative bg-slate-950 border border-red-900/30 rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Target size={18} className="text-red-500" />
          <h3 className="font-bold uppercase tracking-wider">Weekly Quests</h3>
        </div>
        <div className="space-y-2">
          {quests.map(quest => {
            const progress = questProgress(quest);
            const isComplete = progress >= quest.target;
            const isClaimed = playerData.questsCompleted.includes(quest.id);
            const QuestIcon = quest.icon;
            return (
              <div key={quest.id} className="bg-black/60 rounded-xl p-3 border border-red-900/20">
                <div className="flex items-center gap-3 mb-1">
                  <QuestIcon size={16} className="text-red-500" />
                  <div className="flex-1 text-sm font-semibold">{quest.name}</div>
                  <div className="text-xs text-red-400 font-bold">+{quest.xp} XP</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-black rounded-full overflow-hidden border border-red-900/30">
                    <div className="h-full bg-gradient-to-r from-red-500 to-red-700"
                      style={{ width: `${(progress / quest.target) * 100}%` }}></div>
                  </div>
                  <span className="text-xs text-slate-500">{progress}/{quest.target}</span>
                  {isComplete && !isClaimed && (
                    <button onClick={() => claimQuest(quest)} className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse uppercase tracking-wider">
                      Claim
                    </button>
                  )}
                  {isClaimed && <Check size={16} className="text-red-500" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative flex items-center justify-between mb-3">
        <h3 className="font-bold flex items-center gap-2 uppercase tracking-wider">
          <Dumbbell size={18} />
          Today's Quest
        </h3>
        <button onClick={openBuilder}
          className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 uppercase tracking-wider">
          <Plus size={14} /> Create
        </button>
      </div>

      <div className="relative grid grid-cols-2 gap-3">
        {Object.entries(workouts).map(([key, w]) => (
          <div key={key} className="relative">
            <button onClick={() => startWorkout(key)}
              className={`bg-gradient-to-br ${w.color} rounded-2xl p-4 text-left shadow-lg shadow-red-950/50 border border-red-500/30 hover:scale-105 transition-transform w-full`}>
              <div className="font-bold">{w.name}</div>
              <div className="text-xs opacity-90 uppercase tracking-wider">+{w.stat} · {w.exercises.length} ex</div>
            </button>
            {w.custom && (
              <button onClick={(e) => { e.stopPropagation(); deleteCustomWorkout(key); }}
                className="absolute top-2 right-2 bg-black/60 rounded-full p-1">
                <X size={12} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="relative text-center text-xs text-slate-700 mt-6 uppercase tracking-[0.3em] font-bold">
        Forge yourself · {diffConfig.name}
      </div>
    </div>
  );
}