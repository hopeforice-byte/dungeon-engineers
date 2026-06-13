function renderImplantsTab(character, IMPLANTS_DATA, implantsBySlot, SLOT_LIMITS, alienation, alienStage, addImplantFromSelect, addCustomImplant) {
    let html = `<h3>🦾 Имплантаты (Отчуждение: ${alienation}%)</h3>
    <div class="alienation-container">
        <div class="alienation-bar"><div class="alienation-fill" style="width:${alienation}%; background:${alienation>90?'#e74c3c':alienation>70?'#e74c3c':alienation>50?'#f39c12':alienation>30?'#f39c12':alienation>15?'#2ecc71':'#2ecc71'}"></div></div>
        <div class="alienation-stage">📊 ${alienStage.stage}: ${alienStage.effect}</div>
    </div>
    <div class="human-body"><svg class="body-svg" viewBox="0 0 200 300" style="width:180px;">
        <rect x="75" y="10" width="50" height="50" rx="10" class="body-slot ${implantsBySlot.Голова.length ? 'has-implant' : ''}"/>
        <text x="100" y="40" text-anchor="middle" fill="#888" font-size="8">Голова</text>
        <circle cx="60" cy="80" r="15" class="body-slot ${implantsBySlot.Глаза.length ? 'has-implant' : ''}"/>
        <circle cx="140" cy="80" r="15" class="body-slot ${implantsBySlot.Глаза.length ? 'has-implant' : ''}"/>
        <rect x="70" y="100" width="60" height="80" rx="10" class="body-slot ${implantsBySlot.Торс.length ? 'has-implant' : ''}"/>
        <rect x="30" y="110" width="30" height="60" rx="5" class="body-slot ${implantsBySlot["Рука правая"].length ? 'has-implant' : ''}"/>
        <rect x="140" y="110" width="30" height="60" rx="5" class="body-slot ${implantsBySlot["Рука левая"].length ? 'has-implant' : ''}"/>
        <rect x="30" y="190" width="30" height="60" rx="5" class="body-slot ${implantsBySlot["Нога правая"].length ? 'has-implant' : ''}"/>
        <rect x="140" y="190" width="30" height="60" rx="5" class="body-slot ${implantsBySlot["Нога левая"].length ? 'has-implant' : ''}"/>
        <rect x="85" y="260" width="30" height="20" rx="5" class="body-slot ${implantsBySlot.Экзотика.length ? 'has-implant' : ''}"/>
        <text x="100" y="275" text-anchor="middle" fill="#888" font-size="6">Экзотика</text>
    </svg></div>
    <div class="body-parts">`;
    
    for (let [slot, limit] of Object.entries(SLOT_LIMITS)) {
        const implantsList = implantsBySlot[slot] || [];
        html += `<div class="body-part"><h4>${slot}</h4><div class="slot-limit">${implantsList.length}/${limit}</div><div class="implants-in-slot">`;
        implantsList.forEach(imp => {
            html += `<div class="implant-badge"><strong>${imp.name}</strong> (${imp.alienation || 0}%)<button class="remove-imp" onclick="removeImplant(${imp.idx})">✖</button></div>`;
        });
        html += `</div></div>`;
    }
    
    html += `</div>
    <select id="implantSelect" onchange="addImplantFromSelect()">
        <option value="">— Добавить имплантат —</option>
        ${(IMPLANTS_DATA || []).map(i => `<option value='${JSON.stringify(i)}'>${i.name} (${i.slot}, ${i.alienation || 0}% отч., ${i.price} Вт)</option>`).join('')}
    </select>
    <button class="btn-secondary" onclick="addCustomImplant()">⚙️ + Кастомный имплантат</button>`;
    
    return html;
}