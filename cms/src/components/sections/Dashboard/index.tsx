import React from 'react';
import { Typography, Grid, Card, CardContent, Box } from '@mui/material';
import { DashboardSectionProps } from '../../../utils/interfaces';
import { isDrawerClose } from '../../../utils/signals';
import { useSignals } from '@preact/signals-react/runtime';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../../../api/data';

const DashboardSection: React.FC<DashboardSectionProps> = ({ title }) => {
  useSignals();
  const location = useLocation();
  const draweIsClose = isDrawerClose.value;
  const currentSubRoute = location.pathname.split('/')[2];

  const fetchDashboardData = async () => {
    const response = await getData(currentSubRoute);
    return response;
  }

  const query = useQuery({ queryKey: ['data', currentSubRoute], queryFn: fetchDashboardData})

  return (
    <Box sx={{ paddingLeft: draweIsClose ? 13 : 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {query.data?.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardSection;