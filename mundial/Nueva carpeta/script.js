// script.js
// DATOS COMPLETOS CON CONTROVERSIAS DETALLADAS PARA CADA MUNDIAL
const mundialesData = [
    {
        id: 1930, nombre: "Uruguay 1930", campeon: "Uruguay", subcampeon: "Argentina", mejorSeleccion: "Uruguay", mejorDt: "Alberto Suppici", mejorArbitro: "John Langenus", mejorArquero: "Enrique Ballestrero", mejorDefensa: "José Nasazzi", mejorMediocampo: "José Leandro Andrade", mejorDelantero: "Guillermo Stábile", mejorGol: "Carlos Vidal volea", mejorAsistencia: "Juan López", mejorAtajada: "Ballestrero ataja en final", masAmarillas: "Sin tarjetas", masRojas: "Sin expulsiones", sinAmarillasRojas: "Todos", sinRojas: "Todos", botaOro: "Guillermo Stábile (8 goles)", fairPlay: "Uruguay (sin amonestaciones)", mejorJoven: "No oficial", tablaGoleadores: [{ nombre: "Guillermo Stábile", goles: 8 }, { nombre: "Pedro Cea", goles: 5 }, { nombre: "Peregrino Anselmo", goles: 3 }],
        controversias: "🔴 Polémica del balón: En la final, Argentina y Uruguay usaron balones diferentes (uno por tiempo). Además, muchos europeos llegaron en barco después de semanas. Hubo protestas por la designación del árbitro belga Langenus.",
        mejoresJugadas: "Gol de Pablo Dorado en la final, primer gol en la historia de los mundiales."
    },
    {
        id: 1934, nombre: "Italia 1934", campeon: "Italia", subcampeon: "Checoslovaquia", mejorSeleccion: "Italia", mejorDt: "Vittorio Pozzo", mejorArbitro: "Ivan Eklind", mejorArquero: "Ricardo Zamora", mejorDefensa: "Luis Monti", mejorMediocampo: "Giuseppe Meazza", mejorDelantero: "Oldřich Nejedlý", mejorGol: "Schiavio final", mejorAsistencia: "Guaita", mejorAtajada: "Zamora", masAmarillas: "Sin sistema", masRojas: "Expulsión de Monti?", sinAmarillasRojas: "Varios", sinRojas: "Suecia", botaOro: "Oldřich Nejedlý (5 goles)", fairPlay: "Suecia", mejorJoven: "No oficial", tablaGoleadores: [{ nombre: "Oldřich Nejedlý", goles: 5 }, { nombre: "Angelo Schiavio", goles: 4 }, { nombre: "Edmund Conen", goles: 4 }],
        controversias: "🔴 Influencia fascista de Mussolini, quien presionó para que Italia ganara. Árbitro sueco Eklind fue sospechoso de favorecer a Italia. Partido semifinal contra Austria con decisiones dudosas.",
        mejoresJugadas: ""
    },
    {
        id: 1938, nombre: "Francia 1938", campeon: "Italia", subcampeon: "Hungría", mejorSeleccion: "Italia", mejorDt: "Vittorio Pozzo", mejorArbitro: "Georges Capdeville", mejorArquero: "Aldo Olivieri", mejorDefensa: "Pietro Rava", mejorMediocampo: "Michele Andreolo", mejorDelantero: "Leônidas", mejorGol: "Leônidas chilena", mejorAsistencia: "Colaussi", mejorAtajada: "Olivieri", masAmarillas: "Sin registro", masRojas: "Brasil expulsión", sinAmarillasRojas: "Suecia", sinRojas: "Hungría", botaOro: "Leônidas (7 goles)", fairPlay: "Suecia", mejorJoven: "No oficial", tablaGoleadores: [{ nombre: "Leônidas", goles: 7 }, { nombre: "György Sárosi", goles: 5 }, { nombre: "Gino Colaussi", goles: 4 }],
        controversias: "🔴 Brasil decidió dejar a Leônidas (su estrella) en el banquillo en semifinales contra Italia, supuestamente para guardarlo para la final, pero perdieron 2-1. Anschluss de Austria hizo que jugadores austriacos fueran obligados a jugar por Alemania.",
        mejoresJugadas: ""
    },
    {
        id: 1950, nombre: "Brasil 1950", campeon: "Uruguay", subcampeon: "Brasil", mejorSeleccion: "Uruguay", mejorDt: "Juan López Fontana", mejorArbitro: "George Reader", mejorArquero: "Roque Máspoli", mejorDefensa: "Eusebio Tejera", mejorMediocampo: "Obdulio Varela", mejorDelantero: "Zizinho", mejorGol: "Ghiggia ángulo", mejorAsistencia: "Zizinho", mejorAtajada: "Máspoli", masAmarillas: "Sin tarjetas", masRojas: "Ninguna", sinAmarillasRojas: "Todos", sinRojas: "Todos", botaOro: "Ademir (9 goles)", fairPlay: "Uruguay", mejorJoven: "No oficial", tablaGoleadores: [{ nombre: "Ademir", goles: 9 }, { nombre: "Óscar Míguez", goles: 5 }, { nombre: "Zizinho", goles: 4 }],
        controversias: "🔴 MARACANAZO: Final no era una final clásica sino un hexagonal final. El Maracaná lleno (200.000 personas) vio perder a Brasil. Hubo depresión nacional y varios aficionados se suicidaron. Además, Argentina se retiró de las eliminatorias.",
        mejoresJugadas: ""
    },
    {
        id: 1954, nombre: "Suiza 1954", campeon: "Alemania Federal", subcampeon: "Hungría", mejorSeleccion: "Alemania", mejorDt: "Sepp Herberger", mejorArbitro: "William Ling", mejorArquero: "Toni Turek", mejorDefensa: "Kohlmeyer", mejorMediocampo: "Fritz Walter", mejorDelantero: "Puskás", mejorGol: "Rahn final", mejorAsistencia: "Hidegkuti", mejorAtajada: "Turek", masAmarillas: "Hungría", masRojas: "Bozsik", sinAmarillasRojas: "Austria", sinRojas: "Austria", botaOro: "Sándor Kocsis (11 goles)", fairPlay: "Austria", mejorJoven: "No oficial", tablaGoleadores: [{ nombre: "Sándor Kocsis", goles: 11 }, { nombre: "Josef Hügi", goles: 6 }, { nombre: "Ferenc Puskás", goles: 4 }],
        controversias: "🔴 'Milagro de Berna': Alemania venció a la invencible Hungría (32 partidos sin perder). Hubo sospechas de dopaje alemán (inyecciones de metanfetamina). Además, Puskás reclamó un gol anulado en la final por offside dudoso.",
        mejoresJugadas: ""
    },
    {
        id: 1958, nombre: "Suecia 1958", campeon: "Brasil", subcampeon: "Suecia", mejorSeleccion: "Brasil", mejorDt: "Feola", mejorArbitro: "Maurice Guigue", mejorArquero: "Gilmar", mejorDefensa: "Djalma Santos", mejorMediocampo: "Didí", mejorDelantero: "Pelé", mejorGol: "Pelé chilena", mejorAsistencia: "Garrincha", mejorAtajada: "Gilmar", masAmarillas: "Francia", masRojas: "Paraguay", sinAmarillasRojas: "Brasil", sinRojas: "Gales", botaOro: "Just Fontaine (13 goles)", fairPlay: "Brasil", mejorJoven: "Pelé (17 años)", tablaGoleadores: [{ nombre: "Just Fontaine", goles: 13 }, { nombre: "Pelé", goles: 6 }, { nombre: "Helmut Rahn", goles: 6 }],
        controversias: "🔴 El gobierno sueco intentó que Brasil no usara a Pelé por ser menor de edad? Falso. Pero hubo polémica en semifinal: Francia quejándose del arbitraje. La final Brasil 5-2 Suecia con el público local silbando a su propia selección.",
        mejoresJugadas: ""
    },
    {
        id: 1962, nombre: "Chile 1962", campeon: "Brasil", subcampeon: "Checoslovaquia", mejorSeleccion: "Brasil", mejorDt: "Moreira", mejorArbitro: "Latyshev", mejorArquero: "Schrojf", mejorDefensa: "Mauro", mejorMediocampo: "Zito", mejorDelantero: "Garrincha", mejorGol: "Garrincha", mejorAsistencia: "Amarildo", mejorAtajada: "Schrojf", masAmarillas: "Chile", masRojas: "Italia", sinAmarillasRojas: "URSS", sinRojas: "Brasil", botaOro: "Garrincha, Vavá, Albert (4)", fairPlay: "Brasil", mejorJoven: "No oficial", tablaGoleadores: [{ nombre: "Garrincha", goles: 4 }, { nombre: "Vavá", goles: 4 }, { nombre: "Leonel Sánchez", goles: 4 }],
        controversias: "🔴 LA BATALLA DE SANTIAGO (Italia vs Chile): partido más violento de la historia con 2 expulsiones, puñetazos, patadas voladoras. Previo, periodistas italianos denigraron a Chile, lo que encendió la furia local. Intervención militar.",
        mejoresJugadas: ""
    },
    {
        id: 1966, nombre: "Inglaterra 1966", campeon: "Inglaterra", subcampeon: "Alemania Federal", mejorSeleccion: "Inglaterra", mejorDt: "Ramsey", mejorArbitro: "Dienst", mejorArquero: "Banks", mejorDefensa: "Moore", mejorMediocampo: "Charlton", mejorDelantero: "Eusébio", mejorGol: "Hurst", mejorAsistencia: "Charlton", mejorAtajada: "Banks", masAmarillas: "Argentina", masRojas: "Rattín", sinAmarillasRojas: "Corea del Norte", sinRojas: "Portugal", botaOro: "Eusébio (9 goles)", fairPlay: "Corea del Norte", mejorJoven: "No oficial", tablaGoleadores: [{ nombre: "Eusébio", goles: 9 }, { nombre: "Helmut Haller", goles: 6 }, { nombre: "Geoff Hurst", goles: 4 }],
        controversias: "🔴 GOL FANTASMA: El tercer gol de Hurst en la final (4-2) pegó en el larguero y la línea; el árbitro asistente dictaminó que entró, pero hasta hoy se discute si realmente cruzó. Expulsión de Rattín (Argentina) que no quiso salir.",
        mejoresJugadas: ""
    },
    {
        id: 1970, nombre: "México 1970", campeon: "Brasil", subcampeon: "Italia", mejorSeleccion: "Brasil", mejorDt: "Zagallo", mejorArbitro: "Glöckner", mejorArquero: "Félix", mejorDefensa: "Carlos Alberto", mejorMediocampo: "Pelé", mejorDelantero: "Jairzinho", mejorGol: "Carlos Alberto", mejorAsistencia: "Pelé", mejorAtajada: "Banks", masAmarillas: "Italia", masRojas: "México", sinAmarillasRojas: "Brasil", sinRojas: "Rumania", botaOro: "Gerd Müller (10 goles)", fairPlay: "Brasil", mejorJoven: "No oficial", tablaGoleadores: [{ nombre: "Gerd Müller", goles: 10 }, { nombre: "Jairzinho", goles: 7 }, { nombre: "Pelé", goles: 4 }],
        controversias: "🔴 Partidos a mediodía con 40 grados para beneficiar a Europa en TV. La semifinal Italia-Alemania 4-3 llamada 'Partido del Siglo' pero con polémica por fatiga. Pelé reclamó falta en un gol no concedido.",
        mejoresJugadas: ""
    },
    {
        id: 1974, nombre: "Alemania 1974", campeon: "Alemania Federal", subcampeon: "Países Bajos", mejorSeleccion: "Países Bajos", mejorDt: "Michels", mejorArbitro: "Taylor", mejorArquero: "Maier", mejorDefensa: "Beckenbauer", mejorMediocampo: "Cruyff", mejorDelantero: "Müller", mejorGol: "Cruyff", mejorAsistencia: "Neeskens", mejorAtajada: "Maier", masAmarillas: "Holanda", masRojas: "Australia", sinAmarillasRojas: "Zaire", sinRojas: "Polonia", botaOro: "Grzegorz Lato (7 goles)", fairPlay: "Polonia", mejorJoven: "Żmuda", tablaGoleadores: [{ nombre: "Grzegorz Lato", goles: 7 }, { nombre: "Johan Neeskens", goles: 5 }, { nombre: "Andrzej Szarmach", goles: 5 }],
        controversias: "🔴 La Naranja Mecánica vs la sobriedad alemana. Polémica por el penal a los 2 minutos de la final (Neeskens) que no era penal claro. Holanda acusó a Alemania de usar métodos antideportivos. Además, Alemania Oriental venció a Alemania Federal en primera fase.",
        mejoresJugadas: ""
    },
    {
        id: 1978, nombre: "Argentina 1978", campeon: "Argentina", subcampeon: "Países Bajos", mejorSeleccion: "Argentina", mejorDt: "Menotti", mejorArbitro: "Gonella", mejorArquero: "Fillol", mejorDefensa: "Passarella", mejorMediocampo: "Kempes", mejorDelantero: "Kempes", mejorGol: "Kempes", mejorAsistencia: "Luque", mejorAtajada: "Fillol", masAmarillas: "Holanda", masRojas: "Argentina", sinAmarillasRojas: "Perú", sinRojas: "Túnez", botaOro: "Mario Kempes (6 goles)", fairPlay: "Túnez", mejorJoven: "Cabrini", tablaGoleadores: [{ nombre: "Mario Kempes", goles: 6 }, { nombre: "Teófilo Cubillas", goles: 5 }, { nombre: "Rob Rensenbrink", goles: 5 }],
        controversias: "🔴 POLÉMICA MÁXIMA: Argentina necesitaba ganar por 4 goles a Perú en segunda fase y lo logró 6-0. Se sospechó que Perú se dejó ganar por favores políticos o dinero (régimen militar argentino). Holanda protestó. Además, el torneo se jugó bajo dictadura.",
        mejoresJugadas: ""
    },
    {
        id: 1982, nombre: "España 1982", campeon: "Italia", subcampeon: "Alemania Federal", mejorSeleccion: "Italia", mejorDt: "Bearzot", mejorArbitro: "Coelho", mejorArquero: "Zoff", mejorDefensa: "Gentile", mejorMediocampo: "Falcão", mejorDelantero: "Rossi", mejorGol: "Zico", mejorAsistencia: "Conti", mejorAtajada: "Zoff", masAmarillas: "Italia", masRojas: "Hungría", sinAmarillasRojas: "Argelia", sinRojas: "Bélgica", botaOro: "Paolo Rossi (6 goles)", fairPlay: "Brasil", mejorJoven: "Amoros", tablaGoleadores: [{ nombre: "Paolo Rossi", goles: 6 }, { nombre: "Karl-Heinz Rummenigge", goles: 5 }, { nombre: "Zico", goles: 4 }],
        controversias: "🔴 El 'Pufo' de Kuwait: El jeque kuwaití ordenó a sus jugadores retirarse del campo tras un gol de Francia, y el árbitro anuló el tanto. Alemania y Austria hicieron un pacto de no agresión para eliminar a Argelia (''Anschluss'' del fútbol).",
        mejoresJugadas: ""
    },
    {
        id: 1986, nombre: "México 1986", campeon: "Argentina", subcampeon: "Alemania Federal", mejorSeleccion: "Argentina", mejorDt: "Bilardo", mejorArbitro: "Arppi Filho", mejorArquero: "Goycochea", mejorDefensa: "Brown", mejorMediocampo: "Maradona", mejorDelantero: "Lineker", mejorGol: "Maradona", mejorAsistencia: "Maradona", mejorAtajada: "Goycochea", masAmarillas: "Bélgica", masRojas: "Uruguay", sinAmarillasRojas: "Marruecos", sinRojas: "Irak", botaOro: "Gary Lineker (6 goles)", fairPlay: "Marruecos", mejorJoven: "Scifo", tablaGoleadores: [{ nombre: "Gary Lineker", goles: 6 }, { nombre: "Diego Maradona", goles: 5 }, { nombre: "Emilio Butragueño", goles: 5 }],
        controversias: "🔴 LA MANO DE DIOS: Maradona marcó con la mano ante Inglaterra y el árbitro lo validó. Dijo que fue 'la mano de Dios'. Además, el 'Gol del Siglo' en el mismo partido. Polémica por el calor y el arbitraje en cuartos.",
        mejoresJugadas: ""
    },
    {
        id: 1990, nombre: "Italia 1990", campeon: "Alemania Federal", subcampeon: "Argentina", mejorSeleccion: "Alemania", mejorDt: "Beckenbauer", mejorArbitro: "Codesal", mejorArquero: "Goycochea", mejorDefensa: "Brehme", mejorMediocampo: "Matthäus", mejorDelantero: "Schillaci", mejorGol: "Brehme", mejorAsistencia: "Matthäus", mejorAtajada: "Goycochea", masAmarillas: "Argentina", masRojas: "Camerún", sinAmarillasRojas: "Costa Rica", sinRojas: "Irlanda", botaOro: "Schillaci (6 goles)", fairPlay: "Inglaterra", mejorJoven: "Prosinečki", tablaGoleadores: [{ nombre: "Salvatore Schillaci", goles: 6 }, { nombre: "Tomáš Skuhravý", goles: 5 }, { nombre: "Roger Milla", goles: 4 }],
        controversias: "🔴 Camerún eliminó a Argentina en la inauguración con juego durísimo (2 rojas). Argentina llegó a la final con 2 penales en contra en semifinal. Expulsión de Giusti en la final. Polémica por el penal que le dio el título a Alemania.",
        mejoresJugadas: ""
    },
    {
        id: 1994, nombre: "EE.UU. 1994", campeon: "Brasil", subcampeon: "Italia", mejorSeleccion: "Brasil", mejorDt: "Parreira", mejorArbitro: "Puhl", mejorArquero: "Taffarel", mejorDefensa: "Márcio Santos", mejorMediocampo: "Dunga", mejorDelantero: "Romário", mejorGol: "Baggio", mejorAsistencia: "Zinho", mejorAtajada: "Taffarel", masAmarillas: "Italia", masRojas: "Italia", sinAmarillasRojas: "Grecia", sinRojas: "Nigeria", botaOro: "Salenko y Stoichkov (6)", fairPlay: "Brasil", mejorJoven: "Overmars", tablaGoleadores: [{ nombre: "Oleg Salenko", goles: 6 }, { nombre: "Hristo Stoichkov", goles: 6 }, { nombre: "Romário", goles: 5 }],
        controversias: "🔴 Maradona dopado (efedrina) y expulsado del mundial. El penal fallado por Roberto Baggio en la final (tiró por arriba). Calor extremo en Orlando. Además, el asesinato de Andrés Escobar (autogol) al regresar a Colombia.",
        mejoresJugadas: ""
    },
    {
        id: 1998, nombre: "Francia 1998", campeon: "Francia", subcampeon: "Brasil", mejorSeleccion: "Francia", mejorDt: "Jacquet", mejorArbitro: "Belqola", mejorArquero: "Barthez", mejorDefensa: "Thuram", mejorMediocampo: "Zidane", mejorDelantero: "Ronaldo", mejorGol: "Bergkamp", mejorAsistencia: "Beckham", mejorAtajada: "Barthez", masAmarillas: "Argentina", masRojas: "Chile", sinAmarillasRojas: "Jamaica", sinRojas: "Paraguay", botaOro: "Davor Šuker (6 goles)", fairPlay: "Inglaterra", mejorJoven: "Michael Owen", tablaGoleadores: [{ nombre: "Davor Šuker", goles: 6 }, { nombre: "Gabriel Batistuta", goles: 5 }, { nombre: "Christian Vieri", goles: 5 }],
        controversias: "🔴 El misterio de Ronaldo: convulsión horas antes de la final, inicialmente no iba a jugar, pero finalmente fue titular jugando mal. Patrocinadores y Nike presionaron. Beckham expulsado por una patada a Simeone. Argentina-Países Bajos con polémica.",
        mejoresJugadas: ""
    },
    {
        id: 2002, nombre: "Corea/Japón 2002", campeon: "Brasil", subcampeon: "Alemania", mejorSeleccion: "Brasil", mejorDt: "Scolari", mejorArbitro: "Collina", mejorArquero: "Kahn", mejorDefensa: "Roberto Carlos", mejorMediocampo: "Ronaldinho", mejorDelantero: "Ronaldo", mejorGol: "Ronaldinho falta", mejorAsistencia: "Rivaldo", mejorAtajada: "Kahn", masAmarillas: "Alemania", masRojas: "China", sinAmarillasRojas: "Senegal", sinRojas: "Costa Rica", botaOro: "Ronaldo (8 goles)", fairPlay: "Bélgica", mejorJoven: "Landon Donovan", tablaGoleadores: [{ nombre: "Ronaldo", goles: 8 }, { nombre: "Miroslav Klose", goles: 5 }, { nombre: "Rivaldo", goles: 5 }],
        controversias: "🔴 COREA DEL SUR: Robo arbitral contra Italia (gol de Totti anulado, expulsión injusta, gol de Corea en offside) y contra España (dos goles anulados). Árbitro ecuatoriano Moreno señalado. FIFA nunca sancionó.",
        mejoresJugadas: ""
    },
    {
        id: 2006, nombre: "Alemania 2006", campeon: "Italia", subcampeon: "Francia", mejorSeleccion: "Italia", mejorDt: "Lippi", mejorArbitro: "Elizondo", mejorArquero: "Buffon", mejorDefensa: "Cannavaro", mejorMediocampo: "Pirlo", mejorDelantero: "Klose", mejorGol: "Maxi Rodríguez", mejorAsistencia: "Totti", mejorAtajada: "Buffon", masAmarillas: "Portugal", masRojas: "Países Bajos", sinAmarillasRojas: "Angola", sinRojas: "Ucrania", botaOro: "Miroslav Klose (5 goles)", fairPlay: "España", mejorJoven: "Podolski", tablaGoleadores: [{ nombre: "Miroslav Klose", goles: 5 }, { nombre: "Hernán Crespo", goles: 3 }, { nombre: "Ronaldo", goles: 3 }],
        controversias: "🔴 CABEZAZO DE ZIDANE: Zidane golpeó a Materazzi en el pecho en la final, expulsado. Materazzi lo insultó. Italia campeón. Además, la 'Batalla de Núremberg' Portugal-Países Bajos con 4 rojas y 16 amarillas.",
        mejoresJugadas: ""
    },
    {
        id: 2010, nombre: "Sudáfrica 2010", campeon: "España", subcampeon: "Países Bajos", mejorSeleccion: "España", mejorDt: "Del Bosque", mejorArbitro: "Webb", mejorArquero: "Casillas", mejorDefensa: "Puyol", mejorMediocampo: "Xavi", mejorDelantero: "Forlán", mejorGol: "Van Bronckhorst", mejorAsistencia: "Özil", mejorAtajada: "Casillas", masAmarillas: "Países Bajos", masRojas: "Heitinga", sinAmarillasRojas: "Corea del Norte", sinRojas: "Nueva Zelanda", botaOro: "Thomas Müller (5)", fairPlay: "Nueva Zelanda", mejorJoven: "Thomas Müller", tablaGoleadores: [{ nombre: "Thomas Müller", goles: 5 }, { nombre: "David Villa", goles: 5 }, { nombre: "Wesley Sneijder", goles: 5 }],
        controversias: "🔴 FINAL BRUTA: 14 amarillas y 1 roja (Heitinga). Patada de De Jong a Xabi Alonso en el pecho (solo amarilla). Gol de Iniesta en el minuto 116. Polémica por fuera de juego previo. El partido fue una batalla campal.",
        mejoresJugadas: ""
    },
    {
        id: 2014, nombre: "Brasil 2014", campeon: "Alemania", subcampeon: "Argentina", mejorSeleccion: "Alemania", mejorDt: "Löw", mejorArbitro: "Rizzoli", mejorArquero: "Neuer", mejorDefensa: "Hummels", mejorMediocampo: "Kroos", mejorDelantero: "James", mejorGol: "James volea", mejorAsistencia: