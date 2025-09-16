
        const quizQuestions = [
            {
                question: "What is the capital of France?",
                options: ["London", "Berlin", "Paris", "Madrid"],
                answer: "Paris"
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Earth", "Mars", "Jupiter", "Venus"],
                answer: "Mars"
            },
            {
                question: "What is the largest ocean on Earth?",
                options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
                answer: "Pacific Ocean"
            },
            {
                question: "Who wrote 'Romeo and Juliet'?",
                options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
                answer: "William Shakespeare"
            },
            {
                question: "What is the chemical symbol for water?",
                options: ["O2", "CO2", "H2O", "NaCl"],
                answer: "H2O"
            },
            {
                question: "How many continents are there?",
                options: ["5", "6", "7", "8"],
                answer: "7"
            },
            {
                question: "Who painted the Mona Lisa?",
                options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
                answer: "Leonardo da Vinci"
            },
            {
                question: "What is the hardest natural substance on Earth?",
                options: ["Gold", "Iron", "Diamond", "Quartz"],
                answer: "Diamond"
            }
        ];

        // --- DOM Elements ---
        const quizContainer = document.getElementById('quiz-container');
        const resultsContainer = document.getElementById('results-container');
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const timerElement = document.getElementById('timer');
        const scoreText = document.getElementById('score-text');
        const restartBtn = document.getElementById('restart-btn');

        // --- Quiz State ---
        let currentQuestionIndex = 0;
        let score = 0;
        let timeLeft = 30;
        let timerId;

        function startQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            resultsContainer.style.display = 'none';
            quizContainer.style.display = 'block';
            showQuestion();
        }

        function showQuestion() {
            // Reset timer and options
            resetState();
            
            // Get current question object
            let currentQuestion = quizQuestions[currentQuestionIndex];
            questionText.innerText = currentQuestion.question;

            // Create buttons for each option
            currentQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.innerText = option;
                button.classList.add('option-btn');
                button.addEventListener('click', selectAnswer);
                optionsContainer.appendChild(button);
            });
            
            // Start the countdown
            startTimer();
        }

        function startTimer() {
            timeLeft = 30;
            timerElement.innerText = timeLeft;
            timerId = setInterval(() => {
                timeLeft--;
                timerElement.innerText = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(timerId);
                    handleTimeout();
                }
            }, 1000);
        }

        function resetState() {
            clearInterval(timerId);
            while (optionsContainer.firstChild) {
                optionsContainer.removeChild(optionsContainer.firstChild);
            }
        }

        function selectAnswer(e) {
            clearInterval(timerId); // Stop the timer
            const selectedButton = e.target;
            const correct = selectedButton.innerText === quizQuestions[currentQuestionIndex].answer;
            
            // Give feedback
            setStatusClass(selectedButton, correct);
            if (correct) {
                score++;
            }
            
            // Disable all buttons
            Array.from(optionsContainer.children).forEach(button => {
                // Also show the correct answer if the user was wrong
                if (button.innerText === quizQuestions[currentQuestionIndex].answer) {
                    setStatusClass(button, true);
                }
                button.disabled = true;
            });
            
            // Wait a moment then show next question or results
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < quizQuestions.length) {
                    showQuestion();
                } else {
                    showResults();
                }
            }, 1500); // 1.5 second delay
        }

        function handleTimeout() {
            // Show the correct answer
            Array.from(optionsContainer.children).forEach(button => {
                if (button.innerText === quizQuestions[currentQuestionIndex].answer) {
                    setStatusClass(button, true);
                }
                button.disabled = true;
            });
            
            // Move to the next question after a delay
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < quizQuestions.length) {
                    showQuestion();
                } else {
                    showResults();
                }
            }, 1500);
        }
        
        function setStatusClass(element, correct) {
            if (correct) {
                element.classList.add('correct');
            } else {
                element.classList.add('incorrect');
            }
        }

        function showResults() {
            quizContainer.style.display = 'none';
            resultsContainer.style.display = 'block';
            scoreText.innerText = `You scored ${score} out of ${quizQuestions.length}!`;
        }
        
        startQuiz();