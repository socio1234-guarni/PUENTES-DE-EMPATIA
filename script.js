/* ==========================================================================
   PUENTES DE EMPATÍA - LÓGICA INTERACTIVA (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. MENÚ MÓVIL Y NAVEGACIÓN SUAVE
       ---------------------------------------------------------------------- */
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Cerrar menú móvil al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Resaltar sección activa en scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navElem = document.querySelector(`.nav-list a[href*=${sectionId}]`);

            if (navElem) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navElem.classList.add('active');
                } else {
                    navElem.classList.remove('active');
                }
            }
        });
    });

    /* ----------------------------------------------------------------------
       2. BOTONES DE NAVEGACIÓN DEL PMV (SECCIÓN 7)
       ---------------------------------------------------------------------- */
    const moduleBtns = document.querySelectorAll('.module-btn');
    moduleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            if (targetId) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    /* ----------------------------------------------------------------------
       3. CENTRO DE ORIENTACIÓN (SECCIÓN 8 - CATEGORÍAS TABS)
       ---------------------------------------------------------------------- */
    const categoryData = {
        desacuerdos: {
            title: "Desacuerdos entre compañeras",
            explanation: "Tener opiniones o formas distintas de trabajar es normal en el colegio. El conflicto surge cuando la diferencia de criterio se toma como un ataque personal o cuando no se valida la posición de la otra persona.",
            recommendation: "Haz una pausa antes de reaccionar. Escucha la postura de tu compañera sin interrumpir y busca puntos de encuentro enfocados en la tarea o en la solución del problema.",
            reflection: "¿Estoy respondiendo al desacuerdo o estoy reaccionando desde la molestia personal?"
        },
        comunicacion: {
            title: "Comunicación asertiva",
            explanation: "Es la habilidad de expresar tus necesidades, opiniones e inconformidades de forma clara, directa y respetuosa, sin utilizar lenguaje hiriente ni guardarte lo que sientes por miedo.",
            recommendation: "Utiliza frases en primera persona. Por ejemplo: 'Me sentí incómoda cuando pasó X situación' en lugar de 'Tú siempre haces X'. Esto reduce la defensiva del otro.",
            reflection: "¿Cómo puedo expresar lo que pienso sin descalificar la vivencia de mi compañera?"
        },
        exclusion: {
            title: "Exclusión en actividades grupales",
            explanation: "Dejar a alguien fuera de un equipo de trabajo o de una conversación de descanso puede generar tristeza, aislamiento e inseguridad respecto al grupo escolar.",
            recommendation: "Promueve la inclusión activa. Si notas que una compañera está sola, invítala a integrarse o propone dinámicas grupales abiertas.",
            reflection: "¿Qué sentiría yo si estuviera en la posición de no ser incluida en el equipo?"
        },
        rumores: {
            title: "Manejo de rumores y comentarios",
            explanation: "La información no verificada compartida en pasillos o chats destruye la confianza y genera un ambiente tenso de desconfianza mutua.",
            recommendation: "Aplica el filtro de la verdad y el respeto: si un comentario no te consta o puede herir a alguien, no lo repitas ni lo reenvíes por ningún medio.",
            reflection: "¿Contribuyo a frenar los comentarios no verificados o los difundo sin pensar?"
        },
        digitales: {
            title: "Conflictos en chats y redes sociales",
            explanation: "La falta de tono de voz y lenguaje corporal en los mensajes de texto propicia malentendidos de tono e interpretaciones negativas exageradas.",
            recommendation: "Evita discutir temas delicados por mensajes escritos. Si surge una diferencia en un chat, propone conversar en persona con calma durante el descanso.",
            reflection: "¿Es este chat el mejor medio para solucionar un desacuerdo o es mejor hablar frente a frente?"
        }
    };

    const tabBtns = document.querySelectorAll('.tab-btn');
    const panelTitle = document.getElementById('panelTitle');
    const panelExplanation = document.getElementById('panelExplanation');
    const panelRecommendation = document.getElementById('panelRecommendation');
    const panelReflection = document.getElementById('panelReflection');

    function loadCategoryContent(categoryKey) {
        const data = categoryData[categoryKey];
        if (data && panelTitle) {
            panelTitle.textContent = data.title;
            panelExplanation.textContent = data.explanation;
            panelRecommendation.textContent = data.recommendation;
            panelReflection.textContent = `"${data.reflection}"`;
        }
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');
            loadCategoryContent(category);
        });
    });

    // Cargar categoría inicial por defecto
    loadCategoryContent('desacuerdos');

    /* ----------------------------------------------------------------------
       4. FORMULARIO DEMOSTRATIVO (SECCIÓN 9)
       ---------------------------------------------------------------------- */
    const accompanimentForm = document.getElementById('accompanimentForm');
    const formSuccessMessage = document.getElementById('formSuccessMessage');
    const resetFormBtn = document.getElementById('resetFormBtn');
    const metricSolicitudes = document.getElementById('metricSolicitudes');

    if (accompanimentForm) {
        accompanimentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            accompanimentForm.classList.add('hidden');
            if (formSuccessMessage) {
                formSuccessMessage.classList.remove('hidden');
            }
            // Incrementar métrica simulada de solicitudes
            if (metricSolicitudes) {
                let currentVal = parseInt(metricSolicitudes.textContent, 10) || 45;
                metricSolicitudes.textContent = currentVal + 1;
            }
        });
    }

    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', () => {
            if (accompanimentForm) {
                accompanimentForm.reset();
                accompanimentForm.classList.remove('hidden');
            }
            if (formSuccessMessage) {
                formSuccessMessage.classList.add('hidden');
            }
        });
    }

    /* ----------------------------------------------------------------------
       5. AULA DE EMPATÍA - CUESTIONARIO INTERACTIVO (SECCIÓN 11)
       ---------------------------------------------------------------------- */
    const quizQuestions = [
        {
            question: "Durante un trabajo en grupo, una compañera no está de acuerdo con tu idea y propone una alternativa diferente. ¿Cuál sería una forma respetuosa de responder?",
            options: [
                { text: "Decirle que su idea es mala y exigir que se haga únicamente lo que tú propusiste.", correct: false },
                { text: "Escuchar su propuesta, identificar los puntos positivos y buscar una solución que integre ambas ideas.", correct: true },
                { text: "Mandar a hacer la tarea por tu cuenta y no volverle a hablar en el trabajo.", correct: false }
            ],
            feedback: {
                correct: "¡Excelente elección! Escuchar con apertura e integrar ideas promueve el trabajo colaborativo y fortalece las relaciones.",
                incorrect: "Recuerda que en un trabajo colaborativo es fundamental escuchar la postura del otro sin imponer nuestra idea de forma agresiva."
            }
        },
        {
            question: "Lees en un chat de curso un comentario que distorsiona una situación vivida por una compañera. ¿Qué acción fomenta la convivencia?",
            options: [
                { text: "Reenviar el mensaje a otros grupos para que todos opinen sobre el tema.", correct: false },
                { text: "Ignorar el mensaje totalmente y unirte al comentario burlón.", correct: false },
                { text: "No compartir el mensaje y sugerir amablemente en el chat tratar el tema directamente y con respeto.", correct: true }
            ],
            feedback: {
                correct: "¡Muy bien! Frenar la cadena de rumores es clave para evitar la agresión relacional y proteger el respeto mutuo.",
                incorrect: "Compartir o secundar comentarios no verificados alimenta los rumores y daña el ambiente escolar."
            }
        },
        {
            question: "Notas que una compañera nueva se sienta sola durante los descansos y le cuesta integrarse. ¿Cuál es una actitud empática?",
            options: [
                { text: "Acercarte amablemente, saludarla e invitarla a compartir con tu grupo de amigas.", correct: true },
                { text: "Esperar a que ella tome la iniciativa de acercarse a hablar primero.", correct: false },
                { text: "Pensar que prefiere estar sola y no interrumpir su espacio.", correct: false }
            ],
            feedback: {
                correct: "¡Respuesta idónea! Incluir activamente a quienes están solos genera un sentido de pertenencia y acogida escolar.",
                incorrect: "Dar el primer paso para integrar a una compañera demuestra empatía y facilidades de acogida comunitaria."
            }
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const questionTitle = document.getElementById('questionTitle');
    const optionsContainer = document.getElementById('optionsContainer');
    const feedbackBox = document.getElementById('feedbackBox');
    const feedbackText = document.getElementById('feedbackText');
    const nextBtn = document.getElementById('nextBtn');
    const quizProgress = document.getElementById('quizProgress');
    const questionBox = document.getElementById('questionBox');
    const quizResultBox = document.getElementById('quizResultBox');
    const finalScoreText = document.getElementById('finalScoreText');
    const resultFeedbackText = document.getElementById('resultFeedbackText');
    const retryQuizBtn = document.getElementById('retryQuizBtn');
    const metricActividades = document.getElementById('metricActividades');

    function renderQuestion() {
        if (!quizQuestions[currentQuestionIndex]) return;

        const currentQ = quizQuestions[currentQuestionIndex];
        questionTitle.textContent = `${currentQuestionIndex + 1}. ${currentQ.question}`;
        optionsContainer.innerHTML = '';
        feedbackBox.classList.add('hidden');

        // Actualizar barra de progreso
        const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
        if (quizProgress) quizProgress.style.width = `${progressPercent}%`;

        currentQ.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt.text;
            btn.addEventListener('click', () => selectAnswer(btn, opt, currentQ));
            optionsContainer.appendChild(btn);
        });
    }

    function selectAnswer(selectedBtn, optionObj, questionObj) {
        // Deshabilitar todos los botones de opción
        const allOptionBtns = optionsContainer.querySelectorAll('.option-btn');
        allOptionBtns.forEach(b => b.disabled = true);

        if (optionObj.correct) {
            selectedBtn.classList.add('selected-correct');
            feedbackText.textContent = questionObj.feedback.correct;
            score++;
        } else {
            selectedBtn.classList.add('selected-incorrect');
            feedbackText.textContent = questionObj.feedback.incorrect;
            // Mostrar también la correcta
            allOptionBtns.forEach((b, i) => {
                if (questionObj.options[i].correct) {
                    b.classList.add('selected-correct');
                }
            });
        }

        feedbackBox.classList.remove('hidden');
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizQuestions.length) {
                renderQuestion();
            } else {
                showQuizResults();
            }
        });
    }

    function showQuizResults() {
        if (questionBox) questionBox.classList.add('hidden');
        if (quizResultBox) quizResultBox.classList.remove('hidden');

        if (finalScoreText) {
            finalScoreText.textContent = `Obtuviste ${score} de ${quizQuestions.length} respuestas adecuadas.`;
        }

        if (resultFeedbackText) {
            if (score === quizQuestions.length) {
                resultFeedbackText.textContent = "¡Demostraste una gran sensibilidad socioemocional y empatía hacia tus compañeras!";
            } else {
                resultFeedbackText.textContent = "¡Buen trabajo practicando! Repasar las cápsulas de comunicación y empatía te ayudará a seguir fortaleciendo la convivencia.";
            }
        }

        // Incrementar métrica simulada de actividades completadas
        if (metricActividades) {
            let currentAct = parseInt(metricActividades.textContent, 10) || 128;
            metricActividades.textContent = currentAct + 1;
        }
    }

    if (retryQuizBtn) {
        retryQuizBtn.addEventListener('click', () => {
            currentQuestionIndex = 0;
            score = 0;
            if (quizResultBox) quizResultBox.classList.add('hidden');
            if (questionBox) questionBox.classList.remove('hidden');
            renderQuestion();
        });
    }

    // Inicializar primera pregunta del quiz
    renderQuestion();

    /* ----------------------------------------------------------------------
       6. MEJORAS DE EXPERIENCIA: PROGRESO, REVELADOS Y TRANSICIONES
       ---------------------------------------------------------------------- */
    const root = document.documentElement;
    root.classList.add('js');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Barra de progreso de lectura y encabezado compacto al desplazarse
    const header = document.getElementById('header');
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    header.appendChild(progress);
    let ticking = false;
    function onScroll() {
        const max = root.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
        header.classList.toggle('scrolled', window.scrollY > 24);
        ticking = false;
    }
    window.addEventListener('scroll', () => {
        if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();

    // Menú móvil accesible: estado, Escape y clic fuera
    function setMenu(open) {
        navMenu.classList.toggle('active', open);
        menuToggle.classList.toggle('open', open);
        menuToggle.setAttribute('aria-expanded', String(open));
    }
    menuToggle.addEventListener('click', () => setMenu(navMenu.classList.contains('active')));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
    document.addEventListener('click', e => {
        if (!header.contains(e.target)) setMenu(false);
    });
    navLinks.forEach(l => l.addEventListener('click', () => setMenu(false)));

    // Revelado único al entrar en pantalla: gráficas, barras, cifras y ruta
    function whenVisible(el, fn, threshold = 0.35) {
        if (!el) return;
        if (reduceMotion || !('IntersectionObserver' in window)) { fn(); return; }
        const io = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) { fn(); io.disconnect(); }
        }, { threshold });
        io.observe(el);
    }

    document.querySelectorAll('.circle').forEach(c => {
        const value = c.getAttribute('stroke-dasharray');
        c.style.strokeDasharray = '0, 100';
        whenVisible(c.closest('.stat-card'), () => { c.style.strokeDasharray = value; });
    });

    document.querySelectorAll('.bar-fill').forEach((bar, i) => {
        const w = bar.style.width;
        bar.style.width = '0%';
        whenVisible(bar.closest('.chart-card'), () => {
            setTimeout(() => { bar.style.width = w; }, i * 120);
        });
    });

    function countUp(el, to, duration = 1200, format = n => n) {
        if (reduceMotion) { el.textContent = format(to); return; }
        const t0 = performance.now();
        (function frame(t) {
            const p = Math.min((t - t0) / duration, 1);
            el.textContent = format(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(frame);
        })(t0);
    }
    const badge = document.querySelector('.stat-number-badge');
    if (badge) {
        whenVisible(badge.closest('.stat-card'), () => countUp(badge, 17712, 1400, n => n.toLocaleString('es-CO')));
    }
    document.querySelectorAll('.dash-metric').forEach(m => {
        const raw = m.textContent.trim();
        if (isNaN(parseInt(raw, 10))) return;
        const suffix = raw.endsWith('%') ? '%' : '';
        // Se lee el valor al momento de revelar, por si la demo ya lo incrementó
        whenVisible(m.closest('.dash-card'), () => countUp(m, parseInt(m.textContent, 10), 1000, n => n + suffix), 0.5);
    });

    const stepper = document.querySelector('.route-stepper');
    whenVisible(stepper, () => stepper.classList.add('in-view'), 0.25);

    // Centro de orientación: semántica de pestañas y transición del contenido
    const tabList = document.getElementById('categoryTabs');
    const panelCard = document.querySelector('#orientationPanel .panel-card');
    if (tabList) tabList.setAttribute('role', 'tablist');
    tabBtns.forEach(b => {
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-selected', String(b.classList.contains('active')));
        b.addEventListener('click', () => {
            tabBtns.forEach(x => x.setAttribute('aria-selected', String(x === b)));
            if (panelCard) {
                panelCard.classList.remove('swap');
                void panelCard.offsetWidth;
                panelCard.classList.add('swap');
            }
        });
    });
    const orientationPanel = document.getElementById('orientationPanel');
    if (orientationPanel) orientationPanel.setAttribute('aria-live', 'polite');

    // Formulario: foco en la confirmación para lectores de pantalla
    if (accompanimentForm && formSuccessMessage) {
        accompanimentForm.addEventListener('submit', () => formSuccessMessage.focus({ preventScroll: true }));
    }

    // Cuestionario: transición entre preguntas y respuesta anunciada
    if (feedbackBox) feedbackBox.setAttribute('aria-live', 'polite');
    function replayEnter() {
        if (!questionBox) return;
        questionBox.classList.remove('enter');
        void questionBox.offsetWidth;
        questionBox.classList.add('enter');
    }
    if (nextBtn) nextBtn.addEventListener('click', replayEnter);
    if (retryQuizBtn) retryQuizBtn.addEventListener('click', replayEnter);
    if (optionsContainer) {
        optionsContainer.addEventListener('click', e => {
            const b = e.target.closest('.option-btn');
            if (b && b.classList.contains('selected-incorrect')) b.classList.add('shake');
        });
    }
});
