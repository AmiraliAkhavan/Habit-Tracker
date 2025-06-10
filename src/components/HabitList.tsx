import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle, Delete } from "@mui/icons-material";
import { toggleHabit } from "../store/habit-slice";
import { removeHabit } from "../store/habit-slice";

const HabitList: React.FC = () => {
  const { habits } = useSelector((state: RootState) => state.habits);

  const dispatch = useDispatch<AppDispatch>();

  const today = new Date().toISOString().split("T")[0];

  const handleDelete = (id: string) => {
    dispatch(removeHabit({ id }));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      {habits.length === 0 ? (
        <Typography>No habits added yet.</Typography>
      ) : (
        habits.map((habit) => (
          <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">{habit.name}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textTransform: "capitalize" }}
                >
                  {habit.frequency}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                >
                  <Button
                    variant="outlined"
                    color={
                      habit.completedDates.includes(today)
                        ? "success"
                        : "primary"
                    }
                    startIcon={<CheckCircle />}
                    onClick={() =>
                      dispatch(toggleHabit({ id: habit.id, date: today }))
                    }
                  >
                    {habit.completedDates.includes(today)
                      ? "Completed"
                      : "Mark Complete"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(habit.id)}
                  >
                    Delete Habit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default HabitList;
