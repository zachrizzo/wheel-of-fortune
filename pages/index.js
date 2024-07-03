import React, { useState } from 'react';
import Game from '../components/game';
import { Box, Button } from '@mui/material';
import axios from 'axios'; // Make sure to install axios: npm install axios

const Home = () => {
  const [showGame, setShowGame] = useState(false);
  const [words, setWords] = useState([]);

  const fetchWords = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/getWords', {
        timeout: 5000, // Adding a timeout of 5 seconds
      });
      console.log('Words:', response.data);
      setWords(response.data);
      setShowGame(true);
    } catch (error) {
      console.error('Error fetching words:', error);
      // Handle the error appropriately (e.g., show an error message to the user)
      alert('Failed to fetch words. Please check your network connection and try again.');
    }
  };

  return (
    <Box>
      {showGame ? (
        <Game
          showGame={showGame}
          setShowGame={setShowGame}
          words={words}
        />
      ) : (
        <Box>
          <Button
            onClick={fetchWords}
            variant="contained"
            color="primary"
            size="large"
            style={{ marginTop: '20px' }}
          >
            Start Game
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Home;
