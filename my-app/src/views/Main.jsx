import React from 'react';
import Header from "../components/Header";
import Game from "../components/Game";
import {pixar} from "../data/pixar";
import {disney} from "../data/disney";

function Main() {
    const [gameTheme, setGameTheme] = React.useState(null);

    const handleThemeSelection = (theme) => {
        setGameTheme(theme);
        const pre = document.getElementById("pre");
        if (pre) pre.classList.add("hidden");
        const post = document.getElementById("post");
        if (post) post.classList.add("hidden");
    };

    return (
        <>
            <Header />

            {!gameTheme && (
                <section id="pre" className="theme-select-screen">
                    <div id="themes">
                        <h2>Choose a theme!</h2>
                        <div className="theme-options">
                            <button onClick={() => handleThemeSelection(disney)} className="theme-card">
                                <img
                                    src="https://res.cloudinary.com/beumsk/image/upload/v1547982044/memory/disney/mickey.jpg"
                                    alt="Disney preview"
                                />
                                <span>🎠 Disney</span>
                            </button>
                            <button onClick={() => handleThemeSelection(pixar)} className="theme-card">
                                <img
                                    src="https://res.cloudinary.com/beumsk/image/upload/v1547982987/memory/pixar/buzz.jpg"
                                    alt="Pixar preview"
                                />
                                <span>🎬 Pixar</span>
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {gameTheme && <Game gameTheme={gameTheme} />}

            <section id="post" className="hidden">
                <div>
                    <h2>🎉 Congratulations!</h2>
                    <p id="final"></p>
                    <br />
                    <p>
                        <a href="#" id="again" onClick={() => setGameTheme(null)}>Play again!</a>
                    </p>
                </div>
            </section>
        </>
    );
}

export default Main;