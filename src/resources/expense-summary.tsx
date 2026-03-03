import { Card, CardContent, Typography, Box } from "@mui/material";
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

export const ExpenseSummaryPage = () => {
  const [userId, setUserId] = useState<number>(1);
  const [period, setPeriod] = useState('daily');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);

  const { data: users } = useGetList('users', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'id', order: 'ASC' }
  });

  useEffect(() => {
    if (userId) {
      fetchSummary();
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
                    onChange={(e) => setStartDate(e.target.value)}
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
                    End Date
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
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Results
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
          )}
        </CardContent>
      </Card>
    </Box>
  );
};