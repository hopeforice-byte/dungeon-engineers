function renderAbilitiesTab(character, getAvailableAbilities, getAvailableSpecAbilities, addSpecialization) {
    const classData = CLASSES_DATA.find(c => c.id === character.class);
    const availableAbilities = getAvailableAbilities();
    
    let html = `<h3>⚡ Способности класса (доступны с ${character.level} уровня)</h3>`;
    
    if (availableAbilities.length > 0) {
        availableAbilities.forEach(ab => {
            const isNew = ab.level === character.level;
            html += `<div class="ability-card ${isNew ? 'ability-new' : ''}">
                <h5>[${ab.level}] ${ab.name} ${isNew ? '<span style="color:#2ecc71;">✦ НОВОЕ!</span>' : ''}</h5>
                <small>${ab.type === 'passive' ? '🔹 Пассивная' : (ab.type === 'active' ? '🔸 Активная' : '🔻 Реакция')}</small>
                <p><small>${ab.description || 'Описание'}</small></p>
                ${ab.uses ? `<small>📊 Использований: ${ab.uses}</small>` : ''}
                ${ab.duration ? `<small>⏱️ Длительность: ${ab.duration}</small>` : ''}
            </div>`;
        });
    } else {
        html += `<div class="ability-card locked">Нет доступных способностей. Повышайте уровень!</div>`;
    }
    
    if (classData?.specializations) {
        html += `<h3>🎯 Специализации</h3><div>`;
        classData.specializations.forEach(spec => {
            const isSelected = character.specializations.includes(spec.name);
            const isAvailable = character.level >= 3;
            html += `<button class="spec-badge ${isSelected ? 'active' : ''}" onclick="addSpecialization('${spec.name}')" ${!isAvailable ? 'disabled style="opacity:0.5;"' : ''}>${spec.name}</button>`;
        });
        html += `</div>`;
        
        const specAbilities = getAvailableSpecAbilities();
        if (specAbilities.length > 0) {
            html += `<h3>⭐ Способности специализаций</h3>`;
            specAbilities.forEach(ab => {
                html += `<div class="ability-card">
                    <h5>[${ab.specName}] ${ab.name || ab.effect?.substring(0, 30)}</h5>
                    <small>${ab.type === 'passive' ? '🔹 Пассивная' : (ab.type === 'active' ? '🔸 Активная' : '🔻 Реакция')}</small>
                    <p><small>${ab.effect || ab.description || 'Описание'}</small></p>
                </div>`;
            });
        }
    }
    
    return html;
}