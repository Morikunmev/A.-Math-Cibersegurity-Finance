// Datos de ángulos comunes
const commonAngles = [0, 30, 45, 60, 90];

// Estado de visualización
let showState = {
  alpha: true,
  beta: true
};

// Función para convertir grados a radianes
const toRad = (deg) => (deg * Math.PI) / 180;

// Función para formatear números
const fmt = (num) => Math.abs(num) < 0.0001 ? '0' : num.toFixed(4);

// Función para alternar visualización de ángulos
function toggleAngle(mode) {
  const btnAlpha = document.getElementById('showAlpha');
  const btnBeta = document.getElementById('showBeta');
  const btnBoth = document.getElementById('showBoth');
  
  // Resetear todos los botones
  btnAlpha.className = 'py-2 px-3 rounded-lg bg-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-400 transition-all active:scale-95 shadow-md';
  btnBeta.className = 'py-2 px-3 rounded-lg bg-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-400 transition-all active:scale-95 shadow-md';
  btnBoth.className = 'py-2 px-3 rounded-lg bg-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-400 transition-all active:scale-95 shadow-md';
  
  // Activar el botón seleccionado y actualizar estado
  if (mode === 'alpha') {
    showState.alpha = true;
    showState.beta = false;
    btnAlpha.className = 'py-2 px-3 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all active:scale-95 shadow-md';
    btnAlpha.innerHTML = '✓ Ángulo α';
    btnBeta.innerHTML = 'Ángulo β';
    btnBoth.innerHTML = 'Ambos';
  } else if (mode === 'beta') {
    showState.alpha = false;
    showState.beta = true;
    btnBeta.className = 'py-2 px-3 rounded-lg bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 transition-all active:scale-95 shadow-md';
    btnAlpha.innerHTML = 'Ángulo α';
    btnBeta.innerHTML = '✓ Ángulo β';
    btnBoth.innerHTML = 'Ambos';
  } else {
    showState.alpha = true;
    showState.beta = true;
    btnBoth.className = 'py-2 px-3 rounded-lg bg-green-600 text-white font-bold text-sm hover:bg-green-700 transition-all active:scale-95 shadow-md';
    btnAlpha.innerHTML = 'Ángulo α';
    btnBeta.innerHTML = 'Ángulo β';
    btnBoth.innerHTML = '✓ Ambos';
  }
  
  // Actualizar visualización
  const currentAngle = document.getElementById('angleSlider').value;
  updateVisualization(currentAngle);
}

// Función principal de actualización
function updateVisualization(angle) {
  const alpha = parseFloat(angle);
  const beta = 90 - alpha;
  
  document.getElementById('currentAngle').textContent = `${alpha}°`;
  
  // Actualizar círculo unitario
  updateUnitCircle(alpha, beta);
  
  // Actualizar panel de demostración
  updateDemoPanel(alpha, beta);
  
  // Actualizar tabla de valores
  updateValuesTable();
}

// Actualizar el círculo unitario
function updateUnitCircle(alpha, beta) {
  const radAlpha = toRad(alpha);
  const radBeta = toRad(beta);
  
  const x1 = Math.cos(radAlpha) * 180;
  const y1 = -Math.sin(radAlpha) * 180;
  
  const x2 = Math.cos(radBeta) * 180;
  const y2 = -Math.sin(radBeta) * 180;
  
  const pointsGroup = document.getElementById('pointsGroup');
  
  let svgContent = '';
  
  // Mostrar ángulo α si está activado
  if (showState.alpha) {
    svgContent += `
      <!-- Punto para α -->
      <line x1="0" y1="0" x2="${x1}" y2="${y1}" stroke="#2563eb" stroke-width="5" />
      <circle cx="${x1}" cy="${y1}" r="8" fill="#2563eb" stroke="#1e40af" stroke-width="3" />
      
      <!-- Proyecciones para α -->
      <line x1="${x1}" y1="${y1}" x2="${x1}" y2="0" stroke="#dc2626" stroke-width="3" stroke-dasharray="5,5" opacity="0.7" />
      <line x1="0" y1="0" x2="${x1}" y2="0" stroke="#16a34a" stroke-width="3" stroke-dasharray="5,5" opacity="0.7" />
      
      <!-- Etiquetas para α -->
      <text x="${x1 + 20}" y="${y1 - 10}" fill="#2563eb" font-size="18" font-weight="900" class="angle-label">
        α = ${alpha}°
      </text>
      <text x="${x1 + (x1 > 0 ? 15 : -40)}" y="${y1/2 + 5}" fill="#dc2626" font-size="14" font-weight="700">
        sin(α)
      </text>
      <text x="${x1/2}" y="${y1 > -20 ? 20 : -10}" fill="#16a34a" font-size="14" font-weight="700">
        cos(α)
      </text>
      
      <!-- Arco para α -->
      <path d="M ${Math.cos(0) * 50} ${-Math.sin(0) * 50} 
               A 50 50 0 ${alpha > 180 ? 1 : 0} 1 
               ${Math.cos(radAlpha) * 50} ${-Math.sin(radAlpha) * 50}" 
            fill="none" stroke="#2563eb" stroke-width="2.5" opacity="0.6" />
    `;
  }
  
  // Mostrar ángulo β si está activado
  if (showState.beta && beta >= 0 && beta <= 90) {
    svgContent += `
      <!-- Punto para β (90° - α) -->
      <line x1="0" y1="0" x2="${x2}" y2="${y2}" stroke="#7c3aed" stroke-width="5" opacity="0.6" />
      <circle cx="${x2}" cy="${y2}" r="8" fill="#7c3aed" stroke="#6d28d9" stroke-width="3" />
      
      <!-- Proyecciones para β -->
      <line x1="${x2}" y1="${y2}" x2="${x2}" y2="0" stroke="#ea580c" stroke-width="3" stroke-dasharray="5,5" opacity="0.5" />
      <line x1="0" y1="0" x2="${x2}" y2="0" stroke="#0891b2" stroke-width="3" stroke-dasharray="5,5" opacity="0.5" />
      
      <!-- Etiquetas para β -->
      <text x="${x2 - 20}" y="${y2 - 10}" fill="#7c3aed" font-size="18" font-weight="900" class="angle-label">
        β = ${beta}°
      </text>
      <text x="${x2 + (x2 > 0 ? 15 : -55)}" y="${y2/2 + 5}" fill="#ea580c" font-size="14" font-weight="700">
        sin(β)
      </text>
      <text x="${x2/2}" y="${y2 > -20 ? 20 : -10}" fill="#0891b2" font-size="14" font-weight="700">
        cos(β)
      </text>
      
      <!-- Arco para β -->
      <path d="M ${Math.cos(0) * 70} ${-Math.sin(0) * 70} 
               A 70 70 0 0 1 
               ${Math.cos(radBeta) * 70} ${-Math.sin(radBeta) * 70}" 
            fill="none" stroke="#7c3aed" stroke-width="2.5" opacity="0.4" />
    `;
  }
  
  pointsGroup.innerHTML = svgContent;
}

// Actualizar panel de demostración
function updateDemoPanel(alpha, beta) {
  const radAlpha = toRad(alpha);
  const radBeta = toRad(beta);
  
  const sinAlpha = Math.sin(radAlpha);
  const cosAlpha = Math.cos(radAlpha);
  const sinBeta = Math.sin(radBeta);
  const cosBeta = Math.cos(radBeta);
  const tanAlpha = Math.tan(radAlpha);
  const cotBeta = alpha === 0 ? Infinity : 1 / Math.tan(radBeta);
  
  const demoPanel = document.getElementById('demoPanel');
  
  demoPanel.innerHTML = `
    <h2 class="text-3xl font-black text-purple-900 mb-4 text-center">
      🔬 DEMOSTRACIÓN EN TIEMPO REAL
    </h2>
    
    <!-- Relación de Ángulos -->
    <div class="bg-white rounded-xl p-4 mb-4 border-2 border-purple-200 shadow-lg">
      <p class="font-black text-purple-600 text-xs mb-2">ÁNGULOS COMPLEMENTARIOS</p>
      <div class="text-center">
        <span class="text-3xl font-black text-blue-600">α = ${alpha}°</span>
        <span class="text-2xl mx-4">+</span>
        <span class="text-3xl font-black text-purple-600">β = ${beta}°</span>
        <span class="text-2xl mx-4">=</span>
        <span class="text-3xl font-black text-green-600">90°</span>
      </div>
    </div>
    
    <!-- Demostración 1: sin(α) = cos(β) -->
    <div class="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 mb-4 border-2 border-red-200 shadow-lg">
      <p class="font-black text-red-700 text-sm mb-3">
        📐 IDENTIDAD 1: sin(90° - α) = cos(α)
      </p>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white p-3 rounded-lg border-2 border-red-300">
          <p class="text-xs font-bold text-gray-600 mb-1">sin(α)</p>
          <p class="text-2xl font-black text-red-600">${fmt(sinAlpha)}</p>
        </div>
        <div class="bg-white p-3 rounded-lg border-2 border-orange-300">
          <p class="text-xs font-bold text-gray-600 mb-1">cos(90° - α) = cos(${beta}°)</p>
          <p class="text-2xl font-black text-orange-600">${fmt(cosBeta)}</p>
        </div>
      </div>
      <div class="mt-3 text-center">
        <span class="inline-block px-4 py-2 bg-green-500 text-white font-black rounded-lg shadow-md">
          ${Math.abs(sinAlpha - cosBeta) < 0.0001 ? '✓ ¡IGUALES!' : '≈ Casi iguales'}
        </span>
      </div>
    </div>
    
    <!-- Demostración 2: cos(α) = sin(β) -->
    <div class="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-4 mb-4 border-2 border-green-200 shadow-lg">
      <p class="font-black text-green-700 text-sm mb-3">
        📐 IDENTIDAD 2: cos(90° - α) = sin(α)
      </p>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white p-3 rounded-lg border-2 border-green-300">
          <p class="text-xs font-bold text-gray-600 mb-1">cos(α)</p>
          <p class="text-2xl font-black text-green-600">${fmt(cosAlpha)}</p>
        </div>
        <div class="bg-white p-3 rounded-lg border-2 border-teal-300">
          <p class="text-xs font-bold text-gray-600 mb-1">sin(90° - α) = sin(${beta}°)</p>
          <p class="text-2xl font-black text-teal-600">${fmt(sinBeta)}</p>
        </div>
      </div>
      <div class="mt-3 text-center">
        <span class="inline-block px-4 py-2 bg-green-500 text-white font-black rounded-lg shadow-md">
          ${Math.abs(cosAlpha - sinBeta) < 0.0001 ? '✓ ¡IGUALES!' : '≈ Casi iguales'}
        </span>
      </div>
    </div>
    
    <!-- Demostración 3: tan(α) = cot(β) -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200 shadow-lg">
      <p class="font-black text-blue-700 text-sm mb-3">
        📐 IDENTIDAD 3: tan(90° - α) = cot(α)
      </p>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white p-3 rounded-lg border-2 border-blue-300">
          <p class="text-xs font-bold text-gray-600 mb-1">tan(α)</p>
          <p class="text-2xl font-black text-blue-600">${alpha === 90 ? '∞' : fmt(tanAlpha)}</p>
        </div>
        <div class="bg-white p-3 rounded-lg border-2 border-indigo-300">
          <p class="text-xs font-bold text-gray-600 mb-1">cot(${beta}°)</p>
          <p class="text-2xl font-black text-indigo-600">${beta === 0 ? '∞' : fmt(cotBeta)}</p>
        </div>
      </div>
      <div class="mt-3 text-center">
        <span class="inline-block px-4 py-2 bg-green-500 text-white font-black rounded-lg shadow-md">
          ${Math.abs(tanAlpha - cotBeta) < 0.0001 || (alpha === 90 && beta === 0) ? '✓ ¡IGUALES!' : '≈ Casi iguales'}
        </span>
      </div>
    </div>
    
    <!-- Explicación Visual -->
    <div class="bg-gray-900 text-white rounded-xl p-4 mt-4">
      <p class="text-xs font-black text-yellow-400 mb-2">💡 ¿POR QUÉ FUNCIONA?</p>
      <p class="text-sm leading-relaxed">
        En un triángulo rectángulo, el <strong class="text-red-400">cateto opuesto</strong> a α 
        es el mismo que el <strong class="text-green-400">cateto adyacente</strong> a β. 
        Por eso sus funciones trigonométricas se "intercambian".
      </p>
    </div>
  `;
}

// Actualizar tabla de valores
function updateValuesTable() {
  const angles = [0, 30, 45, 60, 90];
  const tbody = document.getElementById('valuesTable');
  
  tbody.innerHTML = angles.map(alpha => {
    const beta = 90 - alpha;
    const radAlpha = toRad(alpha);
    const radBeta = toRad(beta);
    
    const sinAlpha = fmt(Math.sin(radAlpha));
    const cosAlpha = fmt(Math.cos(radAlpha));
    const sinBeta = fmt(Math.sin(radBeta));
    const cosBeta = fmt(Math.cos(radBeta));
    
    return `
      <tr class="hover:bg-green-50 transition-colors">
        <td class="p-2 border font-bold text-blue-600">${alpha}°</td>
        <td class="p-2 border font-bold text-purple-600">${beta}°</td>
        <td class="p-2 border ${Math.abs(parseFloat(sinAlpha) - parseFloat(cosBeta)) < 0.0001 ? 'bg-yellow-100' : ''}">${sinAlpha}</td>
        <td class="p-2 border ${Math.abs(parseFloat(cosAlpha) - parseFloat(sinBeta)) < 0.0001 ? 'bg-yellow-100' : ''}">${cosAlpha}</td>
        <td class="p-2 border ${Math.abs(parseFloat(sinAlpha) - parseFloat(cosBeta)) < 0.0001 ? 'bg-yellow-100' : ''}">${sinBeta}</td>
        <td class="p-2 border ${Math.abs(parseFloat(cosAlpha) - parseFloat(sinBeta)) < 0.0001 ? 'bg-yellow-100' : ''}">${cosBeta}</td>
      </tr>
    `;
  }).join('');
}

// Inicializar botones rápidos
function initQuickButtons() {
  const container = document.getElementById('quickButtons');
  
  commonAngles.forEach(angle => {
    const button = document.createElement('button');
    button.textContent = `${angle}°`;
    button.className = `py-3 px-2 rounded-lg bg-white border-2 border-amber-300 
                        text-sm font-black text-amber-900 hover:bg-amber-100 
                        hover:border-amber-500 transition-all active:scale-95 shadow-md`;
    button.onclick = () => {
      document.getElementById('angleSlider').value = angle;
      updateVisualization(angle);
    };
    container.appendChild(button);
  });
}

// Event Listeners
document.getElementById('angleSlider').addEventListener('input', (e) => {
  updateVisualization(e.target.value);
});

// Inicializar
initQuickButtons();
updateVisualization(30);