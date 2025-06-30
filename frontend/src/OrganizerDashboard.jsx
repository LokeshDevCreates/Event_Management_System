import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import EventIcon from "@mui/icons-material/Event";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const cardData = [
  {
    title: "Total Events",
    value: 12,
    icon: <EventIcon fontSize="large" color="primary" />,
    bg: "#E3F2FD",
  },
  {
    title: "Total Bookings",
    value: 45,
    icon: <BookOnlineIcon fontSize="large" color="success" />,
    bg: "#E8F5E9",
  },
  {
    title: "Revenue Generated",
    value: "₹ 10,000",
    icon: <TrendingUpIcon fontSize="large" color="warning" />,
    bg: "#FFF3E0",
  },
];

// Sample booking trend data
const lineData = [
  { month: "Jan", bookings: 10 },
  { month: "Feb", bookings: 25 },
  { month: "Mar", bookings: 30 },
  { month: "Apr", bookings: 18 },
  { month: "May", bookings: 40 },
  { month: "Jun", bookings: 22 },
];

// Sample category-wise bookings
const pieData = [
  { name: "Corporate", value: 20 },
  { name: "College", value: 15 },
  { name: "NGO", value: 5 },
  { name: "Individual", value: 5 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

export default function OrganizerDashboard() {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Organizer Dashboard
      </Typography>

      {/* Cards */}
      <Grid container spacing={3}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ backgroundColor: card.bg, boxShadow: 3 }}>
              <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="subtitle1" color="textSecondary">
                    {card.title}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {card.value}
                  </Typography>
                </Box>
                <Box>{card.icon}</Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ marginTop: 4 }}>
        {/* Line Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Bookings Over Time
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="bookings" stroke="#1976d2" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Bookings by Category
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
