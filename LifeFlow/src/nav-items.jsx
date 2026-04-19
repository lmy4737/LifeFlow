import { HomeIcon, CheckCircle, Dumbbell, BarChart3 } from "lucide-react";
import Index from "./pages/Index.jsx";
import TodoPage from "./pages/TodoPage.jsx";
import WorkoutPage from "./pages/WorkoutPage.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Todos",
    to: "/todos",
    icon: <CheckCircle className="h-4 w-4" />,
    page: <TodoPage />,
  },
  {
    title: "Workouts",
    to: "/workouts",
    icon: <Dumbbell className="h-4 w-4" />,
    page: <WorkoutPage />,
  },
];
