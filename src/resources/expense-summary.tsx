import { Card, CardContent, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useGetList, Title } from "react-admin";
import api from "../api";

interface Summary {
  date: string;
  period: string;
  totalAmount: number;
  expenseCount: number;
  periodStartDate: string;
  periodEndDate: string;
}

interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: { id: number; name: string };
  user: { id: number; username: string };
}

export const ExpenseSummaryPage = () => {
  const [userId, setUserId] = useState<number>(1);
  const [period, setPeriod] = useState('daily');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: users } = useGetList('users', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'id', order: 'ASC' }
  });

  // Auto-calculate end date when start date changes (for weekly)
  const handleStartDateChange = (newStartDate: string) => {
    setStartDate(newStartDate);
    
    // Calculate 1 week (7 days) from start date
    const start = new Date(newStartDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // +6 days = 7 days total (including start date)
    
    setEndDate(end.toISOString().split('T')[0]);
  };

  useEffect(() => {
    if (userId) {
      fetchSummary();
      fetchExpenses();
    }
  }, [userId, period, date, startDate, endDate]);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      let url: string;
      if (period === 'daily') {
        url = `/expenses/summary/daily/${userId}/${date}`;
      } else if (period === 'weekly') {
        url = `/expenses/summary/weekly/${userId}?startDate=${startDate}&endDate=${endDate}`;
      } else {
        url = `/expenses/summary/monthly/${userId}/${date}`;
      }
      
      const response = await api.get(url);
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenses = async () => {
    try {
      // Fetch all expenses and filter by user and date range
      const response = await api.get('/expenses');
      const allExpenses = response.data;
      
      let filtered = allExpenses.filter((exp: Expense) => exp.user.id === userId);
      
      if (period === 'daily') {
        filtered = filtered.filter((exp: Expense) => exp.date === date);
      } else if (period === 'weekly' && startDate && endDate) {
        filtered = filtered.filter((exp: Expense) => 
          exp.date >= startDate && exp.date <= endDate
        );
      } else if (period === 'monthly') {
        const monthPrefix = date.substring(0, 7); // Get YYYY-MM
        filtered = filtered.filter((exp: Expense) => exp.date.startsWith(monthPrefix));
      }
      
      setExpenses(filtered);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const selectedUser = users?.find((u: any) => u.id === userId);

  return (
    <Box sx={{ p: 2 }}>
      <Title title="Expense Summary" />
      
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            📊 Expense Summary Analytics
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 3, mt: 3, flexWrap: 'wrap', alignItems: 'center' }}>
            <Box sx={{ minWidth: 200 }}>
              <Typography variant="caption" display="block" gutterBottom>
                User
              </Typography>
              <select
                value={userId}
                onChange={(e) => setUserId(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '4px',
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  fontSize: '16px'
                }}
              >
                {users?.map((user: any) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </Box>

            <Box sx={{ minWidth: 150 }}>
              <Typography variant="caption" display="block" gutterBottom>
                Period
              </Typography>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '4px',
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  fontSize: '16px'
                }}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </Box>

            {period === 'daily' && (
              <Box sx={{ minWidth: 200 }}>
                <Typography variant="caption" display="block" gutterBottom>
                  Date
                </Typography>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '4px',
                    border: '1px solid rgba(0, 0, 0, 0.23)',
                    fontSize: '16px'
                  }}
                />
              </Box>
            )}

            {period === 'weekly' && (
              <>
                <Box sx={{ minWidth: 200 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Start Date
                  </Typography>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '4px',
                      border: '1px solid rgba(0, 0, 0, 0.23)',
                      fontSize: '16px'
                    }}
                  />
                </Box>
                <Box sx={{ minWidth: 200 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    End Date (Auto-populated)
                  </Typography>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '4px',
                      border: '1px solid rgba(0, 0, 0, 0.23)',
                      fontSize: '16px'
                    }}
                  />
                </Box>
              </>
            )}

            {period === 'monthly' && (
              <Box sx={{ minWidth: 200 }}>
                <Typography variant="caption" display="block" gutterBottom>
                  Month
                </Typography>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '4px',
                    border: '1px solid rgba(0, 0, 0, 0.23)',
                    fontSize: '16px'
                  }}
                />
              </Box>
            )}
          </Box>

          {loading && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography>Loading summary...</Typography>
            </Box>
          )}

          {summary && !loading && (
            <>
              <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Summary Results
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Card variant="outlined" sx={{ flex: '1 1 250px', minWidth: 250 }}>
                    <CardContent>
                      <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                        👤 User
                      </Typography>
                      <Typography variant="h5" fontWeight="medium">
                        {selectedUser?.username || 'Unknown'}
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card variant="outlined" sx={{ flex: '1 1 250px', minWidth: 250 }}>
                    <CardContent>
                      <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                        📅 Period
                      </Typography>
                      <Typography variant="h6">
                        {summary.periodStartDate}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        to {summary.periodEndDate}
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card variant="outlined" sx={{ flex: '1 1 250px', minWidth: 250 }}>
                    <CardContent>
                      <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                        📝 Total Expenses
                      </Typography>
                      <Typography variant="h4" fontWeight="medium">
                        {summary.expenseCount}
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card variant="outlined" sx={{ flex: '1 1 250px', minWidth: 250}}>
                    <CardContent>
                      <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                        💰 Total Amount
                      </Typography>
                      <Typography variant="h3" color="primary" fontWeight="bold">
                        ${summary.totalAmount.toFixed(2)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Box>

              {/* Expense List Table */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  📋 Expense Details ({expenses.length} items)
                </Typography>
                
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>ID</strong></TableCell>
                        <TableCell><strong>Description</strong></TableCell>
                        <TableCell align="right"><strong>Amount</strong></TableCell>
                        <TableCell><strong>Date</strong></TableCell>
                        <TableCell><strong>Category</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {expenses.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                            <Typography color="text.secondary">
                              No expenses found for this period
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        expenses.map((expense) => (
                          <TableRow key={expense.id} hover>
                            <TableCell>{expense.id}</TableCell>
                            <TableCell>{expense.description}</TableCell>
                            <TableCell align="right">
                              <Typography fontWeight="medium">
                                ${expense.amount.toFixed(2)}
                              </Typography>
                            </TableCell>
                            <TableCell>{expense.date}</TableCell>
                            <TableCell>
                              <Box
                                component="span"
                                sx={{
                                  px: 1.5,
                                  py: 0.5,
                                  borderRadius: 1,
                                  bgcolor: '#308aca',
                                  fontSize: '0.875rem'
                                }}
                              >
                                {expense.category.name}
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};