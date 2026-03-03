import { Card, CardContent, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../api";

interface Summary {
  date: string;
  period: string;
  totalAmount: number;
  expenseCount: number;
  periodStartDate: string;
  periodEndDate: string;
}

const Dashboard = () => {
  const [userId] = useState(1);
  const [period, setPeriod] = useState('daily');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSummary();
  }, [period, date]);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const url = `/expenses/summary/${period}/${userId}/${date}`;
      const response = await api.get(url);
      setSummary(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Card style={{ marginBottom: 20 }}>
        <CardContent>
          <Typography variant="h5">ExpenseWise Dashboard</Typography>
          <Typography variant="body1" style={{ marginTop: 10 }}>
            Welcome! Use the menu to manage your expenses.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;