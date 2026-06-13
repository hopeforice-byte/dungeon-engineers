function renderGearTab(character, WEAPONS_DATA, ARMOR_DATA, CONSUMABLES_DATA, equippedArmorData, addSelectedWeapon, addSelectedArmor, addSelectedConsumable, addCustomWeapon, addCustomArmor, addCustomConsumable, modifyCurrency, setCurrency) {
    let html = `<h3>🎒 Инвентарь</h3>
    <div class="currency-panel">
        <div class="currency-header"><h4>💰 Валюта</h4><span class="currency-value">${character.currency} Вт</span></div>
        <div class="currency-input"><input type="number" id="currencyInput" value="${character.currency}" placeholder="Сумма"><button class="btn-secondary" onclick="setCurrency(document.getElementById('currencyInput').value)">Установить</button></div>
        <div class="currency-buttons">
            <button class="currency-btn" onclick="modifyCurrency(10)">+10</button><button class="currency-btn" onclick="modifyCurrency(50)">+50</button>
            <button class="currency-btn" onclick="modifyCurrency(100)">+100</button><button class="currency-btn" onclick="modifyCurrency(-10)">-10</button>
            <button class="currency-btn" onclick="modifyCurrency(-50)">-50</button><button class="currency-btn" onclick="modifyCurrency(-100)">-100</button>
        </div>
    </div>
    <div style="background:#1a1a1a; padding:8px; border-radius:8px; margin-bottom:12px;">
        <div><strong>⚔️ Экипировано:</strong></div>
        <div>🛡️ Броня: ${equippedArmorData ? equippedArmorData.name : 'нет'}</div>
        <div>🔫 Оружие: ${character.equippedWeapon ? (WEAPONS_DATA.find(w=>w.id===character.equippedWeapon)?.name || character.equippedWeapon) : 'нет'}</div>
    </div>
    <div class="inventory-list">`;
    
    character.inventory.forEach((item, idx) => {
        let stats = "";
        if (item.damage) stats = `💥 ${item.damage} | S${item.S_vs_tech || 0} | ${item.range || 'касание'}`;
        else if (item.SU !== undefined) stats = `🛡️ СУ:${item.SU} | 📋 ${item.class || 'П?'}`;
        else if (item.effect) stats = `✨ ${item.effect}`;
        const isArmor = item.SU !== undefined;
        const isWeapon = item.damage !== undefined;
        html += `<div class="inv-item">
            <div class="inv-item-info"><span class="inv-item-name">${item.name}</span>
            ${isArmor ? `<button class="equipped-badge" onclick="equipArmor('${item.id}')">⚔️ Экипировать</button>` : ''}
            ${isWeapon ? `<button class="equipped-badge" onclick="equipWeapon('${item.id}')">🔫 В руку</button>` : ''}
            <div class="inv-item-stats">${stats} | 💰 ${item.price || 0} Вт</div></div>
            <button class="remove-item" onclick="removeItem(${idx})">✖</button>
        </div>`;
    });
    
    html += `</div>
    <hr><h4>📦 Добавить предмет</h4>
    <select id="weaponSelect" onchange="addSelectedWeapon()"><option value="">— Добавить оружие —</option>
        ${WEAPONS_DATA.map(w => `<option value='${JSON.stringify(w)}'>${w.name} — ${w.damage} | ${w.price}Вт</option>`).join('')}
    </select>
    <select id="armorSelect" onchange="addSelectedArmor()"><option value="">— Добавить броню —</option>
        ${ARMOR_DATA.map(a => `<option value='${JSON.stringify(a)}'>${a.name} — СУ:${a.SU} | ${a.price}Вт</option>`).join('')}
    </select>
    <select id="consumableSelect" onchange="addSelectedConsumable()"><option value="">— Добавить расходник —</option>
        ${CONSUMABLES_DATA.map(c => `<option value='${JSON.stringify(c)}'>${c.name} — ${c.effect?.substring(0, 40) || ''} | ${c.price}Вт</option>`).join('')}
    </select>
    <div class="custom-item-panel">
        <div class="custom-buttons">
            <button class="btn-secondary custom-weapon-btn" onclick="addCustomWeapon()">⚔️ + Кастомное оружие</button>
            <button class="btn-secondary custom-armor-btn" onclick="addCustomArmor()">🛡️ + Кастомная броня</button>
            <button class="btn-secondary custom-consumable-btn" onclick="addCustomConsumable()">💊 + Кастомный расходник</button>
        </div>
    </div>`;
    
    return html;
}