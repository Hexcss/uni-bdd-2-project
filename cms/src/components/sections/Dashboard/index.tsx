import React, { useState } from "react";
import { Typography, Grid, Card, CardContent, Box, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { DashboardSectionProps } from "../../../utils/interfaces";
import { useSignals } from "@preact/signals-react/runtime";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../../../api/data";
import { isDrawerClose } from "../../../utils/signals";
import CreationModal from "../../forms/creation";

const DashboardSection: React.FC<DashboardSectionProps> = ({ title }) => {
  const [modalOpen, setModalOpen] = useState(false);
  
  const location = useLocation();
  const currentSubRoute = location.pathname.split("/")[2];
  const navigate = useNavigate();

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    navigate(`/dashboard/${currentSubRoute}`);
  }

  useSignals();
  const drawerIsClose = isDrawerClose.value;
  

  const query = useQuery({
    queryKey: [currentSubRoute, currentSubRoute],
    queryFn: () => getData(currentSubRoute),
  });

  const handleCardClick = (id: string) => {
    navigate(`/dashboard/${currentSubRoute}?id=${id}`);
    handleModalOpen(); 
  };

  return (
    <Box sx={{ paddingLeft: drawerIsClose ? 13 : 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          {title}
        </Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={handleModalOpen} sx={{ marginBottom: 1 }}>
          <Typography component="p" gutterBottom sx={{ p: 0, m: 0, paddingTop: 0.5}}>
            Add
          </Typography>
        </Button>
      </Box>
      <CreationModal open={modalOpen} onClose={handleModalClose} subRoute={currentSubRoute} />
      <Grid container spacing={2}>
        {query.data?.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card 
              onClick={() => handleCardClick(item.id)} 
              sx={{ 
                cursor: 'pointer', 
                transition: '0.3s',
                '&:hover': {
                  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                  transform: 'scale(1.02)' 
                }
              }}>
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
