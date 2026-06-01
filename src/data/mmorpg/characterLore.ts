import type { CharacterLore } from "@/types/mmorpg"

export const characterLores: Record<string, CharacterLore> = {
  ticker: {
    short: "Ticker es el piloto más veloz del Market Realm. Entra, ejecuta y desaparece antes de que el mercado lo atrape.",
    full: "Nacido en los circuitos rápidos de la Arena Scalper, Ticker aprendió a leer micro-movimientos, impulsos cortos y cambios repentinos de liquidez. Su visor cian procesa señales en milisegundos y su hover pod le permite moverse entre velas como si fueran calles de neón. Aunque parece travieso y gracioso, su fortaleza está en la precisión: no busca operar todo, solo los momentos donde la velocidad y el timing se alinean.",
    origin: "Creado en los hangares del Laboratorio Yisus para detectar oportunidades rápidas sin caer en FOMO.",
    tradingPhilosophy: "La velocidad solo sirve cuando existe confirmación, plan y salida definida.",
    catchphrase: "Rápido no es apurado. Rápido es preciso.",
  },
  hedgey: {
    short: "Hedgey es el escudo del Market Realm. Protege capital, controla riesgos y nunca abandona a su gremio.",
    full: "Forjado en los hornos de la Risk Citadel, Hedgey aprendió que proteger el capital es más importante que multiplicarlo. Su armadura plateada reflecta las órdenes de stop loss, su capa dorada simboliza la disciplina de no sobre-operar, y su escudo de riesgo absorbe las pérdidas del equipo. No es el más rápido ni el más creativo, pero cuando el mercado colapsa, Hedgey sigue en pie.",
    origin: "Hedgey fue el primero en entender que un trader sin control de riesgo es un barco sin timón. Nació en la Risk Citadel, donde los caballeros aprenden a defender el capital antes que a multiplicarlo.",
    tradingPhilosophy: "Ganar es bueno. No perder es mejor.",
    catchphrase: "Un stop loss bien puesto salva más que un take profit.",
  },
  slyde: {
    short: "Slyde se mueve en las sombras del order book. Donde otros ven ruido, él ve liquidez.",
    full: "Slyde emergió de las profundidades del Order Book, donde las órdenes descansan como trampas silenciosas. Su pelaje oscuro se funde con las zonas de baja liquidez y sus ojos felinos perforan los niveles de stop loss ocultos. No ataca frontalmente — espera, observa, y cuando el mercado revela su mano, Slyde ya está dentro. Su token de liquidez brilla solo cuando detecta un movimiento de alta probabilidad.",
    origin: "Nacido en las sombras del Order Book, Slyde aprendió a leer stops, trampas y zonas de liquidez oculta.",
    tradingPhilosophy: "La liquidez siempre deja rastro. Solo hay que saber mirar.",
    catchphrase: "Donde todos miran, yo ya me fui.",
  },
  maci: {
    short: "Maci explora el mundo en busca de contexto macro. Sus ojos ven lo que las velas no muestran.",
    full: "Maci recorrió los mapas macroeconómicos de la Biblioteca de Ciclos, aprendiendo a leer correlaciones entre activos, flujos de capital y ciclos globales. Su mochila contiene datos de todos los mercados del mundo, y su orbe macro proyecta tendencias que ningún trader común puede ver. Para Maci, operar sin contexto es como navegar sin brújula — por eso nunca cruza un mercado sin entender primero el clima global.",
    origin: "Creció explorando mapas macroeconómicos en la Biblioteca de Ciclos del Market Realm.",
    tradingPhilosophy: "El contexto lo es todo. Una vela no dice nada sin su entorno.",
    catchphrase: "El gráfico más importante no tiene velas: es el mundo.",
  },
  volumax: {
    short: "Volumax se alimenta de volumen. Cuando el mercado tiembla, él sonríe.",
    full: "Volumax emergió de los picos de volumen más violentos jamás registrados. Su cuerpo imponente absorbe la liquidez institucional como combustible, y su martillo dorado rompe resistencias con un solo golpe. No entiende de velas bajistas ni alcistas — solo de volumen. Si hay movimiento, Volumax está ahí. Si no hay volumen, espera. Su rugido atrae a todo el gremio, señalando que es momento de actuar.",
    origin: "Emergió de los picos de volumen más violentos del mercado, alimentándose de liquidez institucional.",
    tradingPhilosophy: "El volumen no miente. Cuando habla, escucho.",
    catchphrase: "Si no hay volumen, no hay batalla.",
  },
  waven: {
    short: "Waven cabalga las ondas del mercado con la gracia de una bailarina celestial.",
    full: "Waven estudió en las Torres Flotantes de Elliott, donde las ondas del mercado susurran secretos a quienes saben escuchar. Su túnica de seda blanca fluye con las tendencias, y sus ojos de cristal reflejan los patrones armónicos que el ojo común no percibe. No fuerza el mercado — lo baila. Sabe que las olas suben y bajan, y que la clave está en surfear, no en remar contra la corriente.",
    origin: "Aprendió a leer las ondas del mercado en las Torres Flotantes de Elliott, donde las olas susurran secretos.",
    tradingPhilosophy: "El mercado se mueve en ondas, no en líneas rectas.",
    catchphrase: "La tendencia es tu amiga... hasta que deja de serlo.",
  },
  sproket: {
    short: "Sproket es precisión hecha máquina. No opera sin datos, no decide sin backtest.",
    full: "Ensamblado pieza por pieza en la Fábrica de Estrategias Cuantitativas, Sproket es el trader más metódico del Market Realm. Sus brazos múltiples ejecutan análisis simultáneos, su cabeza procesadora corre simulaciones de Monte Carlo, y su herramienta de análisis escanea el mercado en busca de patrones estadísticamente significativos. No cree en la intuición — cree en los datos. Para Sproket, cada operación debe estar respaldada por evidencia.",
    origin: "Fue ensamblado en la Fábrica de Estrategias Cuantitativas, donde cada engranaje es una variable de mercado.",
    tradingPhilosophy: "Un sistema sin backtesting es un arma sin seguro.",
    catchphrase: "Datos, no emociones.",
  },
  flipper: {
    short: "Flipper revuelve el mercado buscando tesoros escondidos. Su suerte es su mejor estrategia.",
    full: "Flipper nació en los mercados secundarios más oscuros del Market Realm, donde los activos olvidados esperan ser redescubiertos. Con su máscara de bandido y su bolsa de loot siempre lista, Flipper husmea entre micro-cap, criptos abandonadas y pares exóticos que nadie más mira. No sigue tendencias — las descubre. Su cola esponjosa se agita cuando encuentra una oportunidad infravalorada, y su olfato para gangas es legendario.",
    origin: "Nació en los mercados secundarios, revolviendo entre activos olvidados en busca de tesoros escondidos.",
    tradingPhilosophy: "La suerte se busca. No llega sola.",
    catchphrase: "Lo que otros tiran, yo lo colecciono.",
  },
}
