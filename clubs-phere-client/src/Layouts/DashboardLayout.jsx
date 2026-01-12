import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Outlet, Link, useLocation } from 'react-router';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import SidebarLogo from '../Components/Logo/SidebarLogo';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardLayout = () => {
  const location = useLocation();
  
  const axiosSecure = useAxiosSecure();
  

  
  // State for chart data
  const [chartData, setChartData] = useState({
    clubDistribution: null,
    monthlyGrowth: null,
    eventAttendance: null,
    totalPaymentHeadline: null
  });
  
  // Fetch real chart data based on current route
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        let chartDataResult = {};
        
        if (location.pathname.includes('clubs-management')) {
          // Fetch club-specific data
          const clubsResponse = await axiosSecure.get('/clubs');
          const clubsData = clubsResponse.data;
          
          // Group clubs by category
          const categoryCounts = {};
          clubsData.forEach(club => {
            const category = club.category || 'Uncategorized';
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
          });
          
          const categories = Object.keys(categoryCounts);
          const counts = Object.values(categoryCounts);
          
          chartDataResult = {
            clubDistribution: {
              labels: categories,
              datasets: [{
                label: 'Clubs by Category',
                data: counts,
                backgroundColor: [
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(255, 205, 86, 0.8)',
                  'rgba(75, 192, 192, 0.8)',
                  'rgba(153, 102, 255, 0.8)',
                  'rgba(255, 159, 64, 0.8)',
                ],
                borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 205, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              }],
            },
            monthlyGrowth: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [{
                label: 'New Clubs',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // This would need to be calculated from creation dates
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                tension: 0.1,
              }],
            },
            eventAttendance: {
              labels: clubsData.slice(0, 5).map(club => club.clubName || 'Unknown Club'),
              datasets: [{
                label: 'Club Members',
                data: clubsData.slice(0, 5).map(club => club.memberCount || club.members?.length || 0),
                backgroundColor: 'rgba(153, 102, 255, 0.8)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
              }],
            }
          };
        } else if (location.pathname.includes('events-management')) {
          // Fetch event-specific data
          const eventsResponse = await axiosSecure.get('/events');
          const eventsData = eventsResponse.data;
          
          // Group events by status
          const statusCounts = {};
          eventsData.forEach(event => {
            const status = event.status || 'Unknown';
            statusCounts[status] = (statusCounts[status] || 0) + 1;
          });
          
          const statuses = Object.keys(statusCounts);
          const statusValues = Object.values(statusCounts);
          
          chartDataResult = {
            clubDistribution: {
              labels: statuses,
              datasets: [{
                label: 'Events by Status',
                data: statusValues,
                backgroundColor: [
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(255, 159, 64, 0.8)',
                  'rgba(75, 192, 192, 0.8)',
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(153, 102, 255, 0.8)',
                ],
                borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
              }],
            },
            monthlyGrowth: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [{
                label: 'Events Organized',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // This would need to be calculated from event dates
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                tension: 0.1,
              }],
            },
            eventAttendance: {
              labels: eventsData.slice(0, 5).map(event => event.title || 'Unknown Event'),
              datasets: [{
                label: 'Event Attendance',
                data: eventsData.slice(0, 5).map(event => event.attendeeCount || event.attendees?.length || 0),
                backgroundColor: 'rgba(255, 205, 86, 0.8)',
                borderColor: 'rgba(255, 205, 86, 1)',
                borderWidth: 1,
              }],
            }
          };
        } else if (location.pathname.includes('users-management')) {
          // Fetch user-specific data
          const usersResponse = await axiosSecure.get('/users');
          const usersData = usersResponse.data;
          
          // Group users by role
          const roleCounts = {};
          usersData.forEach(user => {
            const role = user.role || 'member';
            roleCounts[role] = (roleCounts[role] || 0) + 1;
          });
          
          const roles = Object.keys(roleCounts);
          const roleValues = Object.values(roleCounts);
          
          chartDataResult = {
            clubDistribution: {
              labels: roles,
              datasets: [{
                label: 'Users by Role',
                data: roleValues,
                backgroundColor: [
                  'rgba(153, 102, 255, 0.8)',
                  'rgba(255, 159, 64, 0.8)',
                  'rgba(75, 192, 192, 0.8)',
                  'rgba(255, 205, 86, 0.8)',
                  'rgba(255, 99, 132, 0.8)',
                ],
                borderColor: [
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 205, 86, 1)',
                  'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
              }],
            },
            monthlyGrowth: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [{
                label: 'New Users',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // This would need to be calculated from registration dates
                borderColor: 'rgb(153, 102, 255)',
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
                tension: 0.1,
              }],
            },
            eventAttendance: {
              labels: ['Active', 'Inactive', 'VIP', 'Premium', 'Basic'],
              datasets: [{
                label: 'User Categories',
                data: [usersData.filter(u => u.status === 'active').length, 
                       usersData.filter(u => u.status === 'inactive').length, 
                       usersData.filter(u => u.premium === true).length, 
                       usersData.filter(u => u.subscription === 'premium').length, 
                       usersData.length],
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              }],
            }
          };
        } else if (location.pathname.includes('payment-history')) {
          // Fetch payment-specific data
          const paymentsResponse = await axiosSecure.get('/payments');
          const paymentsData = paymentsResponse.data;
          
          // Group payments by type
          const typeCounts = {};
          paymentsData.forEach(payment => {
            const type = payment.type || payment.paymentType || 'Other';
            typeCounts[type] = (typeCounts[type] || 0) + 1;
          });
          
          const types = Object.keys(typeCounts);
          const typeValues = Object.values(typeCounts);
          
          chartDataResult = {
            clubDistribution: {
              labels: types,
              datasets: [{
                label: 'Revenue by Source',
                data: typeValues,
                backgroundColor: [
                  'rgba(75, 192, 192, 0.8)',
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(255, 205, 86, 0.8)',
                  'rgba(255, 159, 64, 0.8)',
                  'rgba(153, 102, 255, 0.8)',
                ],
                borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 205, 86, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
              }],
            },
            monthlyGrowth: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [{
                label: 'Revenue ($)',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // This would need to be calculated from actual payment amounts
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.1,
              }],
            },
            eventAttendance: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
              datasets: [{
                label: 'Transaction Volume',
                data: [0, 0, 0, 0, 0], // Placeholder
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              }],
            },
            totalPaymentHeadline: {
              total: paymentsData.reduce((sum, payment) => sum + (parseFloat(payment.amount) || 0), 0),
              change: '+12.5' // Placeholder
            }
          };
        } else {
          // Default overview data - fetch all data types
          const [clubsResponse, usersResponse, eventsResponse, paymentsResponse] = await Promise.allSettled([
            axiosSecure.get('/clubs'),
            axiosSecure.get('/users'),
            axiosSecure.get('/events'),
            axiosSecure.get('/payments')
          ]);
          
          const CLUBS_DATA = clubsResponse.status === 'fulfilled' ? clubsResponse.value.data : [];
          const USERS_DATA = usersResponse.status === 'fulfilled' ? usersResponse.value.data : [];
          const EVENTS_DATA = eventsResponse.status === 'fulfilled' ? eventsResponse.value.data : [];
          const PAYMENTS_DATA = paymentsResponse.status === 'fulfilled' ? paymentsResponse.value.data : [];
          
          // Use the data for charts
          const TOTAL_PAYMENTS = PAYMENTS_DATA.length; // This is used in payment history chart
          const TOTAL_USERS = USERS_DATA.length; // This could be used for user charts
          const TOTAL_EVENTS = EVENTS_DATA.length; // This could be used for event charts
          
          // Group clubs by category for overview
          const categoryCounts = {};
          CLUBS_DATA.forEach(club => {
            const category = club.category || 'Uncategorized';
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
          });
          
          const categories = Object.keys(categoryCounts);
          const counts = Object.values(categoryCounts);
          
          chartDataResult = {
            clubDistribution: {
              labels: categories,
              datasets: [{
                label: 'Clubs by Category',
                data: counts,
                backgroundColor: [
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(255, 205, 86, 0.8)',
                  'rgba(75, 192, 192, 0.8)',
                  'rgba(153, 102, 255, 0.8)',
                ],
                borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 205, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
              }],
            },
            monthlyGrowth: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [
                {
                  label: 'New Clubs',
                  data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Would need date-based calculation
                  borderColor: 'rgb(75, 192, 192)',
                  backgroundColor: 'rgba(75, 192, 192, 0.5)',
                  tension: 0.1,
                },
                {
                  label: 'New Members',
                  data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Would need date-based calculation
                  borderColor: 'rgb(54, 162, 235)',
                  backgroundColor: 'rgba(54, 162, 235, 0.5)',
                  tension: 0.1,
                },
              ],
            },
            eventAttendance: {
              labels: CLUBS_DATA.slice(0, 5).map(club => club.clubName || 'Unknown Club'),
              datasets: [{
                label: 'Event Attendance',
                data: CLUBS_DATA.slice(0, 5).map(club => club.memberCount || club.members?.length || 0),
                backgroundColor: 'rgba(153, 102, 255, 0.8)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
              }],
            }
          };
        }
        
        setChartData(chartDataResult);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        
        // Set default empty data in case of error
        setChartData({
          clubDistribution: null,
          monthlyGrowth: null,
          eventAttendance: null,
          totalPaymentHeadline: null
        });
      }
    };
    
    fetchChartData();
  }, [location.pathname, axiosSecure]);
  
  
  
  // Fetch real data for dashboard cards
  const [dashboardStats, setDashboardStats] = useState([
    { title: 'Total Clubs', value: '0', icon: 'school', color: 'bg-blue-500' },
    { title: 'Active Members', value: '0', icon: 'groups', color: 'bg-green-500' },
    { title: 'Events This Month', value: '0', icon: 'event', color: 'bg-purple-500' },
    { title: 'Pending Approvals', value: '0', icon: 'pending_actions', color: 'bg-yellow-500' },
  ]);
  
  const fetchDashboardStats = async () => {
    try {
      // Fetch real stats from the actual API endpoints
      const [clubsRes, usersRes, eventsRes, paymentsRes] = await Promise.allSettled([
        axiosSecure.get('/clubs'),
        axiosSecure.get('/users'),
        axiosSecure.get('/events'),
        axiosSecure.get('/payments')
      ]);
      
      const clubsData = clubsRes.status === 'fulfilled' ? clubsRes.value.data : [];
      const usersData = usersRes.status === 'fulfilled' ? usersRes.value.data : [];
      const eventsData = eventsRes.status === 'fulfilled' ? eventsRes.value.data : [];
      const paymentsData = paymentsRes.status === 'fulfilled' ? paymentsRes.value.data : [];
      
      const data = {
        totalClubs: clubsData.length,
        activeMembers: usersData.length, // Approximation
        eventsThisMonth: eventsData.length, // This would need filtering by current month
        pendingApprovals: clubsData.filter(club => {
          const status = (club.status || '').toLowerCase().trim();
          return status === 'pending' || status === 'approval_pending' || status === 'awaiting_approval';
        }).length,
        totalPayments: paymentsData.length
      };
      setDashboardStats([
        { title: 'Total Clubs', value: data.totalClubs?.toString() || '0', icon: 'school', color: 'bg-blue-500' },
        { title: 'Active Members', value: data.activeMembers?.toLocaleString() || '0', icon: 'groups', color: 'bg-green-500' },
        { title: 'Events This Month', value: data.eventsThisMonth?.toString() || '0', icon: 'event', color: 'bg-purple-500' },
        { title: 'Pending Approvals', value: data.pendingApprovals?.toString() || '0', icon: 'pending_actions', color: 'bg-yellow-500' },
      ]);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Set default values in case of error
      setDashboardStats([
        { title: 'Total Clubs', value: '0', icon: 'school', color: 'bg-blue-500' },
        { title: 'Active Members', value: '0', icon: 'groups', color: 'bg-green-500' },
        { title: 'Events This Month', value: '0', icon: 'event', color: 'bg-purple-500' },
        { title: 'Pending Approvals', value: '0', icon: 'pending_actions', color: 'bg-yellow-500' },
      ]);
    }
  };
  
  // State for chart options
  const [chartOptions, setChartOptions] = useState({
    pie: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#333333',
          }
        },
        title: {
          display: true,
          color: '#333333',
          text: '',
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#333333',
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
          border: {
            color: 'rgba(0, 0, 0, 0.1)',
          }
        },
        y: {
          ticks: {
            color: '#333333',
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
          border: {
            color: 'rgba(0, 0, 0, 0.1)',
          }
        }
      }
    },
    line: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#333333',
          }
        },
        title: {
          display: true,
          color: '#333333',
          text: '',
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#333333',
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
          border: {
            color: 'rgba(0, 0, 0, 0.1)',
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: '#333333',
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
          border: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    bar: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#333333',
          }
        },
        title: {
          display: true,
          color: '#333333',
          text: '',
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#333333',
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
          border: {
            color: 'rgba(0, 0, 0, 0.1)',
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: '#333333',
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
          border: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
        },
      },
    }
  });
  
  useEffect(() => {
    let isMounted = true;
    
    // Function to update chart options based on theme and location
    const updateChartOptionsBasedOnTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark') || 
                        document.documentElement.getAttribute('data-theme') === 'dark' ||
                        window.matchMedia('(prefers-color-scheme: dark)').matches;
      const textColor = isDarkMode ? '#ffffff' : '#333333';
      
      // Define titles based on location
      const pieTitle = location.pathname.includes('clubs-management') ? 'Clubs by Category' :
               location.pathname.includes('events-management') ? 'Events by Status' :
               location.pathname.includes('users-management') ? 'Users by Role' :
               location.pathname.includes('payment-history') ? 'Revenue by Source' : 'Club Distribution by Category';
      
      const lineTitle = location.pathname.includes('clubs-management') ? 'Monthly Club Growth' :
                location.pathname.includes('events-management') ? 'Events Organized Over Time' :
                location.pathname.includes('users-management') ? 'User Registration Trend' :
                location.pathname.includes('payment-history') ? 'Revenue Trend' : 'Monthly Growth (Clubs & Members)';
      
      const barTitle = location.pathname.includes('clubs-management') ? 'Club Members Count' :
                location.pathname.includes('events-management') ? 'Event Attendance' :
                location.pathname.includes('users-management') ? 'User Categories' :
                location.pathname.includes('payment-history') ? 'Transaction Volume' : 'Event Attendance by Club';
      
      // Update the chart options with the appropriate text color
      setChartOptions(prevOptions => ({
        ...prevOptions,
        pie: {
          ...prevOptions.pie,
          plugins: {
            ...prevOptions.pie.plugins,
            legend: {
              ...prevOptions.pie.plugins.legend,
              labels: {
                ...prevOptions.pie.plugins.legend.labels,
                color: textColor,
              }
            },
            title: {
              ...prevOptions.pie.plugins.title,
              color: textColor,
              text: pieTitle,
            },
          },
          scales: {
            ...prevOptions.pie.scales,
            x: {
              ...prevOptions.pie.scales.x,
              ticks: {
                ...prevOptions.pie.scales.x.ticks,
                color: textColor,
              },
              grid: {
                color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              },
              border: {
                color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              }
            },
            y: {
              ...prevOptions.pie.scales.y,
              ticks: {
                ...prevOptions.pie.scales.y.ticks,
                color: textColor,
              },
              grid: {
                color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              },
              border: {
                color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              }
            }
          }
        },
        line: {
          ...prevOptions.line,
          plugins: {
            ...prevOptions.line.plugins,
            legend: {
              ...prevOptions.line.plugins.legend,
              labels: {
                ...prevOptions.line.plugins.legend.labels,
                color: textColor,
              }
            },
            title: {
              ...prevOptions.line.plugins.title,
              color: textColor,
              text: lineTitle,
            },
          },
          scales: {
            ...prevOptions.line.scales,
            x: {
              ...prevOptions.line.scales.x,
              ticks: {
                ...prevOptions.line.scales.x.ticks,
                color: textColor,
              },
              grid: {
                color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              },
              border: {
                color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              }
            },
            y: {
              ...prevOptions.line.scales.y,
              ticks: {
                ...prevOptions.line.scales.y.ticks,
                color: textColor,
              },
              grid: {
                color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              },
              border: {
                color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              },
            },
          },
        },
        bar: {
          ...prevOptions.bar,
          plugins: {
            ...prevOptions.bar.plugins,
            legend: {
              ...prevOptions.bar.plugins.legend,
              labels: {
                ...prevOptions.bar.plugins.legend.labels,
                color: textColor,
              }
            },
            title: {
              ...prevOptions.bar.plugins.title,
              color: textColor,
              text: barTitle,
            },
          },
          scales: {
            ...prevOptions.bar.scales,
            x: {
              ...prevOptions.bar.scales.x,
              ticks: {
                ...prevOptions.bar.scales.x.ticks,
                color: textColor,
              },
              grid: {
                color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              },
              border: {
                color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              }
            },
            y: {
              ...prevOptions.bar.scales.y,
              ticks: {
                ...prevOptions.bar.scales.y.ticks,
                color: textColor,
              },
              grid: {
                color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              },
              border: {
                color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              },
            },
          },
        }
      }));
    };
    
    const fetchData = async () => {
      if (isMounted) {
        await fetchDashboardStats();
        // Update chart options based on initial theme
        updateChartOptionsBasedOnTheme();
      }
    };
    
    fetchData();
    
    // Set up interval to refresh data every 30 seconds when on dashboard routes
    const intervalId = setInterval(() => {
      if (isMounted && location.pathname.startsWith('/dashboard')) {
        fetchDashboardStats();
      }
    }, 30000); // Refresh every 30 seconds
    
    // Listen for theme changes
    const handleThemeChange = () => {
      if (isMounted) {
        updateChartOptionsBasedOnTheme();
      }
    };
    
    // Observe changes to the data-theme attribute
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    
    // Also listen for class changes
    const classObserver = new MutationObserver(handleThemeChange);
    classObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    // Initial theme setup
    handleThemeChange();
    
    return () => {
      isMounted = false;
      clearInterval(intervalId);
      observer.disconnect();
      classObserver.disconnect();
    };
  }, [axiosSecure, location.pathname]);
  
  // Update chart options when location changes
  useEffect(() => {
    // Update chart titles when location changes
    const isDarkMode = document.documentElement.classList.contains('dark') || 
                      document.documentElement.getAttribute('data-theme') === 'dark' ||
                      window.matchMedia('(prefers-color-scheme: dark)').matches;
    const textColor = isDarkMode ? '#ffffff' : '#333333';
      
    const pieTitle = location.pathname.includes('clubs-management') ? 'Clubs by Category' :
             location.pathname.includes('events-management') ? 'Events by Status' :
             location.pathname.includes('users-management') ? 'Users by Role' :
             location.pathname.includes('payment-history') ? 'Revenue by Source' : 'Club Distribution by Category';
      
    const lineTitle = location.pathname.includes('clubs-management') ? 'Monthly Club Growth' :
              location.pathname.includes('events-management') ? 'Events Organized Over Time' :
              location.pathname.includes('users-management') ? 'User Registration Trend' :
              location.pathname.includes('payment-history') ? 'Revenue Trend' : 'Monthly Growth (Clubs & Members)';
      
    const barTitle = location.pathname.includes('clubs-management') ? 'Club Members Count' :
              location.pathname.includes('events-management') ? 'Event Attendance' :
              location.pathname.includes('users-management') ? 'User Categories' :
              location.pathname.includes('payment-history') ? 'Transaction Volume' : 'Event Attendance by Club';
      
    setChartOptions(prevOptions => ({
      ...prevOptions,
      pie: {
        ...prevOptions.pie,
        plugins: {
          ...prevOptions.pie.plugins,
          title: {
            ...prevOptions.pie.plugins.title,
            color: textColor,
            text: pieTitle,
          },
        },
      },
      line: {
        ...prevOptions.line,
        plugins: {
          ...prevOptions.line.plugins,
          title: {
            ...prevOptions.line.plugins.title,
            color: textColor,
            text: lineTitle,
          },
        },
      },
      bar: {
        ...prevOptions.bar,
        plugins: {
          ...prevOptions.bar.plugins,
          title: {
            ...prevOptions.bar.plugins.title,
            color: textColor,
            text: barTitle,
          },
        },
      },
    }));
  }, [location.pathname]);



  return (
    <div className="flex h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      {/* Sidebar */}
      <aside className="w-16 md:w-20 border-r border-slate-200 dark:border-slate-700 flex flex-col items-center py-6 bg-white dark:bg-slate-900 text-slate-900 dark:text-white sticky top-0 h-screen">
        <div className="mb-10">
          <SidebarLogo size="small" />
        </div>

        <nav className="flex flex-col gap-8 flex-1">
          <Link 
            className="group flex flex-col items-center gap-1 text-slate-500 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" 
            to="/dashboard"
          >
            <span className="material-icons-outlined text-[24px] block">home</span>
            <span className="text-[10px] font-medium">Overview</span>
          </Link>
          
          <Link 
            className="group flex flex-col items-center gap-1 text-slate-500 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" 
            to="/dashboard/clubs-management"
          >
            <span className="material-icons-outlined text-[24px] block">school</span>
            <span className="text-[10px] font-medium">Clubs</span>
          </Link>
          
          <Link 
            className="group flex flex-col items-center gap-1 text-slate-500 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" 
            to="/dashboard/events-management"
          >
            <span className="material-icons-outlined text-[24px] block">event</span>
            <span className="text-[10px] font-medium">Events</span>
          </Link>
          
          <Link 
            className="group flex flex-col items-center gap-1 text-slate-500 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" 
            to="/dashboard/users-management"
          >
            <span className="material-icons-outlined text-[24px] block">people</span>
            <span className="text-[10px] font-medium">Users</span>
          </Link>
          
          <Link 
            className="group flex flex-col items-center gap-1 text-slate-500 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" 
            to="/dashboard/payment-history"
          >
            <span className="material-icons-outlined text-[24px] block">payments</span>
            <span className="text-[10px] font-medium">Payments</span>
          </Link>
          
          <Link 
            className="group flex flex-col items-center gap-1 text-slate-500 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" 
            to="/profile"
          >
            <span className="material-icons-outlined text-[24px] block">person_outline</span>
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        </nav>

        <div className="flex flex-col gap-6 mt-auto">
          <button className="text-slate-500 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
            <span className="material-icons-outlined">cookie</span>
          </button>
          <button className="text-slate-500 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
            <span className="material-icons-outlined">notifications</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 md:px-12 py-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2 text-slate-800 dark:text-white">Welcome back, User!</h1>
          <p className="text-slate-600 dark:text-slate-300">Here's what's happening today</p>
        </header>

        {/* Stats Cards */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardStats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1 text-slate-800 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
                    <span className="material-icons-outlined block">{stat.icon}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="mb-6">
          <div className="mb-6">
            <nav className="flex gap-2 bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
              <Link 
                className={({isActive}) => isActive ? 'flex-1 text-center py-3 px-4 rounded-lg bg-white dark:bg-slate-600 shadow text-indigo-600 dark:text-indigo-300 font-medium' : 'flex-1 text-center py-3 px-4 rounded-lg text-slate-700 dark:text-slate-300 font-medium hover:text-slate-800 dark:hover:text-slate-100 transition-colors'} 
                to="/dashboard"
              >
                Overview
              </Link>
              <Link 
                className={({isActive}) => isActive ? 'flex-1 text-center py-3 px-4 rounded-lg bg-white dark:bg-slate-600 shadow text-indigo-600 dark:text-indigo-300 font-medium' : 'flex-1 text-center py-3 px-4 rounded-lg text-slate-700 dark:text-slate-300 font-medium hover:text-slate-800 dark:hover:text-slate-100 transition-colors'} 
                to="/dashboard/clubs-management"
              >
                Clubs
              </Link>
              <Link 
                className={({isActive}) => isActive ? 'flex-1 text-center py-3 px-4 rounded-lg bg-white dark:bg-slate-600 shadow text-indigo-600 dark:text-indigo-300 font-medium' : 'flex-1 text-center py-3 px-4 rounded-lg text-slate-700 dark:text-slate-300 font-medium hover:text-slate-800 dark:hover:text-slate-100 transition-colors'} 
                to="/dashboard/events-management"
              >
                Events
              </Link>
              <Link 
                className={({isActive}) => isActive ? 'flex-1 text-center py-3 px-4 rounded-lg bg-white dark:bg-slate-600 shadow text-indigo-600 dark:text-indigo-300 font-medium' : 'flex-1 text-center py-3 px-4 rounded-lg text-slate-700 dark:text-slate-300 font-medium hover:text-slate-800 dark:hover:text-slate-100 transition-colors'} 
                to="/dashboard/users-management"
              >
                Users
              </Link>
              <Link 
                className={({isActive}) => isActive ? 'flex-1 text-center py-3 px-4 rounded-lg bg-white dark:bg-slate-600 shadow text-indigo-600 dark:text-indigo-300 font-medium' : 'flex-1 text-center py-3 px-4 rounded-lg text-slate-700 dark:text-slate-300 font-medium hover:text-slate-800 dark:hover:text-slate-100 transition-colors'} 
                to="/dashboard/recent-activity"
              >
                Activity
              </Link>
              <Link 
                className={({isActive}) => isActive ? 'flex-1 text-center py-3 px-4 rounded-lg bg-white dark:bg-slate-600 shadow text-indigo-600 dark:text-indigo-300 font-medium' : 'flex-1 text-center py-3 px-4 rounded-lg text-slate-700 dark:text-slate-300 font-medium hover:text-slate-800 dark:hover:text-slate-100 transition-colors'} 
                to="/dashboard/payment-history"
              >
                Payments
              </Link>
            </nav>
          </div>
        </section>

        {/* Charts Section - Dynamic based on selected navigation */}
        <section className="mb-12">
          {location.pathname.includes('payment-history') ? (
            // For Payments, show total payment headline and bar chart
            <>
              {chartData.totalPaymentHeadline && (
                <div className="mb-8 p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl text-white shadow-lg">
                  <h2 className="text-2xl font-bold mb-2">Total Payments</h2>
                  <p className="text-4xl font-bold">${chartData.totalPaymentHeadline.total?.toLocaleString()}</p>
                  <p className="text-green-100 mt-2">{chartData.totalPaymentHeadline.change}% from last month</p>
                </div>
              )}
              {chartData.eventAttendance && (
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-sm">
                  <Bar data={chartData.eventAttendance} options={chartOptions.bar} />
                </div>
              )}
            </>
          ) : location.pathname.includes('users-management') ? (
            // For Users, show only the bar chart
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-sm">
              {chartData.eventAttendance && (
                <Bar data={chartData.eventAttendance} options={chartOptions.bar} />
              )}
            </div>
          ) : (
            // For Clubs and Events, show pie, line, and bar charts
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {chartData.clubDistribution && (
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-sm">
                    <Pie data={chartData.clubDistribution} options={chartOptions.pie} />
                  </div>
                )}
                
                {chartData.monthlyGrowth && (
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-sm">
                    <Line data={chartData.monthlyGrowth} options={chartOptions.line} />
                  </div>
                )}
              </div>
              
              {chartData.eventAttendance && (
                <div className="mt-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-sm">
                  <Bar data={chartData.eventAttendance} options={chartOptions.bar} />
                </div>
              )}
            </>
          )}
        </section>



        {/* Dynamic Content Area - Changes based on route but keeps dashboard layout */}
        <section className="mb-12">
          <div>
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
