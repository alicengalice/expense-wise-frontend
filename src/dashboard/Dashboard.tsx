import { Card, CardContent, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">ExpenseWise Overview</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Welcome! Use the menu to manage Users, Categories, and Expenses.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Dashboard;