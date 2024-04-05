import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Pagination,
  TextField,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DashboardSectionProps } from "../../../utils/interfaces";
import { useSignals } from "@preact/signals-react/runtime";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../../../api/data";
import { isDrawerClose } from "../../../utils/signals";
import { FormModal } from "../../";

const DashboardSection: React.FC<DashboardSectionProps> = ({ title }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);  
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const location = useLocation();
  const currentSubRoute = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const cardHeight = 88;
  const cardsPerRow = 3;
  const limit = 15;

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    navigate(`/dashboard/${currentSubRoute}`);
    setModalOpen(false);
  };

  useSignals();
  const drawerIsClose = isDrawerClose.value;

  const query = useQuery({
    queryKey: [currentSubRoute, "list", currentPage, searchTerm],
    queryFn: () => getData(currentSubRoute, currentPage, limit, searchTerm),
  });

  useEffect(() => {
    if (query.isSuccess) {
      setTotalPages(Math.ceil((query.data?.totalCount as number) / limit));
    }
  }, [query]);

  useEffect(() => {
    setSearchTerm("");
  }, [location])

  const handleCardClick = (id: string) => {
    navigate(`/dashboard/${currentSubRoute}?id=${id}`);
    handleModalOpen();
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const gridHeight = `${cardHeight * (limit / cardsPerRow)}px`;

  return (
    <Box sx={{ paddingLeft: drawerIsClose ? 13 : 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 2,
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          {title}
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: '350px', paddingBottom: 1 }}
        />
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleModalOpen}
          sx={{ marginBottom: 1 }}
        >
          <Typography
            component="p"
            gutterBottom
            sx={{ p: 0, m: 0, paddingTop: 0.5 }}
          >
            Add
          </Typography>
        </Button>
      </Box>
      <FormModal
        open={modalOpen}
        onClose={handleModalClose}
        subRoute={currentSubRoute}
      />
      {query.isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ minHeight: gridHeight }}>
          {query.data?.data?.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                onClick={() => handleCardClick(item.id)}
                sx={{
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default DashboardSection;
