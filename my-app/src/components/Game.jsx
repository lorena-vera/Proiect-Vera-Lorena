import React, { useState, useEffect } from "react";

function Game({ gameTheme }) {
    const [boxes, setBoxes] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [previewing, setPreviewing] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);

    const createShuffledBoxes = () => {
        const base = Array.from({ length: 10 }, (_, i) => i);
        const pairs = [...base, ...base];
        for (let i = pairs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
        }
        return pairs;
    };

    const handleReset = () => {
        const shuffled = createShuffledBoxes();
        setBoxes(shuffled);
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setScore(0);
        setTime(0);
        setPreviewing(true);
        setTimerOn(false);
        setGameCompleted(false);

        setTimeout(() => {
            setPreviewing(false);
        }, 3000);
    };

    useEffect(() => {
        const shuffled = createShuffledBoxes();
        setBoxes(shuffled);
        setPreviewing(true);
        setTimeout(() => {
            setPreviewing(false);
        }, 3000);
    }, [gameTheme]);

    useEffect(() => {
        let timer;
        if (timerOn) {
            timer = setInterval(() => setTime((t) => t + 1), 1000);
        }
        return () => clearInterval(timer);
    }, [timerOn]);

    useEffect(() => {
        if (flipped.length === 2) {
            const [first, second] = flipped;
            setMoves((m) => m + 1);

            if (boxes[first] === boxes[second]) {
                setMatched((prev) => [...prev, first, second]);
                setScore((s) => s + 10);
                setFlipped([]);
            } else {
                setTimeout(() => setFlipped([]), 700);
                setScore((s) => (s > 0 ? s - 2 : 0));
            }
        }
    }, [flipped]);

    useEffect(() => {
        if (matched.length === boxes.length && boxes.length > 0) {
            setTimerOn(false);
            setGameCompleted(true);
        }
    }, [matched]);

    const handleClick = (index) => {
        if (previewing || flipped.includes(index) || matched.includes(index)) return;
        if (!timerOn) setTimerOn(true);
        if (flipped.length < 2) {
            setFlipped((prev) => [...prev, index]);
        }
    };

    return (
        <section className="main-game">
            <div className="game-container">
                {boxes.map((value, index) => {
                    const isRevealed = previewing || flipped.includes(index) || matched.includes(index);
                    return (
                        <button
                            key={index}
                            className={`box ${matched.includes(index) ? "matched" : ""} ${previewing ? "preview" : ""}`}
                            onClick={() => handleClick(index)}
                            disabled={isRevealed}
                        >
                            {isRevealed ? (
                                <img src={gameTheme[value]} alt={`img-${value}`} />
                            ) : (
                                <span className="card-back">✦</span>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="state-panel">
                <p>Time: {time} s</p>
                <p>Moves: {moves}</p>
                <p>Score: {score}</p>
                <button onClick={handleReset}>Play Again</button>
            </div>

            {gameCompleted && (
                <div className="victory-screen">
                    <h2>🎉 Game over ! 🎉</h2>
                    <p>You won by {score} points in {time} seconds and {moves} moves!</p>
                </div>
            )}

            {gameCompleted && (
                <div className="confetti-container">
                    {[...Array(40)].map((_, i) => (
                        <span
                            key={i}
                            className="confetti-star"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${2 + Math.random() * 3}s`,
                                fontSize: `${Math.random() * 10 + 8}px`,
                            }}
                        >
        ⭐
      </span>
                    ))}
                </div>
            )}

        </section>
    );
}

export default Game;


