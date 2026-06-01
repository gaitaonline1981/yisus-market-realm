export interface PuzzleOption {
  id: string
  text: string
  correct: boolean
  feedback: string
}

export interface TradingPuzzle {
  id: string
  agentId: string
  question: string
  context: string
  options: PuzzleOption[]
  reward: {
    xp: number
    title?: string
    unlockZone?: string
  }
  difficulty: "easy" | "medium" | "hard"
}

export const tradingPuzzles: TradingPuzzle[] = [
  {
    id: "puzzle-analisis-1",
    agentId: "analista-tecnico",
    question: "Ves una vela con mecha superior larga y cuerpo pequeño cerca de una resistencia. ¿Qué indica?",
    context: "Estás analizando un gráfico diario de BTC/USDT.",
    options: [
      { id: "a", text: "Presión compradora fuerte, hay que comprar", correct: false, feedback: "❌ La mecha larga arriba indica que los vendedores rechazaron el precio. Hay presión vendedora, no compradora." },
      { id: "b", text: "Rechazo en resistencia, posible giro bajista", correct: true, feedback: "✅ Correcto. Mecha superior larga + cuerpo pequeño en resistencia = rechazo. Posible entrada corta o esperar confirmación." },
      { id: "c", text: "El mercado está lateral, no significa nada", correct: false, feedback: "❌ Sí significa algo: hay un rechazo evidente en la resistencia. Ignorarlo es perder información valiosa." },
    ],
    reward: { xp: 50, title: "Analista en formación" },
    difficulty: "easy",
  },
  {
    id: "puzzle-analisis-2",
    agentId: "analista-tecnico",
    question: "Se forma un doble suelo en soporte con volumen creciente en el segundo piso. ¿Qué señal es?",
    context: "Estás revisando un par de Forex en temporalidad H4.",
    options: [
      { id: "a", text: "Señal de continuación bajista", correct: false, feedback: "❌ El doble suelo es un patrón de agotamiento bajista, no de continuación. Indica posible giro alcista." },
      { id: "b", text: "Posible giro alcista con volumen de confirmación", correct: true, feedback: "✅ Exacto. Doble suelo + volumen creciente en el segundo mínimo = acumulación. Señal de compra con stop debajo del soporte." },
      { id: "c", text: "El patrón no es válido sin Fibonacci", correct: false, feedback: "❌ El doble suelo es válido por sí mismo. Fibonacci es una herramienta adicional, no un requisito." },
    ],
    reward: { xp: 60, title: "Analista en formación" },
    difficulty: "easy",
  },
  {
    id: "puzzle-wyckoff-1",
    agentId: "wyckoff",
    question: "En el ciclo de Wyckoff, después de la fase de acumulación (ACC) viene una prueba (test). Si la prueba falla, ¿qué significa?",
    context: "Estás identificando las fases de Wyckoff en un gráfico de índices.",
    options: [
      { id: "a", text: "La acumulación fue exitosa, el precio subirá", correct: false, feedback: "❌ Si la prueba falla, significa que todavía hay oferta. La acumulación no está completa." },
      { id: "b", text: "Todavía hay oferta, la acumulación no terminó", correct: true, feedback: "✅ Correcto. Una prueba fallida indica que los vendedores siguen presentes. Hay que esperar otra fase de acumulación." },
      { id: "c", text: "Es señal de distribucion, hay que vender", correct: false, feedback: "❌ Todavía no es distribución. Es simplemente que la acumulación necesita más tiempo. No confundir con una fase de distribución." },
    ],
    reward: { xp: 80, title: "Aprendiz de Wyckoff" },
    difficulty: "medium",
  },
  {
    id: "puzzle-wyckoff-2",
    agentId: "wyckoff",
    question: "Ves un Spring con volumen bajo y el precio cierra cerca del máximo de la vela. ¿Qué indica en el ciclo de Wyckoff?",
    context: "Analizando un gráfico diario buscando señales de compra.",
    options: [
      { id: "a", text: "Es una señal de distribución", correct: false, feedback: "❌ El Spring es señal de acumulación, no de distribución. Ocurre en la fase de acumulación." },
      { id: "b", text: "Señal de que los vendedores perdieron fuerza, posible compra", correct: true, feedback: "✅ Correcto. Spring con volumen bajo + cierre fuerte = los vendedores no pudieron sostener la bajada. Señal de compra temprana." },
      { id: "c", text: "Hay que esperar un UTAD para confirmar", correct: false, feedback: "❌ El UTAD (Upthrust After Distribution) es parte de la distribución, no de la acumulación. Son fases opuestas del ciclo." },
    ],
    reward: { xp: 100, title: "Cazador de Springs" },
    difficulty: "medium",
  },
  {
    id: "puzzle-elliott-1",
    agentId: "elliott",
    question: "Completaste una onda 1, 2 y 3 de Elliott. La onda 3 fue la más larga. ¿Qué esperás en la onda 4?",
    context: "Estás contando ondas en un gráfico de 15 minutos.",
    options: [
      { id: "a", text: "Onda 4 debe ser más corta que onda 2", correct: false, feedback: "❌ En Elliott no hay regla que compare longitud de 2 vs 4. Lo que sí: onda 4 NO debe entrar en precio de onda 1." },
      { id: "b", text: "Onda 4 no debe entrar en el precio de la onda 1", correct: true, feedback: "✅ Correcto. Regla de Elliott: onda 4 nunca debe superponerse con onda 1. Si lo hace, el conteo es inválido." },
      { id: "c", text: "Onda 4 debe ser igual a onda 2 en longitud", correct: false, feedback: "❌ No existe esa regla. Las ondas correctivas (2 y 4) pueden ser muy diferentes en forma y duración." },
    ],
    reward: { xp: 80, title: "Contador de Ondas" },
    difficulty: "medium",
  },
  {
    id: "puzzle-liquidez-1",
    agentId: "liquidez",
    question: "El precio está barriendo un mínimo anterior con una vela de alta volatilidad. ¿Qué está haciendo el mercado?",
    context: "Observás el order book en tiempo real durante una sesión de alta liquidez.",
    options: [
      { id: "a", text: "Está yendo a buscar liquidez para seguir subiendo", correct: true, feedback: "✅ Exacto. Barrer mínimos = buscar stops de largos. El mercado busca liquidez para impulsarse en la dirección contraria." },
      { id: "b", text: "Está rompiendo soporte, hay que vender", correct: false, feedback: "❌ No es ruptura genuina si es con alta volatilidad y el precio vuelve rápido. Es un barrido de liquidez." },
      { id: "c", text: "El mercado está manipulando para asustar compradores", correct: false, feedback: "❌ No es manipulación, es un movimiento técnico normal. Los barridos de liquidez son parte natural del mercado." },
    ],
    reward: { xp: 70, title: "Rastreador de Liquidez" },
    difficulty: "medium",
  },
  {
    id: "puzzle-noticias-1",
    agentId: "noticias",
    question: "La FED sube tasas de interés 75 puntos básicos, más de lo esperado. ¿Qué impacto esperás en los mercados?",
    context: "Estás siguiendo la agenda macro semanal.",
    options: [
      { id: "a", text: "Suben las criptos porque los inversores buscan riesgo", correct: false, feedback: "❌ Cuando la FED sube tasas, el dólar se fortalece y los activos de riesgo (incluyendo criptos) tienden a caer." },
      { id: "b", text: "El dólar se fortalece, caen activos de riesgo", correct: true, feedback: "✅ Correcto. Tasas más altas → dólar más fuerte → activos de riesgo (bolsas, criptos, commodities) presionados a la baja." },
      { id: "c", text: "No afecta porque las criptos están descentralizadas", correct: false, feedback: "❌ Las criptos no están aisladas del macro. Bitcoin correlaciona fuertemente con liquidez global y tasas de interés." },
    ],
    reward: { xp: 60, title: "Lector de Contexto Macro" },
    difficulty: "easy",
  },
  {
    id: "puzzle-riesgo-1",
    agentId: "riesgo",
    question: "Tenés $10,000 y querés arriesgar máximo 2% por operación. ¿Cuánto es tu riesgo máximo en dólares?",
    context: "Estás configurando tu plan de trading antes de empezar.",
    options: [
      { id: "a", text: "$200 por operación", correct: true, feedback: "✅ Correcto. 2% de $10,000 = $200. Es una regla clásica de gestión de riesgo." },
      { id: "b", text: "$500 por operación", correct: false, feedback: "❌ Eso sería 5% por operación. Demasiado riesgo para una cuenta de este tamaño." },
      { id: "c", text: "$50 por operación", correct: false, feedback: "❌ Sería 0.5%. Es conservador pero no máximo. La pregunta era el máximo (2%)." },
    ],
    reward: { xp: 40, title: "Calculador de Riesgo" },
    difficulty: "easy",
  },
  {
    id: "puzzle-comunidad-1",
    agentId: "comunidad",
    question: "Un miembro del gremio publica una señal de compra sin stop loss. ¿Cuál es la mejor respuesta?",
    context: "Estás en el chat de la comunidad de traders.",
    options: [
      { id: "a", text: "Entrar igual porque confiás en el miembro", correct: false, feedback: "❌ Nunca operar sin stop loss. La confianza no remplaza la gestión de riesgo." },
      { id: "b", text: "Preguntar por el stop loss y compartir análisis propio", correct: true, feedback: "✅ Correcto. La comunidad es para compartir ideas, no para seguir ciegamente. Siempre preguntar por el plan completo." },
      { id: "c", text: "Reportar al miembro con los admins", correct: false, feedback: "❌ No es necesario reportar. Mejor educar con respeto: todos aprendemos." },
    ],
    reward: { xp: 30, title: "Miembro del Gremio" },
    difficulty: "easy",
  },
  {
    id: "puzzle-analisis-3",
    agentId: "analista-tecnico",
    question: "El RSI está en 75 y el precio está en una resistencia clave. ¿Qué indica esta combinación?",
    context: "Estás usando RSI como filtro de confirmación.",
    options: [
      { id: "a", text: "Sobrecompra, probable reversión bajista", correct: true, feedback: "✅ Correcto. RSI > 70 = sobrecompra. Si además está en resistencia, hay alta probabilidad de rechazo." },
      { id: "b", text: "Sobreventa, hay que comprar", correct: false, feedback: "❌ RSI 75 es sobrecompra, no sobreventa. El umbral de sobreventa es RSI < 30." },
      { id: "c", text: "El RSI no sirve en tendencia fuerte", correct: false, feedback: "❌ El RSI sí sirve, pero hay que usarlo con contexto. En tendencia fuerte puede mantenerse sobrecomprado." },
    ],
    reward: { xp: 60 },
    difficulty: "medium",
  },
  {
    id: "puzzle-elliott-2",
    agentId: "elliott",
    question: "En una onda correctiva ABC, si la onda C es igual en longitud a la onda A, ¿cómo se llama este patrón?",
    context: "Estás identificando patrones de ondas correctivas.",
    options: [
      { id: "a", text: "Zigzag", correct: true, feedback: "✅ Correcto. Un zigzag es una corrección ABC donde C ≈ A en longitud. Es el patrón correctivo más común." },
      { id: "b", text: "Flat", correct: false, feedback: "❌ En un flat, ABC son aproximadamente iguales, pero con estructura 3-3-5, no 5-3-5 como el zigzag." },
      { id: "c", text: "Triángulo", correct: false, feedback: "❌ Los triángulos tienen 5 ondas (ABCDE), no 3 (ABC). Son patrones de consolidación." },
    ],
    reward: { xp: 100 },
    difficulty: "medium",
  },
  {
    id: "puzzle-elliott-3",
    agentId: "elliott",
    question: "Después de una extensión en onda 3, ¿qué característica suele tener la onda 5?",
    context: "Analizando un impulso de 5 ondas.",
    options: [
      { id: "a", text: "Onda 5 suele ser la más corta o con divergencia", correct: true, feedback: "✅ Correcto. Cuando la 3 se extiende, la 5 suele ser más corta y a menudo muestra divergencia en RSI/MACD." },
      { id: "b", text: "Onda 5 debe ser igual a onda 1", correct: false, feedback: "❌ No hay regla que exija igualdad. Solo se requiere que la 5 supere el final de la 3." },
      { id: "c", text: "Onda 5 siempre falla (truncation)", correct: false, feedback: "❌ La truncación (onda 5 que no supera onda 3) no es obligatoria. Es una variante, no una regla." },
    ],
    reward: { xp: 120 },
    difficulty: "hard",
  },
  {
    id: "puzzle-liquidez-2",
    agentId: "liquidez",
    question: "Ves una vela alcista grande que rompe un máximo anterior pero cierra cerca del mínimo de la vela. ¿Qué indica?",
    context: "Analizando posibles falsas rupturas en el order book.",
    options: [
      { id: "a", text: "Ruptura válida, hay que comprar", correct: false, feedback: "❌ Si la vela cierra cerca de su mínimo, los vendedores recuperaron control. Es señal de trampa, no ruptura." },
      { id: "b", text: "Falsa ruptura (breakout falso), barrido de stops largos", correct: true, feedback: "✅ Exacto. Una vela que rompe máximos pero cierra abajo es un barrido de stops. El mercado fue por liquidez arriba y se devolvió." },
      { id: "c", text: "Indecisión del mercado, hay que esperar", correct: false, feedback: "❌ No es indecisión. Es un movimiento direccional claro: fueron a buscar liquidez arriba y la encontraron." },
    ],
    reward: { xp: 80 },
    difficulty: "medium",
  },
  {
    id: "puzzle-liquidez-3",
    agentId: "liquidez",
    question: "En un rango lateral, el precio toca el soporte 3 veces sin romperlo. ¿Qué está acumulando el mercado?",
    context: "Observás un par en rango de 4 horas.",
    options: [
      { id: "a", text: "Liquidez para romper el soporte a la baja", correct: true, feedback: "✅ Correcto. Cada vez que toca soporte, se llenan stops de compradores. El mercado acumula órdenes para una ruptura." },
      { id: "b", text: "Liquidez para subir porque el soporte aguanta", correct: false, feedback: "❌ Si el soporte aguanta, los stops están debajo. El mercado va a buscarlos antes de subir." },
      { id: "c", text: "El mercado está inactivo, no va a pasar nada", correct: false, feedback: "❌ El mercado nunca está inactivo. Está acumulando órdenes. Algo va a pasar." },
    ],
    reward: { xp: 90 },
    difficulty: "medium",
  },
  {
    id: "puzzle-noticias-2",
    agentId: "noticias",
    question: "Se publica un dato de inflación (CPI) por debajo de lo esperado. ¿Qué impacto suele tener en los mercados?",
    context: "Estás siguiendo la agenda macro semanal.",
    options: [
      { id: "a", text: "Posible subida de bolsas y bajada del dólar", correct: true, feedback: "✅ Correcto. Inflación baja → menos presión para subir tasas → dólar débil → subida de activos de riesgo." },
      { id: "b", text: "Caída de todo porque la economía se debilita", correct: false, feedback: "❌ Inflación baja no es necesariamente mala. Puede indicar que la FED no necesita seguir subiendo tasas." },
      { id: "c", text: "No afecta porque el mercado ya lo descontó", correct: false, feedback: "❌ Aunque parte esté descontado, una sorpresa significativa siempre mueve el mercado en el corto plazo." },
    ],
    reward: { xp: 70 },
    difficulty: "medium",
  },
  {
    id: "puzzle-noticias-3",
    agentId: "noticias",
    question: "El desempleo sube inesperadamente. ¿Qué señal es para la FED y los mercados?",
    context: "Analizando datos de empleo mensuales.",
    options: [
      { id: "a", text: "La FED podría pausar subidas de tasas, posible rebote en bolsas", correct: true, feedback: "✅ Correcto. Desempleo alto → economía débil → FED menos agresiva → mercados pueden reaccionar positivamente." },
      { id: "b", text: "Pánico en los mercados, caída generalizada", correct: false, feedback: "❌ Depende del contexto. A veces malas noticias macro son buenas para los mercados si implican política monetaria más laxa." },
      { id: "c", text: "El dólar se fortalece por incertidumbre", correct: false, feedback: "❌ Generalmente el dólar se debilita con datos de empleo débiles, porque la economía pierde tracción." },
    ],
    reward: { xp: 80 },
    difficulty: "medium",
  },
  {
    id: "puzzle-riesgo-2",
    agentId: "riesgo",
    question: "Tu stop loss fue activado y la operación terminó en pérdida. ¿Cuál es el mejor siguiente paso?",
    context: "Revisando una operación fallida.",
    options: [
      { id: "a", text: "Volver a entrar inmediatamente para recuperar la pérdida", correct: false, feedback: "❌ Esto se llama 'revenge trading' y es la forma más rápida de perder más. Nunca operar emocionalmente." },
      { id: "b", text: "Revisar la operación, aprender y esperar la próxima oportunidad", correct: true, feedback: "✅ Correcto. El stop loss está para eso. Analizar qué salió mal y esperar la siguiente señal." },
      { id: "c", text: "Duplicar la apuesta para recuperar más rápido", correct: false, feedback: "❌ Duplicar después de una pérdida es sobreapalancamiento emocional. Es una de las causas principales de quiebra de traders." },
    ],
    reward: { xp: 50 },
    difficulty: "easy",
  },
  {
    id: "puzzle-riesgo-3",
    agentId: "riesgo",
    question: "Tu cuenta bajó 8% en el mes. ¿Qué deberías hacer?",
    context: "Revisando tu reporte mensual de trading.",
    options: [
      { id: "a", text: "Seguí operando normal porque 8% no es tanto", correct: false, feedback: "❌ 8% mensual es mucho. Si repetís 8% por 12 meses, perdés más de la mitad de tu cuenta." },
      { id: "b", text: "Reducir tamaño de posición hasta volver a consistencia", correct: true, feedback: "✅ Correcto. Cuando estás en drawdown, reducí tamaño. La prioridad es proteger el capital restante." },
      { id: "c", text: "Cambiar de estrategia completamente", correct: false, feedback: "❌ No necesariamente. Una racha mala no significa que la estrategia esté mal. Reducí tamaño y evaluá con más datos." },
    ],
    reward: { xp: 70, title: "Gestor de Riesgo" },
    difficulty: "medium",
  },
  {
    id: "puzzle-comunidad-2",
    agentId: "comunidad",
    question: "Un trader novato pregunta en el chat qué es un stop loss. ¿Cómo respondés?",
    context: "Estás en el canal de bienvenida de la comunidad.",
    options: [
      { id: "a", text: "Orden que cierra automáticamente una operación si el precio llega a cierto nivel para limitar pérdidas", correct: true, feedback: "✅ Correcto. Explicación clara y útil para un novato." },
      { id: "b", text: "Buscá en Google", correct: false, feedback: "❌ No ayuda a construir comunidad. Responder con respeto fortalece el grupo." },
      { id: "c", text: "No uses stop loss porque te van a cazar los stops", correct: false, feedback: "❌ Esto es un mito peligroso. Para un novato, el stop loss es esencial. La caza de stops es un concepto más avanzado." },
    ],
    reward: { xp: 30 },
    difficulty: "easy",
  },
  {
    id: "puzzle-comunidad-3",
    agentId: "comunidad",
    question: "Organizás un evento semanal de análisis de mercado. ¿Qué formato elegís?",
    context: "Estás planeando actividades para la comunidad.",
    options: [
      { id: "a", text: "Cada uno comparte un gráfico y entre todos lo analizan", correct: true, feedback: "✅ Correcto. Actividades colaborativas donde todos participan fortalecen la comunidad." },
      { id: "b", text: "Solo los admins dan señales y los demás escuchan", correct: false, feedback: "❌ Eso crea dependencia y no educa a la comunidad. El objetivo es que todos aprendan." },
      { id: "c", text: "Competencia de quién gana más en la semana", correct: false, feedback: "❌ Las competencias de ganancias fomentan malas prácticas y riesgo excesivo." },
    ],
    reward: { xp: 40, title: "Líder Comunitario" },
    difficulty: "easy",
  },
]

export function getPuzzlesByAgent(agentId: string): TradingPuzzle[] {
  return tradingPuzzles.filter((p) => p.agentId === agentId)
}

export function getPuzzleById(id: string): TradingPuzzle | undefined {
  return tradingPuzzles.find((p) => p.id === id)
}
