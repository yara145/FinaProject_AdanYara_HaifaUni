// src/activity/pages/LetterActivity.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LetterActivity.css';
import ProgressBar from '../components/ProgressBar';
import lionImage from '../../assets/lion.png';

const arabicLetters = ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي'];

const LetterActivity = () => {
    const [currentLetters, setCurrentLetters] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [skippedLetters, setSkippedLetters] = useState([]);
    const [correctCount, setCorrectCount] = useState(0);
    const [round, setRound] = useState(1);
    const [isRoundComplete, setIsRoundComplete] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        generateRandomLetters();
    }, [round]);

    const generateRandomLetters = () => {
        const letterCount = round === 1 ? 10 : 8;
        const shuffledLetters = [...arabicLetters].sort(() => 0.5 - Math.random());
        setCurrentLetters(shuffledLetters.slice(0, letterCount));
        setCurrentIndex(0);
        setSkippedLetters([]);
        setCorrectCount(0);
        setIsRoundComplete(false);
        setShowMessage(false);
    };

    const handleCardClick = () => {
        setCorrectCount(correctCount + 1);
        moveToNextLetter();
    };

    const handleSkip = () => {
        setSkippedLetters([...skippedLetters, currentLetters[currentIndex]]);
        moveToNextLetter();
    };

    const handleRestart = () => {
        setRound(round + 1);
    };

    const moveToNextLetter = () => {
        if (currentIndex < currentLetters.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else if (skippedLetters.length > 0) {
            setCurrentLetters(skippedLetters);
            setSkippedLetters([]);
            setCurrentIndex(0);
            setShowMessage(true);
        } else {
            setIsRoundComplete(true);
        }
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="letter-activity">
            <div className="header">
                <img src={lionImage} alt="Lion Icon" className="lion-icon" />
                <ProgressBar progress={(currentIndex + 1) / currentLetters.length * 100} />
                <button className="back-button" onClick={handleBackToLogin}>رجوع</button>
            </div>
            {!isRoundComplete ? (
                <>
                    <div className="letter-card" onClick={handleCardClick}>
                        <div className="letter">{currentLetters[currentIndex]}</div>
                    </div>
                    {showMessage && (
                        <p className="message">الرجاء النقر على الأحرف التي تخطيتها قبل الانتقال إلى الجولة التالية.</p>
                    )}
                </>
            ) : (
                <div className="results">
                    <h2>!جولة مكتملة</h2>
                    <p>صحيح: {correctCount}</p>
                    <button className="control-button" onClick={handleRestart}>الجولة التالية</button>
                </div>
            )}
            {!isRoundComplete && (
                <div className="controls">
                    <button className="control-button skip-button" onClick={handleSkip}>
                     تخطي 
                    </button>
                </div>
            )}
        </div>
    );
};

export default LetterActivity;
