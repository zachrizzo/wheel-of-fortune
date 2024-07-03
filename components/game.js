// components/Game.js

import React, { useState, useRef, useEffect } from 'react';
import { Container, Typography, TextField, Box, Button, Stack } from '@mui/material';
import confetti from 'canvas-confetti';

const puzzle = "HELLO WORLD";

const Game = () => {
    const [guesses, setGuesses] = useState(new Array(puzzle.length).fill(''));
    const [currentGuess, setCurrentGuess] = useState('');
    const [wholePhraseGuess, setWholePhraseGuess] = useState('');
    const [error, setError] = useState(false);
    const [solved, setSolved] = useState(false);
    const inputRef = useRef(null);
    const [moreConfetti, setMoreConfetti] = useState(false);

    useEffect(() => {
        if (solved) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }, [solved, moreConfetti]);

    const handleGuess = (e) => {
        e.preventDefault();
        const guess = currentGuess.toUpperCase();

        if (guess.length === 1 && /[A-Z]/.test(guess)) {
            // Single letter guess
            let found = false;
            const newGuesses = [...guesses];

            for (let i = 0; i < puzzle.length; i++) {
                if (puzzle[i] === guess && newGuesses[i] === '') {
                    newGuesses[i] = guess;
                    found = true;
                }
            }

            if (!found) {
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 500);
            }

            setGuesses(newGuesses);
            setCurrentGuess('');

            if (newGuesses.join('') === puzzle.replace(' ', '')) {
                setSolved(true);
            }
        } else {
            // Invalid input for single letter guess, clear and return
            setCurrentGuess('');
        }
    };

    const handleWholePhraseGuess = (e) => {
        e.preventDefault();
        const guess = wholePhraseGuess.toUpperCase();

        if (guess === puzzle) {
            setGuesses(puzzle.split(''));
            setSolved(true);
        } else {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 500);
        }
        setWholePhraseGuess('');
    };

    const displayPuzzle = () => {
        return puzzle.split('').map((char, index) => (
            <TextField
                key={index}
                value={guesses[index]}
                inputProps={{
                    maxLength: 1,
                    style: { textAlign: 'center' },
                    readOnly: true,
                }}
                sx={{
                    width: 60,
                    mx: 0.5,
                    my: 1,
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { border: 'none' },
                        '&:hover fieldset': { border: 'none' },
                        '&.Mui-focused fieldset': { border: 'none' },
                    },
                    '& .MuiInputBase-input': {
                        backgroundColor: char === ' '
                            ? 'transparent'
                            : (error && guesses[index] === '' ? 'red' : '#fff'),
                        borderRadius: 5,
                        border: char === ' ' ? 'none' : '2px solid #000',
                        transition: 'background-color 0.3s',
                    },
                }}
                disabled={char === ' '}
            />
        ));
    };

    return (
        <Container sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h3" gutterBottom>
                Wheel of Fortune
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {displayPuzzle()}
            </Box>
            {!solved && (
                <>
                    <Stack flexDirection='column' justifyContent={'center'} alignItems={'center'} display={'flex'} component="form" onSubmit={handleGuess} sx={{ mt: 4 }}>
                        <TextField
                            inputRef={inputRef}
                            value={currentGuess}
                            onChange={(e) => setCurrentGuess(e.target.value)}
                            inputProps={{
                                maxLength: 1,
                                style: { textAlign: 'center' },
                            }}
                            sx={{
                                width: 60,
                                mx: 0.5,
                                my: 1,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { border: 'none' },
                                    '&:hover fieldset': { border: 'none' },
                                    '&.Mui-focused fieldset': { border: 'none' },
                                },
                                '& .MuiInputBase-input': {
                                    backgroundColor: '#fff',
                                    borderRadius: 5,
                                    border: '2px solid #000',
                                    transition: 'background-color 0.3s',
                                },
                            }}
                        />
                        <Button type="submit" variant="contained" sx={{ ml: 2, width: 200, m: 4 }}>
                            Guess Letter
                        </Button>
                    </Stack>
                    <Stack flexDirection='column' justifyContent={'center'} alignItems={'center'} display={'flex'} component="form" onSubmit={handleWholePhraseGuess} sx={{ mt: 4 }}>
                        <TextField
                            value={wholePhraseGuess}
                            onChange={(e) => setWholePhraseGuess(e.target.value)}
                            placeholder="Guess the whole phrase"
                            sx={{
                                width: 300,
                                mx: 0.5,
                                my: 1,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { border: 'none' },
                                    '&:hover fieldset': { border: 'none' },
                                    '&.Mui-focused fieldset': { border: 'none' },
                                },
                                '& .MuiInputBase-input': {
                                    backgroundColor: '#fff',
                                    borderRadius: 5,
                                    border: '2px solid #000',
                                    transition: 'background-color 0.3s',
                                },
                            }}
                        />
                        <Button type="submit" variant="contained" sx={{ ml: 2, width: 200, m: 4 }}>
                            Guess Whole Phrase
                        </Button>
                    </Stack>
                </>
            )}
            {solved && (
                <>
                    <Typography variant="h4" sx={{ mt: 4, color: 'green' }}>
                        Congratulations! You solved the puzzle!
                    </Typography>
                    <Button onClick={() => { setMoreConfetti(!moreConfetti) }} variant="contained" sx={{ ml: 2, width: 300, m: 4 }}>
                        More confetti Bitch!
                    </Button>
                </>
            )}
        </Container>
    );
};

export default Game;
