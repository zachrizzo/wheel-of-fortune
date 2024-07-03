import React, { useState, useRef, useEffect } from 'react';
import { Container, Typography, TextField, Box, Button, Stack, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import confetti from 'canvas-confetti';
import { SafetyDividerRounded } from '@mui/icons-material';

const Game = ({ showGame, setShowGame, words }) => {
    const category = words[1];
    const puzzle = words[0].toUpperCase();
    const [guesses, setGuesses] = useState(new Array(puzzle.length).fill(''));
    const [solved, setSolved] = useState(false);
    const [currentGuess, setCurrentGuess] = useState('');
    const [wholePhraseGuess, setWholePhraseGuess] = useState('');
    const [error, setError] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const inputRef = useRef(null);
    const [moreConfetti, setMoreConfetti] = useState(false);
    const recognition = useRef(null);



    useEffect(() => {
        if (solved) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }, [solved, moreConfetti]);

    useEffect(() => {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition.current = new SpeechRecognition();
            recognition.current.continuous = false;
            recognition.current.lang = 'en-US';
            recognition.current.interimResults = false;
            recognition.current.maxAlternatives = 1;

            recognition.current.onresult = (event) => {
                const speechResult = event.results[0][0].transcript.toUpperCase().trim();
                console.log("Speech result:", speechResult);

                if (speechResult.length === 1 && /[A-Z]/.test(speechResult)) {
                    console.log("Single letter guess:", speechResult);
                    setCurrentGuess(speechResult);
                    handleGuess(speechResult);
                } else {
                    console.log("Whole phrase guess:", speechResult);
                    setWholePhraseGuess(speechResult);
                    handleWholePhraseGuess(speechResult);
                }
                setIsListening(false);
            };

            recognition.current.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                setIsListening(false);
            };

            return () => {
                if (recognition.current) {
                    recognition.current.stop();
                    recognition.current.onresult = null;
                    recognition.current.onerror = null;
                }
            };
        }
    }, []);

    const toggleListening = () => {
        if (isListening) {
            recognition.current.stop();
            setIsListening(false);
        } else {
            try {
                recognition.current.start();
                setIsListening(true);
            } catch (error) {
                if (error.name === 'InvalidStateError') {
                    console.log('Recognition is already running. Stopping and restarting.');
                    recognition.current.stop();
                    setTimeout(() => {
                        recognition.current.start();
                        setIsListening(true);
                    }, 10);
                } else {
                    console.error('Error starting speech recognition:', error);
                }
            }
        }
    };

    const handleGuess = (guess) => {
        guess = guess.toUpperCase();
        console.log("Handling guess:", guess);

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

            if (newGuesses.join('') === puzzle.replace(' ', '')) {
                setSolved(true);
            }
        } else {
            // Word guess
            const puzzleWords = puzzle.split(' ');
            if (puzzleWords.includes(guess)) {
                const newGuesses = [...guesses];
                let startIndex = 0;
                for (const word of puzzleWords) {
                    if (word === guess) {
                        for (let i = 0; i < word.length; i++) {
                            newGuesses[startIndex + i] = word[i];
                        }
                    }
                    startIndex += word.length + 1; // +1 for space
                }
                setGuesses(newGuesses);
                if (newGuesses.join('') === puzzle.replace(' ', '')) {
                    setSolved(true);
                }
            } else {
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 500);
            }
        }
        setCurrentGuess('');
    };

    const handleWholePhraseGuess = (guess) => {
        guess = guess.toUpperCase();
        console.log("Handling whole phrase guess:", guess);

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

    const handleLetterGuess = (guess) => {
        guess = guess.toUpperCase();
        console.log("Handling letter guess:", guess);

        if (guess.length === 1 && /[A-Z]/.test(guess)) {
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

            if (newGuesses.join('') === puzzle.replace(' ', '')) {
                setSolved(true);
            }
        }

    };

    const displayPuzzle = () => {
        const words = puzzle.split(' ');
        return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {words.map((word, wordIndex) => (
                    <Box key={wordIndex} sx={{ display: 'flex', m: 1 }}>
                        {word.split('').map((char, charIndex) => {
                            const index = puzzle.indexOf(word) + charIndex;
                            return (
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
                                            backgroundColor: error && guesses[index] === '' ? '#ffcccb' : '#f0f0f0',
                                            borderRadius: 5,
                                            transition: 'background-color 0.3s',
                                        },
                                    }}
                                />
                            );
                        })}
                    </Box>
                ))}
            </Box>
        );
    };

    return (
        <Box sx={{ textAlign: 'center', mt: 4, width: '100vw' }}>
            <Typography variant="h3" gutterBottom>
                Wheel of Fortune
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', mb: '30px' }}>
                {displayPuzzle()}
            </Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#0F2BFF' }}>
                {category.toUpperCase()}
            </Typography>

            {!solved && (
                <>

                    <Stack
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='center'
                        display='flex'
                        component="form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (wholePhraseGuess.length > 1) {
                                handleWholePhraseGuess(wholePhraseGuess);
                            } else {
                                handleLetterGuess(wholePhraseGuess);
                            }
                        }}
                        sx={{ mt: 4 }}
                    >
                        <TextField
                            value={wholePhraseGuess}
                            onChange={(e) => {
                                setWholePhraseGuess(e.target.value);
                                if (e.target.value.length > 1) {
                                    console.log("Word/Phrase guess:", e.target.value);
                                } else {
                                    console.log("Letter guess:", e.target.value);
                                }
                            }}
                            placeholder="Guess letter or the whole phrase"
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
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: 5,
                                    transition: 'background-color 0.3s',
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ ml: 2, width: 300, m: 4 }}
                        >
                            Guess The Letter Or The Whole Phrase
                        </Button>
                    </Stack>
                    <IconButton
                        onClick={toggleListening}
                        sx={{ width: 60, height: 60, color: 'white', mt: 4, backgroundColor: isListening ? "#ff6b6b" : "#4caf50", ":hover": { backgroundColor: isListening ? "#ff6b6b" : "#4caf50" } }}>
                        <MicIcon />
                    </IconButton>
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

                    <Button onClick={() => {
                        setShowGame(false)
                    }}>
                        New Game
                    </Button>
                </>
            )}
        </Box>
    );
};

export default Game;
