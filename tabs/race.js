function renderRaceTab(raceData, character, setRace, setRaceOrigin, setBeastLine, toggleSkillSelection, SKILLS_LIST, SKILL_NAMES) {
    let html = `<h3>🌍 Выбор расы</h3><div class="grid-2">`;
    RACES_DATA.forEach(race => {
        html += `<div class="class-card ${character.race === race.id ? 'selected' : ''}" onclick="setRace('${race.id}')">
            <h4>${race.name}</h4><small>${race.trait?.name || race.trait || 'Особенность'}</small>
        </div>`;
    });
    html += `</div>`;
    
    if (character.race === "mutant" && raceData?.origins) {
        html += `<h3>Происхождение мутанта</h3><div class="grid-2">`;
        raceData.origins.forEach(o => {
            html += `<div class="class-card ${character.raceOrigin === o.id ? 'selected' : ''}" onclick="setRaceOrigin('${o.id}')"><h4>${o.name}</h4><small>${o.effects?.join(', ') || ''}</small></div>`;
        });
        html += `</div>`;
    }
    
    if (character.race === "beastkin" && raceData?.lines) {
        html += `<h3>Звериная линия</h3><div class="grid-2">`;
        raceData.lines.forEach(l => {
            html += `<div class="class-card ${character.beastLine === l.id ? 'selected' : ''}" onclick="setBeastLine('${l.id}')"><h4>${l.name}</h4><small>${l.effects?.join(', ') || ''}</small></div>`;
        });
        html += `</div>`;
    }
    
    if (character.race === "human") {
        html += `<h3>Выберите 3 навыка для +1</h3><div class="grid-2">`;
        SKILLS_LIST.forEach(s => {
            const isSelected = character.selectedSkills?.includes(s);
            html += `<div class="class-card ${isSelected ? 'selected' : ''}" onclick="toggleSkillSelection('${s}')"><h4>${SKILL_NAMES[s]} (${s})</h4></div>`;
        });
        html += `</div>`;
    }
    
    if (character.race && (character.race === "mutant" || character.race === "homunculus" || character.race === "fused") && raceData?.bonus_choice && character.selectedSkills.length === 0) {
        html += `<h3>Выберите +1 к навыку</h3><div class="grid-2">`;
        raceData.bonus_choice.options.forEach(opt => {
            const isSelected = character.selectedSkills?.includes(opt);
            html += `<div class="class-card ${isSelected ? 'selected' : ''}" onclick="toggleSkillSelection('${opt}')"><h4>${SKILL_NAMES[opt]} (${opt})</h4></div>`;
        });
        html += `</div>`;
    }
    
    // Бонусы расы
    const raceBonuses = (() => {
        let bonuses = {};
        if (!raceData) return bonuses;
        if (raceData.bonus_type === "fixed") Object.assign(bonuses, raceData.bonus_skills || {});
        if (raceData.bonus_type === "fixed_plus_choice") Object.assign(bonuses, raceData.bonus_skills || {});
        if (raceData.bonus_type === "fixed_plus_line") Object.assign(bonuses, raceData.bonus_skills || {});
        if (raceData.bonus_type === "any_three" && character.selectedSkills) {
            character.selectedSkills.forEach(s => { bonuses[s] = (bonuses[s] || 0) + 1; });
        }
        if (character.race === "mutant" && character.raceOrigin === "giant") bonuses.STR = (bonuses.STR || 0) + 2;
        if (character.race === "beastkin" && character.beastLine && raceData.lines) {
            const line = raceData.lines.find(l => l.id === character.beastLine);
            if (line && line.bonus_skills) Object.assign(bonuses, line.bonus_skills);
        }
        return bonuses;
    })();
    
    if (Object.keys(raceBonuses).length > 0) {
        html += `<div style="margin-top:16px; padding:12px; background:#1a1a1a; border-radius:8px;">
            <strong>🎯 Бонусы расы:</strong><br>
            ${Object.entries(raceBonuses).map(([sk, val]) => `${SKILL_NAMES[sk]} +${val}`).join(', ')}
        </div>`;
    }
    
    return html;
}