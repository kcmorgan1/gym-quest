import React, { useState, useEffect, useRef } from 'react';
import { Swords, Flame, Heart, Zap, Dumbbell, Trophy, Target, Check, Plus, X, Trash2, Search, ArrowLeft, Shield, Crown, Star, Apple, Camera, Loader, Scale, BarChart3, TrendingUp, TrendingDown, Calendar, Skull, Medal } from 'lucide-react';

const TITLES = [
  { level: 1, name: "Novice Wanderer" },
  { level: 3, name: "Iron Squire" },
  { level: 5, name: "Gym Knight" },
  { level: 8, name: "Steel Warden" },
  { level: 12, name: "Iron Baron" },
  { level: 16, name: "Champion of the Rack" },
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
      name: "Full Body A", icon: "A", color: "from-cyan-500 to-blue-500", stat: "STR",
      exercises: [
        { name: "Goblet Squat", sets: 3, reps: "10" },
        { name: "Push-Ups", sets: 3, reps: "8-10" },
        { name: "Dumbbell Row", sets: 3, reps: "10" },
        { name: "Plank", sets: 3, reps: "30 sec" },
      ]
    },
    fullbody_b: {
      name: "Full Body B", icon: "B", color: "from-green-500 to-emerald-500", stat: "STR",
      exercises: [
        { name: "Romanian Deadlift", sets: 3, reps: "10" },
        { name: "Dumbbell Shoulder Press", sets: 3, reps: "10" },
        { name: "Lat Pulldown", sets: 3, reps: "10" },
        { name: "Dead Bug", sets: 3, reps: "10 each" },
      ]
    },
    light_cardio: {
      name: "Easy Cardio", icon: "C", color: "from-yellow-500 to-orange-500", stat: "END",
      exercises: [
        { name: "Incline Treadmill Walk", sets: 1, reps: "20 min" },
        { name: "Plank", sets: 2, reps: "30 sec" },
        { name: "Crunches", sets: 2, reps: "15" },
      ]
    },
  },
  intermediate: {
    push: {
      name: "Push Day", icon: "P", color: "from-red-500 to-orange-500", stat: "STR",
      exercises: [
        { name: "Bench Press", sets: 4, reps: "6-8" },
        { name: "Overhead Press", sets: 3, reps: "8-10" },
        { name: "Incline DB Press", sets: 3, reps: "10-12" },
        { name: "Lateral Raises", sets: 3, reps: "12-15" },
        { name: "Tricep Pushdowns", sets: 3, reps: "10-12" },
      ]
    },
    pull: {
      name: "Pull Day", icon: "L", color: "from-blue-500 to-purple-500", stat: "STR",
      exercises: [
        { name: "Pull-Ups", sets: 4, reps: "6-10" },
        { name: "Barbell Row", sets: 3, reps: "8-10" },
        { name: "Seated Cable Row", sets: 3, reps: "10-12" },
        { name: "Face Pulls", sets: 3, reps: "12-15" },
        { name: "Bicep Curls", sets: 3, reps: "10-12" },
      ]
    },
    lower: {
      name: "Lower Body", icon: "X", color: "from-green-500 to-emerald-500", stat: "STR",
      exercises: [
        { name: "Back Squat", sets: 4, reps: "6-8" },
        { name: "Romanian Deadlift", sets: 3, reps: "8-10" },
        { name: "Leg Press", sets: 3, reps: "10-12" },
        { name: "Walking Lunges", sets: 3, reps: "12 each" },
        { name: "Calf Raises", sets: 4, reps: "12-15" },
      ]
    },
    cardio: {
      name: "Cardio + Core", icon: "R", color: "from-yellow-500 to-orange-500", stat: "END",
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
      name: "Chest + Triceps", icon: "C", color: "from-red-500 to-pink-500", stat: "STR",
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
      name: "Back + Biceps", icon: "B", color: "from-blue-500 to-indigo-500", stat: "STR",
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
      name: "Heavy Legs", icon: "L", color: "from-green-500 to-teal-500", stat: "STR",
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
      name: "Shoulders", icon: "S", color: "from-violet-500 to-fuchsia-500", stat: "STR",
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
      name: "Conditioning", icon: "R", color: "from-orange-500 to-red-500", stat: "END",
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
    name: "Beginner",
    subtitle: "New to the gym",
    icon: Shield,
    color: "from-green-400 to-emerald-600",
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
    name: "Intermediate",
    subtitle: "Training consistently",
    icon: Star,
    color: "from-blue-400 to-purple-600",
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
    name: "Expert",
    subtitle: "Experienced lifter",
    icon: Crown,
    color: "from-yellow-400 via-orange-500 to-red-600",
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
  "from-red-500 to-orange-500", "from-blue-500 to-purple-500", "from-green-500 to-emerald-500",
  "from-yellow-500 to-orange-500", "from-pink-500 to-rose-500", "from-cyan-500 to-blue-500",
  "from-violet-500 to-fuchsia-500", "from-teal-500 to-green-500",
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
  { id: 'level_5', name: "Gym Knight", desc: "Reach level 5", xp: 100 },
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

export default function GymQuest() {
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
  const [builderColor, setBuilderColor] = useState(COLOR_OPTIONS[6]);
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

  // Load saved game on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gymquest-save');
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

  // Save game
  useEffect(() => {
    if (!isLoaded || !playerData || !difficulty) return;
    try {
      const data = {
        playerName, difficulty, workouts, playerData, mealsLog, bodyStats,
        weightLog, workoutHistory, goalWeight, currentBoss, bossesDefeated,
        weekNumber, unlockedAchievements, proteinGoalDays, exerciseHistory,
        lastPlayed: new Date().toISOString(), version: '1.9-local',
      };
      localStorage.setItem('gymquest-save', JSON.stringify(data));
    } catch (err) {
      console.error('Save failed:', err);
    }
  }, [playerData, difficulty, workouts, playerName, mealsLog, bodyStats, weightLog, workoutHistory, goalWeight, currentBoss, bossesDefeated, weekNumber, unlockedAchievements, proteinGoalDays, exerciseHistory, isLoaded]);

  const resetGame = () => {
    try { localStorage.removeItem('gymquest-save'); } catch (err) {}
    setDifficulty(null);
    setPlayerData(null);
    setWorkouts({});
    setQuizStep(0);
    setQuizAnswers({});
    setRecommendation(null);
    setView('intro');
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

  const takeDamage = () => {
    const damage = 20;
    let newHp = playerData.hp - damage;
    let newStreak = playerData.streak;
    let newKnockouts = playerData.knockouts;

    if (newHp <= 0) {
      newHp = 50;
      newStreak = 0;
      newKnockouts = playerData.knockouts + 1;
      setShowKnockout(true);
    }

    setPlayerData({ ...playerData, hp: newHp, streak: newStreak, knockouts: newKnockouts });
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
    setBuilderColor(COLOR_OPTIONS[6]);
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

  // LOADING
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin mb-4">
            <Swords size={48} className="text-yellow-400" />
          </div>
          <div className="text-slate-400 text-sm">Loading your save...</div>
        </div>
      </div>
    );
  }

  // INTRO
  if (view === 'intro') {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-4 flex flex-col">
        <div className="text-center pt-12 pb-8">
          <div className="inline-block bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 p-4 rounded-3xl mb-4 shadow-2xl">
            <Swords size={48} className="text-white" />
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent mb-2">
            GYM QUEST
          </h1>
          <p className="text-slate-400 text-sm">Level up your body. Literally.</p>
        </div>

        <div className="mb-6">
          <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Your Hero's Name</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-lg focus:border-yellow-500 outline-none"
            placeholder="Enter your name..."
            maxLength={20}
          />
        </div>

        <div className="bg-gradient-to-br from-indigo-600/40 to-purple-600/40 border border-indigo-500/30 rounded-2xl p-5 mb-4">
          <div className="text-xs text-indigo-300 uppercase tracking-wider mb-2 font-bold">Character Creation</div>
          <h3 className="font-bold mb-1">Find your class</h3>
          <p className="text-sm text-slate-300 mb-4">Answer 5 quick questions and we'll match you to the right tier.</p>
          <button
            onClick={startQuiz}
            disabled={!playerName.trim()}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 rounded-xl disabled:opacity-40 hover:brightness-110"
          >
            BEGIN QUIZ
          </button>
        </div>

        <button
          onClick={() => setView('manualSelect')}
          disabled={!playerName.trim()}
          className="text-sm text-slate-400 hover:text-slate-200 underline disabled:opacity-40"
        >
          Skip quiz. Pick class manually.
        </button>

        <div className="flex-1"></div>
        <div className="text-center text-xs text-slate-500 pt-6 pb-4">
          You can change your class anytime
        </div>
      </div>
    );
  }

  // QUIZ
  if (view === 'quiz') {
    const q = QUIZ_QUESTIONS[quizStep];
    const progress = ((quizStep + 1) / QUIZ_QUESTIONS.length) * 100;

    return (
      <div className="min-h-screen bg-slate-900 text-white p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={goBackQuiz} className="bg-slate-800 rounded-full p-2">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <div className="text-xs text-slate-400 mb-1">Question {quizStep + 1} of {QUIZ_QUESTIONS.length}</div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        <div className="pt-6 pb-4">
          <h2 className="text-2xl font-black mb-2">{q.question}</h2>
          <p className="text-sm text-slate-400">{q.subtitle}</p>
        </div>

        <div className="space-y-3 flex-1">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => answerQuiz(opt)}
              className="w-full bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 hover:border-yellow-500 rounded-2xl p-4 text-left transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-300">
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

  // RECOMMENDATION
  if (view === 'recommendation' && recommendation) {
    const rec = DIFFICULTY[recommendation.winner];
    const DIcon = rec.icon;
    const total = recommendation.totals.beginner + recommendation.totals.intermediate + recommendation.totals.expert;

    return (
      <div className="min-h-screen bg-slate-900 text-white p-4 flex flex-col">
        <div className="text-center pt-8 pb-4">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">Your Recommended Class</div>
          <div className={`inline-block bg-gradient-to-br ${rec.color} p-6 rounded-3xl mb-4 shadow-2xl`}>
            <DIcon size={56} className="text-white" />
          </div>
          <h1 className="text-4xl font-black mb-1">{rec.name}</h1>
          <p className="text-slate-400">{rec.subtitle}</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4 mb-4 border border-slate-700">
          <p className="text-sm text-slate-300 mb-4">{rec.description}</p>
          <div className="space-y-2">
            {Object.entries(recommendation.totals).sort((a, b) => b[1] - a[1]).map(([tier, score]) => {
              const config = DIFFICULTY[tier];
              const percent = total > 0 ? (score / total) * 100 : 0;
              const isWinner = tier === recommendation.winner;
              return (
                <div key={tier}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={isWinner ? "font-bold text-yellow-400" : "text-slate-400"}>
                      {config.name} {isWinner && "- You"}
                    </span>
                    <span className={isWinner ? "font-bold text-yellow-400" : "text-slate-400"}>
                      {Math.round(percent)}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${config.color} transition-all duration-700`} style={{ width: `${percent}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1"></div>

        <div className="space-y-2 pb-4">
          <button onClick={() => startGame(recommendation.winner)} className={`w-full bg-gradient-to-r ${rec.color} text-white font-bold py-4 rounded-xl shadow-xl hover:brightness-110`}>
            BEGIN AS {rec.name.toUpperCase()}
          </button>
          <button onClick={() => setView('manualSelect')} className="w-full bg-slate-800 text-slate-300 font-semibold py-3 rounded-xl hover:bg-slate-700">
            Choose a different class
          </button>
          <button onClick={() => { setQuizStep(0); setQuizAnswers({}); setView('quiz'); }} className="w-full text-slate-500 text-sm py-2 hover:text-slate-300">
            Retake quiz
          </button>
        </div>
      </div>
    );
  }

  // MANUAL SELECT
  if (view === 'manualSelect') {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setView(recommendation ? 'recommendation' : 'intro')} className="bg-slate-800 rounded-full p-2">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold">Choose Your Class</h2>
        </div>

        <div className="space-y-3 flex-1">
          {Object.entries(DIFFICULTY).map(([key, d]) => {
            const DIcon = d.icon;
            const isRecommended = recommendation && recommendation.winner === key;
            return (
              <button key={key} onClick={() => startGame(key)} className={`w-full bg-gradient-to-br ${d.color} rounded-2xl p-5 text-left shadow-xl hover:scale-[1.02] transition-transform relative overflow-hidden`}>
                {isRecommended && (
                  <div className="absolute top-2 right-2 bg-black/40 rounded-full px-2 py-0.5 text-xs font-bold">
                    Recommended
                  </div>
                )}
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-black/30 rounded-xl p-2">
                    <DIcon size={24} />
                  </div>
                  <div>
                    <div className="text-xl font-black">{d.name}</div>
                    <div className="text-xs opacity-80">{d.subtitle}</div>
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

  // BODY STATS
  if (view === 'bodyStats') {
    const preview = calculateMacros(bodyStats, difficulty);
    const canSubmit = bodyStats.weight && bodyStats.height && bodyStats.age;
    const isMetric = bodyStats.unit === 'metric';

    return (
      <div className="min-h-screen bg-slate-900 text-white p-4 flex flex-col pb-24">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setView(editingBody ? 'nutrition' : 'manualSelect')} className="bg-slate-800 rounded-full p-2">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold">{editingBody ? 'Update Body Stats' : 'Tell us about you'}</h2>
        </div>

        <p className="text-sm text-slate-400 mb-4">
          We'll calculate your personalized calorie and protein targets.
        </p>

        <div className="bg-slate-800 rounded-full p-1 flex mb-4 w-fit">
          <button onClick={() => setBodyStats({ ...bodyStats, unit: 'imperial' })} className={`px-4 py-1.5 rounded-full text-sm font-bold ${!isMetric ? 'bg-yellow-500 text-black' : 'text-slate-400'}`}>
            lbs / in
          </button>
          <button onClick={() => setBodyStats({ ...bodyStats, unit: 'metric' })} className={`px-4 py-1.5 rounded-full text-sm font-bold ${isMetric ? 'bg-yellow-500 text-black' : 'text-slate-400'}`}>
            kg / cm
          </button>
        </div>

        <div className="mb-3">
          <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Sex (for BMR formula)</label>
          <div className="grid grid-cols-2 gap-2">
            {['male', 'female'].map(s => (
              <button key={s} onClick={() => setBodyStats({ ...bodyStats, sex: s })} className={`py-3 rounded-xl font-bold capitalize ${bodyStats.sex === s ? 'bg-yellow-500 text-black' : 'bg-slate-800 text-slate-300'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div>
            <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Age</label>
            <input type="number" inputMode="numeric" value={bodyStats.age}
              onChange={(e) => setBodyStats({ ...bodyStats, age: e.target.value })}
              placeholder="20"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-3 text-white text-lg focus:border-yellow-500 outline-none" />
          </div>
          {isMetric ? (
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Height (cm)</label>
              <input type="number" inputMode="numeric" value={bodyStats.height}
                onChange={(e) => setBodyStats({ ...bodyStats, height: e.target.value })}
                placeholder="178"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-3 text-white text-lg focus:border-yellow-500 outline-none" />
            </div>
          ) : (
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Height</label>
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
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-3 text-white text-lg focus:border-yellow-500 outline-none text-center" />
                  <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 pointer-events-none">ft</span>
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
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-3 text-white text-lg focus:border-yellow-500 outline-none text-center" />
                  <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 pointer-events-none">in</span>
                </div>
              </div>
            </div>
          )}
          <div>
            <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Weight ({isMetric ? 'kg' : 'lbs'})</label>
            <input type="number" inputMode="numeric" value={bodyStats.weight}
              onChange={(e) => setBodyStats({ ...bodyStats, weight: e.target.value })}
              placeholder={isMetric ? "75" : "165"}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-3 text-white text-lg focus:border-yellow-500 outline-none" />
          </div>
        </div>

        {!isMetric && (
          <div className="text-xs text-slate-500 mb-3">
            Example: 5 ft, 10 in for someone who is 5'10"
          </div>
        )}

        <div className="mb-4">
          <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Primary Goal</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(GOAL_LABELS).map(([key, label]) => (
              <button key={key} onClick={() => setBodyStats({ ...bodyStats, goal: key })} className={`py-3 px-2 rounded-xl font-semibold text-sm ${bodyStats.goal === key ? 'bg-yellow-500 text-black' : 'bg-slate-800 text-slate-300'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {preview && (
          <div className="bg-gradient-to-br from-green-600/30 to-emerald-600/30 border border-green-500/30 rounded-2xl p-4 mb-4">
            <div className="text-xs uppercase tracking-wider text-green-300 mb-2 font-bold">Your Targets</div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <div className="text-xs text-slate-300">Daily Calories</div>
                <div className="text-2xl font-black text-green-300">{preview.calorieTarget}</div>
              </div>
              <div>
                <div className="text-xs text-slate-300">Daily Protein</div>
                <div className="text-2xl font-black text-pink-300">{preview.proteinTarget}g</div>
              </div>
            </div>
            <div className="text-xs text-slate-400">
              BMR: {preview.bmr} cal. TDEE: {preview.tdee} cal. Goal: {GOAL_LABELS[bodyStats.goal]}
            </div>
          </div>
        )}

        <div className="flex-1"></div>

        <button onClick={() => { if (editingBody) { setEditingBody(false); setView('nutrition'); } else { actuallyStartGame(difficulty); } }}
          disabled={!canSubmit}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-4 rounded-xl disabled:opacity-40 hover:brightness-110 mb-2">
          {editingBody ? 'SAVE CHANGES' : 'BEGIN QUEST'}
        </button>

        {!editingBody && (
          <button onClick={() => actuallyStartGame(difficulty)} className="w-full text-slate-500 text-sm py-2 hover:text-slate-300">
            Skip - use class defaults
          </button>
        )}
      </div>
    );
  }

  // BOSS VIEW
  if (view === 'boss') {
    const boss = currentBoss || pickBossForWeek(weekNumber);
    const bossHp = currentBoss?.currentHp ?? boss.hp;
    const hpPct = (bossHp / boss.hp) * 100;

    return (
      <div className="min-h-screen bg-slate-900 text-white p-4 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setView('home')} className="bg-slate-800 rounded-full p-2">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Skull size={20} className="text-red-400" />
            Weekly Boss
          </h2>
        </div>

        <div className="bg-gradient-to-br from-red-900 via-purple-900 to-slate-900 rounded-3xl p-8 mb-4 text-center border-2 border-red-500/50 shadow-2xl">
          <div className="text-6xl font-black mb-3 text-red-200">{boss.emoji}</div>
          <h1 className="text-3xl font-black text-red-100 mb-1">{boss.name}</h1>
          <div className="text-sm text-red-300 italic mb-4">{boss.flavor}</div>

          <div className="bg-black/60 rounded-2xl p-3 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <Heart size={16} className="text-red-400" fill="currentColor" />
              <span className="text-xs font-bold text-red-300 uppercase tracking-wider">Boss HP</span>
              <span className="ml-auto font-black">{bossHp} / {boss.hp}</span>
            </div>
            <div className="h-4 bg-slate-900 rounded-full overflow-hidden border border-red-500/30">
              <div className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500" style={{ width: `${hpPct}%` }}></div>
            </div>
          </div>

          <div className="bg-yellow-500/20 rounded-xl p-2 text-sm">
            <Trophy size={14} className="inline mr-1 text-yellow-400" />
            Reward: <span className="font-bold text-yellow-300">+{boss.reward} XP</span>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 mb-4">
          <div className="text-xs uppercase tracking-wider text-slate-400 mb-3 font-bold">How to Fight</div>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <Dumbbell size={16} className="text-orange-400 mt-0.5" />
              <div>
                <span className="font-bold">Complete workouts</span>
                <div className="text-xs text-slate-400">Deal damage equal to half your XP earned</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Apple size={16} className="text-green-400 mt-0.5" />
              <div>
                <span className="font-bold">Hit your protein goal</span>
                <div className="text-xs text-slate-400">Deal 80 damage per day you hit target</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">Boss Record</div>
            <div className="text-xs text-slate-500">Week {weekNumber + 1}</div>
          </div>
          <div className="flex items-center gap-3">
            <Trophy size={24} className="text-yellow-400" />
            <div>
              <div className="font-bold">{bossesDefeated} Bosses Defeated</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ACHIEVEMENTS VIEW
  if (view === 'achievements') {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-4 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setView('home')} className="bg-slate-800 rounded-full p-2">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Medal size={20} className="text-yellow-400" />
            Achievements
          </h2>
        </div>

        <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-2xl p-4 mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-yellow-300 font-bold uppercase tracking-wider">Progress</span>
            <span className="font-bold">{unlockedAchievements.length} / {ACHIEVEMENTS.length}</span>
          </div>
          <div className="h-3 bg-black/40 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
              style={{ width: `${(unlockedAchievements.length / ACHIEVEMENTS.length) * 100}%` }}></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {ACHIEVEMENTS.map(ach => {
            const unlocked = unlockedAchievements.includes(ach.id);
            return (
              <div key={ach.id} className={`rounded-xl p-3 border ${unlocked ? 'bg-gradient-to-br from-yellow-600/30 to-orange-600/30 border-yellow-500/50' : 'bg-slate-800 border-slate-700 opacity-50'}`}>
                <div className="text-xl mb-1">{unlocked ? <Trophy size={20} className="text-yellow-400" /> : <Shield size={20} className="text-slate-500" />}</div>
                <div className="font-bold text-sm">{ach.name}</div>
                <div className="text-xs text-slate-400 mb-1">{ach.desc}</div>
                <div className="text-xs text-yellow-400 font-bold">+{ach.xp} XP</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // STATS VIEW
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
      <div className="min-h-screen bg-slate-900 text-white p-4 pb-24">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setView('home')} className="bg-slate-800 rounded-full p-2">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BarChart3 size={20} className="text-cyan-400" />
            Stats
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-slate-800 rounded-xl p-3 border border-slate-700">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Workouts</div>
            <div className="text-2xl font-black text-cyan-400">{playerData.totalWorkouts}</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-3 border border-slate-700">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Current Streak</div>
            <div className="text-2xl font-black text-orange-400 flex items-center gap-1">
              {playerData.streak} <Flame size={18} />
            </div>
          </div>
          <div className="bg-slate-800 rounded-xl p-3 border border-slate-700">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Best Streak</div>
            <div className="text-2xl font-black text-yellow-400">{playerData.bestStreak || 0}</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-3 border border-slate-700">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Knockouts</div>
            <div className="text-2xl font-black text-red-400">{playerData.knockouts || 0}</div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4 mb-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={16} className="text-yellow-400" />
            <h3 className="font-bold text-sm">Last 7 Days XP</h3>
            <div className="flex-1 text-right text-xs text-slate-400">
              Total: {weeklyXP.reduce((a, b) => a + b, 0)} XP
            </div>
          </div>
          <div className="flex items-end gap-2 h-32">
            {weeklyXP.map((xp, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs text-slate-400 font-mono">{xp > 0 ? xp : ''}</div>
                <div className="flex-1 w-full flex items-end">
                  <div className={`w-full rounded-t transition-all ${xp > 0 ? 'bg-gradient-to-t from-yellow-500 to-orange-400' : 'bg-slate-700'}`}
                    style={{ height: `${Math.max(4, (xp / maxDayXP) * 100)}%` }}></div>
                </div>
                <div className="text-xs text-slate-500">{dayLabels[i]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4 mb-4 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Scale size={16} className="text-cyan-400" />
              <h3 className="font-bold text-sm">Weight Trend</h3>
            </div>
            {weightData.length >= 2 && (
              <div className={`text-xs font-bold flex items-center gap-1 ${weightChange > 0 ? 'text-orange-400' : weightChange < 0 ? 'text-green-400' : 'text-slate-400'}`}>
                {weightChange > 0 ? <TrendingUp size={14} /> : weightChange < 0 ? <TrendingDown size={14} /> : null}
                {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} {weightData[0].unit === 'metric' ? 'kg' : 'lbs'}
              </div>
            )}
          </div>

          {weightData.length === 0 ? (
            <div className="text-center text-slate-500 text-sm py-6">
              No weigh-ins yet. Log one below.
            </div>
          ) : weightData.length === 1 ? (
            <div className="text-center py-4">
              <div className="text-3xl font-black text-cyan-300">{weightData[0].weight}</div>
              <div className="text-xs text-slate-400">
                {weightData[0].unit === 'metric' ? 'kg' : 'lbs'}
              </div>
            </div>
          ) : (
            <div className="relative h-32 mb-2">
              <svg className="w-full h-full" viewBox={`0 0 ${weightData.length * 40} 100`} preserveAspectRatio="none">
                <polyline fill="none" stroke="#22d3ee" strokeWidth="2"
                  points={weightData.map((w, i) => `${i * 40 + 20},${100 - ((w.weight - minW) / wRange) * 80 - 10}`).join(' ')} />
                {weightData.map((w, i) => (
                  <circle key={i} cx={i * 40 + 20} cy={100 - ((w.weight - minW) / wRange) * 80 - 10} r="3" fill="#22d3ee" />
                ))}
              </svg>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>{weightData[0].weight}</span>
                <span>{latestWeight}</span>
              </div>
            </div>
          )}

          <div className="bg-slate-900 rounded-xl p-3 mt-3">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">Log Weigh-in</div>
            <div className="flex gap-2 mb-2">
              <input type="number" step="0.1" placeholder={`Weight (${bodyStats.unit === 'metric' ? 'kg' : 'lbs'})`}
                value={newWeight} onChange={(e) => setNewWeight(e.target.value)}
                className="flex-1 bg-slate-800 rounded-lg px-3 py-2 text-sm" />
              <input type="number" step="0.1" placeholder="BF% (opt)"
                value={newBodyFat} onChange={(e) => setNewBodyFat(e.target.value)}
                className="w-24 bg-slate-800 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="flex gap-2 mb-2 items-center">
              <input type="number" step="0.1" placeholder={`Goal weight (optional)`}
                value={goalWeight} onChange={(e) => setGoalWeight(e.target.value)}
                className="flex-1 bg-slate-800 rounded-lg px-3 py-2 text-sm" />
            </div>
            <button onClick={logWeight} disabled={!newWeight}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-2 rounded-lg disabled:opacity-40 text-sm">
              LOG WEIGH-IN (+25 XP)
            </button>
          </div>
        </div>

        {weightData.length > 0 && (
          <div className="bg-slate-800 rounded-2xl p-3 mb-4 border border-slate-700">
            <div className="text-xs uppercase tracking-wider text-slate-400 mb-2 font-bold">History</div>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {[...weightData].reverse().map(w => (
                <div key={w.date} className="bg-slate-900 rounded-lg p-2 flex items-center justify-between text-sm">
                  <div>
                    <span className="font-bold">{w.weight} {w.unit === 'metric' ? 'kg' : 'lbs'}</span>
                    {w.bodyFat && <span className="text-slate-400 ml-2">{w.bodyFat}% BF</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">
                      {new Date(w.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                    </span>
                    <button onClick={() => removeWeightEntry(w.date)} className="text-red-400">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {byTypeSorted.length > 0 && (
          <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
            <div className="flex items-center gap-2 mb-3">
              <Dumbbell size={16} className="text-purple-400" />
              <h3 className="font-bold text-sm">Workouts by Type</h3>
            </div>
            <div className="space-y-2">
              {byTypeSorted.map(([type, count]) => (
                <div key={type}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold">{type}</span>
                    <span className="text-slate-400">{count}x</span>
                  </div>
                  <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
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

  // NUTRITION VIEW
  if (view === 'nutrition') {
    const targets = getNutritionTargets();
    const totals = getTodayTotals();
    const calPct = Math.min(100, (totals.cal / targets.calorieTarget) * 100);
    const proteinPct = Math.min(100, (totals.protein / targets.proteinTarget) * 100);
    const meals = getTodayMeals();
    const filteredFoods = FOOD_DATABASE.filter(f => f.name.toLowerCase().includes(foodSearch.toLowerCase()));

    return (
      <div className="min-h-screen bg-slate-900 text-white p-4 pb-24">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setView('home')} className="bg-slate-800 rounded-full p-2">
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Apple size={20} className="text-green-400" />
              Nutrition
            </h2>
          </div>
          <button onClick={() => { setEditingBody(true); setView('bodyStats'); }}
            className="text-xs text-slate-400 hover:text-yellow-400 bg-slate-800 rounded-full px-3 py-1">
            Body stats
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-600/30 to-emerald-600/30 border border-green-500/30 rounded-2xl p-4 mb-4">
          <div className="text-xs uppercase tracking-wider text-green-300 mb-3 font-bold">Today's Totals</div>

          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold">Calories</span>
              <span><b>{totals.cal}</b> / {targets.calorieTarget}</span>
            </div>
            <div className="h-3 bg-black/40 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all"
                style={{ width: `${calPct}%` }}></div>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold">Protein</span>
              <span><b>{totals.protein}g</b> / {targets.proteinTarget}g</span>
            </div>
            <div className="h-3 bg-black/40 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-400 to-pink-500 rounded-full transition-all"
                style={{ width: `${proteinPct}%` }}></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-black/20 rounded-lg p-2">
              <div className="text-xs text-slate-300">Carbs</div>
              <div className="font-bold">{totals.carbs}g</div>
            </div>
            <div className="bg-black/20 rounded-lg p-2">
              <div className="text-xs text-slate-300">Fat</div>
              <div className="font-bold">{totals.fat}g</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <button onClick={() => fileInputRef.current?.click()} disabled={photoAnalyzing}
            className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-4 text-left disabled:opacity-60">
            {photoAnalyzing ? <Loader className="animate-spin mb-1" size={20} /> : <Camera size={20} className="mb-1" />}
            <div className="font-bold text-sm">{photoAnalyzing ? "Analyzing..." : "Scan Photo"}</div>
            <div className="text-xs opacity-80">AI estimate</div>
          </button>
          <button onClick={() => setShowCustomFood(!showCustomFood)}
            className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-left">
            <Plus size={20} className="mb-1 text-yellow-400" />
            <div className="font-bold text-sm">Custom Entry</div>
            <div className="text-xs text-slate-400">Enter manually</div>
          </button>
        </div>

        <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" />

        {photoError && (
          <div className="bg-red-900/40 border border-red-500/50 rounded-xl p-3 mb-4 text-sm text-red-200 flex items-center justify-between">
            <span>{photoError}</span>
            <button onClick={() => setPhotoError(null)}><X size={14} /></button>
          </div>
        )}

        {showCustomFood && (
          <div className="bg-slate-800 border border-yellow-500/50 rounded-2xl p-4 mb-4">
            <div className="text-xs uppercase tracking-wider text-yellow-300 mb-2 font-bold">Add Custom Food</div>
            <input type="text" placeholder="Food name" value={customFood.name}
              onChange={(e) => setCustomFood({ ...customFood, name: e.target.value })}
              className="w-full bg-slate-900 rounded-lg px-3 py-2 mb-2 text-sm" />
            <div className="grid grid-cols-4 gap-2 mb-3">
              <input type="number" placeholder="Cal" value={customFood.cal}
                onChange={(e) => setCustomFood({ ...customFood, cal: e.target.value })}
                className="bg-slate-900 rounded-lg px-2 py-2 text-sm" />
              <input type="number" placeholder="P" value={customFood.protein}
                onChange={(e) => setCustomFood({ ...customFood, protein: e.target.value })}
                className="bg-slate-900 rounded-lg px-2 py-2 text-sm" />
              <input type="number" placeholder="C" value={customFood.carbs}
                onChange={(e) => setCustomFood({ ...customFood, carbs: e.target.value })}
                className="bg-slate-900 rounded-lg px-2 py-2 text-sm" />
              <input type="number" placeholder="F" value={customFood.fat}
                onChange={(e) => setCustomFood({ ...customFood, fat: e.target.value })}
                className="bg-slate-900 rounded-lg px-2 py-2 text-sm" />
            </div>
            <button onClick={addCustomFood} disabled={!customFood.name || !customFood.cal}
              className="w-full bg-yellow-500 text-black font-bold py-2 rounded-lg disabled:opacity-40">ADD</button>
          </div>
        )}

        <div className="bg-slate-800 rounded-2xl p-3 mb-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <Search size={16} className="text-slate-400" />
            <input type="text" placeholder="Quick add from library..."
              value={foodSearch} onChange={(e) => setFoodSearch(e.target.value)}
              className="bg-transparent flex-1 text-sm outline-none" />
          </div>
          <div className="max-h-56 overflow-y-auto space-y-1">
            {filteredFoods.slice(0, 15).map((food, idx) => (
              <button key={idx} onClick={() => addMeal(food)}
                className="w-full text-left bg-slate-900 hover:bg-slate-700 rounded-lg px-3 py-2 text-sm flex items-center justify-between">
                <div>
                  <div className="font-semibold">{food.name}</div>
                  <div className="text-xs text-slate-400">{food.cal} cal. {food.protein}g P</div>
                </div>
                <Plus size={14} className="text-green-400" />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-3 border border-slate-700">
          <div className="text-xs uppercase tracking-wider text-slate-400 mb-2 font-bold">Today's Log ({meals.length})</div>
          {meals.length === 0 ? (
            <div className="text-center text-slate-500 text-sm py-6">No meals logged yet today</div>
          ) : (
            <div className="space-y-2">
              {meals.map(meal => (
                <div key={meal.id} className="bg-slate-900 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{meal.name}</div>
                    <div className="text-xs text-slate-400">
                      {meal.cal} cal. {meal.protein}g P. {meal.carbs}g C. {meal.fat}g F
                    </div>
                  </div>
                  <button onClick={() => removeMeal(meal.id)} className="text-red-400 p-1">
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

  // BUILDER VIEW
  if (view === 'builder') {
    const filteredLibrary = Object.entries(EXERCISE_LIBRARY).map(([group, exs]) => ({
      group,
      exs: exs.filter(e => e.toLowerCase().includes(librarySearch.toLowerCase()))
    })).filter(g => g.exs.length > 0);

    return (
      <div className="min-h-screen bg-slate-900 text-white p-4 pb-32">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setView('home')} className="bg-slate-800 rounded-full p-2">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold">Create Custom Workout</h2>
        </div>

        <input type="text" placeholder="Workout name"
          value={builderName} onChange={(e) => setBuilderName(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 mb-3 text-white" />

        <div className="mb-3">
          <div className="text-xs text-slate-400 mb-2 uppercase tracking-wider">Primary Stat</div>
          <div className="grid grid-cols-3 gap-2">
            {["STR", "END", "AGI"].map(s => (
              <button key={s} onClick={() => setBuilderStat(s)}
                className={`py-2 rounded-xl font-bold ${builderStat === s ? 'bg-yellow-500 text-black' : 'bg-slate-800 text-slate-300'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-xs text-slate-400 mb-2 uppercase tracking-wider">
            Exercises ({builderExercises.length})
          </div>
          <div className="space-y-2">
            {builderExercises.map((ex, idx) => (
              <div key={idx} className="bg-slate-800 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-sm flex-1">{ex.name}</div>
                  <button onClick={() => removeFromBuilder(idx)} className="text-red-400 p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex gap-2">
                  <input type="number" value={ex.sets}
                    onChange={(e) => updateBuilderExercise(idx, 'sets', parseInt(e.target.value) || 1)}
                    className="bg-slate-900 rounded-lg px-2 py-1 w-16 text-sm" />
                  <span className="text-slate-400 self-center text-xs">sets x</span>
                  <input type="text" value={ex.reps}
                    onChange={(e) => updateBuilderExercise(idx, 'reps', e.target.value)}
                    className="bg-slate-900 rounded-lg px-2 py-1 flex-1 text-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-3 border border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <Search size={16} className="text-slate-400" />
            <input type="text" placeholder="Search exercises..."
              value={librarySearch} onChange={(e) => setLibrarySearch(e.target.value)}
              className="bg-transparent flex-1 text-sm outline-none" />
          </div>
          <div className="max-h-80 overflow-y-auto space-y-3">
            {filteredLibrary.map(({ group, exs }) => (
              <div key={group}>
                <div className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-1">{group}</div>
                <div className="space-y-1">
                  {exs.map(name => (
                    <button key={name} onClick={() => addToBuilder(name)}
                      className="w-full text-left bg-slate-900 hover:bg-slate-700 rounded-lg px-3 py-2 text-sm flex items-center justify-between">
                      <span>{name}</span>
                      <Plus size={14} className="text-yellow-400" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-4">
          <div className="max-w-md mx-auto">
            <button onClick={saveCustomWorkout}
              disabled={!builderName.trim() || builderExercises.length === 0}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 rounded-xl disabled:opacity-40">
              SAVE WORKOUT
            </button>
          </div>
        </div>
      </div>
    );
  }

  // WORKOUT VIEW
  if (view === 'workout' && activeWorkout && workouts[activeWorkout]) {
    const workout = workouts[activeWorkout];
    const completedCount = Object.values(completedExercises).filter(Boolean).length;
    const filteredInWorkout = ALL_EXERCISES.filter(e => e.toLowerCase().includes(inWorkoutSearch.toLowerCase()));
    const mult = DIFFICULTY[difficulty].xpMultiplier;
    const projectedXp = Math.round((50 + completedCount * 15 + (playerData.streak >= 3 ? 25 : 0)) * mult);

    return (
      <div className="min-h-screen bg-slate-900 text-white p-4 pb-24">
        <div className={`bg-gradient-to-r ${workout.color} rounded-2xl p-5 mb-4 shadow-xl`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{workout.name}</h2>
              <p className="text-sm opacity-90">Stat: +{workout.stat}</p>
            </div>
            <button onClick={() => { setActiveWorkout(null); setView('home'); }} className="bg-black/30 rounded-full p-2">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          {activeExercises.map((ex, idx) => {
            const lastSession = exerciseHistory[ex.name]?.[exerciseHistory[ex.name].length - 1];
            const currentData = currentSetData[idx] || {};
            return (
              <div key={idx} className={`rounded-xl p-3 transition-all ${completedExercises[idx] ? 'bg-green-600/30 border-2 border-green-500' : 'bg-slate-800 border-2 border-slate-700'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <button onClick={() => toggleExercise(idx)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center ${completedExercises[idx] ? 'bg-green-500' : 'bg-slate-700'}`}>
                    {completedExercises[idx] ? <Check size={18} /> : <span className="text-slate-400">{idx + 1}</span>}
                  </button>
                  <div className="flex-1">
                    <div className="font-semibold">{ex.name}</div>
                    <div className="text-xs text-slate-400">Target: {ex.sets} x {ex.reps}</div>
                  </div>
                  <button onClick={() => removeExerciseFromActive(idx)} className="text-red-400 p-1">
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="flex gap-2 items-center">
                  <input type="number" step="2.5"
                    placeholder={lastSession ? `${lastSession.weight}` : "Weight"}
                    value={currentData.weight || ''}
                    onChange={(e) => setCurrentSetData({ ...currentSetData, [idx]: { ...currentData, weight: e.target.value } })}
                    className="bg-slate-900 rounded-lg px-2 py-1.5 w-20 text-sm" />
                  <span className="text-xs text-slate-500">lb x</span>
                  <input type="number"
                    placeholder={lastSession ? `${lastSession.reps}` : "Reps"}
                    value={currentData.reps || ''}
                    onChange={(e) => setCurrentSetData({ ...currentSetData, [idx]: { ...currentData, reps: e.target.value } })}
                    className="bg-slate-900 rounded-lg px-2 py-1.5 w-16 text-sm" />
                  {lastSession && (
                    <span className="text-xs text-cyan-400 ml-auto">
                      Last: {lastSession.weight}x{lastSession.reps}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!addingExerciseInWorkout ? (
          <button onClick={() => setAddingExerciseInWorkout(true)}
            className="w-full bg-slate-800 border-2 border-dashed border-slate-600 rounded-xl py-3 text-slate-400 flex items-center justify-center gap-2 mb-4">
            <Plus size={18} /> Add Exercise
          </button>
        ) : (
          <div className="bg-slate-800 rounded-xl p-3 mb-4 border border-yellow-500/50">
            <div className="flex items-center gap-2 mb-2">
              <Search size={16} className="text-slate-400" />
              <input type="text" placeholder="Search exercises..."
                value={inWorkoutSearch} onChange={(e) => setInWorkoutSearch(e.target.value)}
                className="bg-transparent flex-1 text-sm outline-none" autoFocus />
              <button onClick={() => { setAddingExerciseInWorkout(false); setInWorkoutSearch(""); }} className="text-slate-400">
                <X size={16} />
              </button>
            </div>
            <div className="max-h-48 overflow-y-auto space-y-1">
              {filteredInWorkout.slice(0, 20).map(name => (
                <button key={name} onClick={() => addExerciseDuringWorkout(name)}
                  className="w-full text-left bg-slate-900 hover:bg-slate-700 rounded-lg px-3 py-2 text-sm">
                  + {name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-4">
          <div className="max-w-md mx-auto">
            <div className="text-center text-sm text-slate-400 mb-2">
              {completedCount} / {activeExercises.length} completed
            </div>
            <button onClick={finishWorkout} disabled={completedCount === 0}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-4 rounded-xl disabled:opacity-40">
              <Swords className="inline mr-2" size={20} />
              FINISH (+{projectedXp} XP)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // HOME VIEW
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
    <div className="min-h-screen bg-slate-900 text-white p-4 pb-8">
      {showXpGain && (
        <div className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-2xl px-6 py-3 rounded-2xl shadow-2xl text-center">
            +{showXpGain.xp} XP
            {showXpGain.hp > 0 && <div className="text-sm text-green-800">+{showXpGain.hp} HP healed</div>}
            {showXpGain.goalHit && <div className="text-sm text-purple-800">GOAL HIT! +{showXpGain.bonus} bonus</div>}
            {!showXpGain.goalHit && showXpGain.bonus > 0 && <span className="text-sm block">Streak bonus!</span>}
          </div>
        </div>
      )}

      {showLevelUp && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowLevelUp(false)}>
          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-3xl p-8 text-center max-w-sm border-4 border-yellow-300 shadow-2xl">
            <Trophy size={64} className="mx-auto mb-3" />
            <div className="text-black/70 text-sm font-bold uppercase tracking-wider">Level Up!</div>
            <div className="text-5xl font-black text-white mb-2">LVL {playerData.level}</div>
            <div className="text-black font-bold mb-4">{title}</div>
            <button className="bg-black text-yellow-400 px-6 py-2 rounded-full font-bold" onClick={() => setShowLevelUp(false)}>
              CONTINUE
            </button>
          </div>
        </div>
      )}

      {showKnockout && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-red-600 to-red-900 rounded-3xl p-8 text-center max-w-sm border-4 border-red-400 shadow-2xl">
            <div className="text-red-200 text-sm font-bold uppercase tracking-wider">Knocked Out!</div>
            <div className="text-3xl font-black text-white mb-2">You passed out</div>
            <div className="text-red-100 text-sm mb-4">Your streak was reset. You've respawned at 50 HP.</div>
            <button className="bg-white text-red-600 px-6 py-2 rounded-full font-bold" onClick={() => setShowKnockout(false)}>
              GET BACK UP
            </button>
          </div>
        </div>
      )}

      {newAchievement && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setNewAchievement(null)}>
          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-3xl p-6 text-center max-w-sm border-4 border-yellow-300 shadow-2xl animate-bounce">
            <div className="text-xs text-black/70 font-bold uppercase tracking-wider">Achievement Unlocked!</div>
            <Trophy size={56} className="mx-auto my-3 text-white" />
            <div className="text-2xl font-black text-white mb-1">{newAchievement.name}</div>
            <div className="text-sm text-black mb-3">{newAchievement.desc}</div>
            <div className="bg-black/30 rounded-full px-3 py-1 inline-block text-sm font-bold text-white">
              +{newAchievement.xp} XP
            </div>
            <div className="mt-4">
              <button className="bg-black text-yellow-400 px-6 py-2 rounded-full font-bold" onClick={() => setNewAchievement(null)}>
                AWESOME
              </button>
            </div>
          </div>
        </div>
      )}

      {showBossDefeat && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setShowBossDefeat(null)}>
          <div className="bg-gradient-to-br from-purple-600 via-red-600 to-orange-600 rounded-3xl p-8 text-center max-w-sm border-4 border-yellow-300 shadow-2xl">
            <div className="text-sm text-white/80 font-bold uppercase tracking-wider">Boss Defeated!</div>
            <Skull size={72} className="mx-auto my-3 text-white" />
            <div className="text-2xl font-black text-white mb-1">{showBossDefeat.boss.name}</div>
            <div className="text-sm text-white/80 mb-3">has been vanquished</div>
            <div className="bg-black/40 rounded-xl px-4 py-3 mb-4">
              <div className="text-xs text-yellow-200 uppercase tracking-wider">Reward</div>
              <div className="text-3xl font-black text-yellow-300">+{showBossDefeat.reward} XP</div>
            </div>
            <button className="bg-white text-red-600 px-6 py-2 rounded-full font-bold" onClick={() => setShowBossDefeat(null)}>
              VICTORY
            </button>
          </div>
        </div>
      )}

      {daysAwayMessage && (
        <div className="bg-red-900/40 border border-red-500/50 rounded-2xl p-3 mb-3 flex items-center gap-3 animate-pulse">
          <div className="flex-1">
            <div className="text-sm font-bold text-red-200">Welcome back</div>
            <div className="text-xs text-red-300">
              You missed {daysAwayMessage.days} {daysAwayMessage.days === 1 ? 'day' : 'days'} - took {daysAwayMessage.damage} damage
            </div>
          </div>
          <button onClick={() => setDaysAwayMessage(null)} className="text-red-300">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${diffConfig.color} rounded-full px-3 py-1 shadow-lg`}>
          <DIcon size={14} />
          <span className="text-xs font-bold">{diffConfig.name}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={takeDamage}
            className="text-xs bg-red-900/40 text-red-300 px-2 py-1 rounded-full border border-red-500/30">
            Skip day (-20 HP)
          </button>
          <button onClick={resetGame} className="text-xs text-slate-500 hover:text-slate-300">
            Reset
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-5 mb-4 shadow-2xl relative overflow-hidden">
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs uppercase tracking-widest opacity-80">{title}</div>
              <div className="text-2xl font-black">{playerData.name}</div>
            </div>
            <div className="bg-black/30 rounded-2xl px-3 py-2 text-center">
              <div className="text-xs opacity-70">LVL</div>
              <div className="text-3xl font-black leading-none">{playerData.level}</div>
            </div>
          </div>

          <div className="mb-2">
            <div className="flex justify-between text-xs mb-1 opacity-90">
              <span className="flex items-center gap-1">
                <Heart size={12} className="text-red-300" fill="currentColor" />
                HP
              </span>
              <span className="font-bold">{playerData.hp} / {playerData.maxHp}</span>
            </div>
            <div className="h-3 bg-black/40 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-500 ${
                playerData.hp / playerData.maxHp > 0.6 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                playerData.hp / playerData.maxHp > 0.3 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                'bg-gradient-to-r from-red-500 to-red-700'
              }`}
              style={{ width: `${(playerData.hp / playerData.maxHp) * 100}%` }}></div>
            </div>
          </div>

          <div className="mb-2">
            <div className="flex justify-between text-xs mb-1 opacity-80">
              <span>XP</span>
              <span>{playerData.xp} / {xpNeeded}</span>
            </div>
            <div className="h-3 bg-black/40 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full transition-all duration-500"
                style={{ width: `${xpPercent}%` }}></div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <div className="bg-black/30 rounded-full px-3 py-1 flex items-center gap-1">
              <Flame size={14} className="text-orange-400" />
              <span className="text-sm font-bold">{playerData.streak} day</span>
            </div>
            <div className="bg-black/30 rounded-full px-3 py-1 flex items-center gap-1">
              <Dumbbell size={14} />
              <span className="text-sm font-bold">{playerData.totalWorkouts} total</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-slate-800 rounded-xl p-3 text-center border border-red-500/30">
          <Swords size={20} className="mx-auto text-red-400 mb-1" />
          <div className="text-xs text-slate-400">STR</div>
          <div className="text-2xl font-black text-red-400">{playerData.stats.STR}</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-3 text-center border border-green-500/30">
          <Heart size={20} className="mx-auto text-green-400 mb-1" />
          <div className="text-xs text-slate-400">END</div>
          <div className="text-2xl font-black text-green-400">{playerData.stats.END}</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-3 text-center border border-blue-500/30">
          <Zap size={20} className="mx-auto text-blue-400 mb-1" />
          <div className="text-xs text-slate-400">AGI</div>
          <div className="text-2xl font-black text-blue-400">{playerData.stats.AGI}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {(() => {
          const targets = getNutritionTargets();
          const totals = getTodayTotals();
          const calPct = Math.min(100, (totals.cal / targets.calorieTarget) * 100);
          return (
            <button onClick={() => setView('nutrition')}
              className="bg-gradient-to-br from-green-600/30 to-emerald-600/30 border border-green-500/30 rounded-2xl p-3 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Apple size={14} className="text-green-400" />
                <div className="font-bold text-xs">Nutrition</div>
              </div>
              <div className="text-xs text-slate-300 mb-1">
                <span className="font-bold text-white">{totals.cal}</span>/{targets.calorieTarget} cal
              </div>
              <div className="h-1 bg-black/40 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500" style={{ width: `${calPct}%` }}></div>
              </div>
            </button>
          );
        })()}

        <button onClick={() => setView('stats')}
          className="bg-gradient-to-br from-cyan-600/30 to-blue-600/30 border border-cyan-500/30 rounded-2xl p-3 text-left">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={14} className="text-cyan-400" />
            <div className="font-bold text-xs">Stats</div>
          </div>
          <div className="text-xs text-slate-300">
            <span className="font-bold text-white">{playerData.totalWorkouts}</span> workouts
          </div>
          <div className="text-xs text-slate-300">
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
            className="w-full bg-gradient-to-br from-red-900/50 to-purple-900/50 border-2 border-red-500/40 rounded-2xl p-3 mb-4 text-left">
            <div className="text-xs text-red-300 font-bold mb-1">WEEKLY BOSS</div>
            <div className="font-black text-lg">{boss.name}</div>
            <div className="text-xs text-red-200 italic mb-2">{boss.flavor}</div>
            <div className="flex items-center gap-2">
              <Heart size={12} className="text-red-400" fill="currentColor" />
              <div className="flex-1 h-2 bg-black/60 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-red-400 transition-all" style={{ width: `${hpPct}%` }}></div>
              </div>
              <span className="text-xs font-bold">{bossHp}/{boss.hp}</span>
            </div>
          </button>
        );
      })()}

      <button onClick={() => setView('achievements')}
        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 mb-4 flex items-center gap-3">
        <Medal size={18} className="text-yellow-400" />
        <div className="flex-1 text-left">
          <div className="font-bold text-sm">Achievements</div>
          <div className="text-xs text-slate-400">{unlockedAchievements.length} / {ACHIEVEMENTS.length} unlocked</div>
        </div>
      </button>

      <div className="bg-slate-800 rounded-2xl p-4 mb-4 border border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <Target size={18} className="text-yellow-400" />
          <h3 className="font-bold">Weekly Quests</h3>
        </div>
        <div className="space-y-2">
          {quests.map(quest => {
            const progress = questProgress(quest);
            const isComplete = progress >= quest.target;
            const isClaimed = playerData.questsCompleted.includes(quest.id);
            const QuestIcon = quest.icon;
            return (
              <div key={quest.id} className="bg-slate-900 rounded-xl p-3">
                <div className="flex items-center gap-3 mb-1">
                  <QuestIcon size={16} className="text-yellow-400" />
                  <div className="flex-1 text-sm font-semibold">{quest.name}</div>
                  <div className="text-xs text-yellow-400 font-bold">+{quest.xp} XP</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                      style={{ width: `${(progress / quest.target) * 100}%` }}></div>
                  </div>
                  <span className="text-xs text-slate-400">{progress}/{quest.target}</span>
                  {isComplete && !isClaimed && (
                    <button onClick={() => claimQuest(quest)} className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                      CLAIM
                    </button>
                  )}
                  {isClaimed && <Check size={16} className="text-green-400" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold flex items-center gap-2">
          <Dumbbell size={18} />
          Choose Today's Quest
        </h3>
        <button onClick={openBuilder}
          className="bg-yellow-500 text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
          <Plus size={14} /> Create
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {Object.entries(workouts).map(([key, w]) => (
          <div key={key} className="relative">
            <button onClick={() => startWorkout(key)}
              className={`bg-gradient-to-br ${w.color} rounded-2xl p-4 text-left shadow-lg hover:scale-105 transition-transform w-full`}>
              <div className="font-bold">{w.name}</div>
              <div className="text-xs opacity-90">+{w.stat} - {w.exercises.length} exercises</div>
            </button>
            {w.custom && (
              <button onClick={(e) => { e.stopPropagation(); deleteCustomWorkout(key); }}
                className="absolute top-2 right-2 bg-black/40 rounded-full p-1">
                <X size={12} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="text-center text-xs text-slate-500 mt-6">
        v2.0 - Clean rewrite - Ready to deploy
      </div>
    </div>
  );
}