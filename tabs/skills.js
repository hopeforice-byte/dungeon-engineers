function renderSkillsTab(character, SKILLS_LIST, SKILL_NAMES, getTotalSkill, getMaxSkillForLevel, getRemainingPoints) {
    const maxForLevel = getMaxSkillForLevel();
    const remainingPoints = getRemainingPoints();
    
    let html = `<div class="points-left">🎯 Очки навыков: ${remainingPoints} осталось | Макс. навык: ${maxForLevel}</div>
                <div class="skills-grid">`;
    
    for (let [sk, name] of Object.entries(SKILL_NAMES)) {
        const total = getTotalSkill(sk);
        const base = character.baseSkills[sk] || 0;
        const bonus = total - base;
        const overMax = total > maxForLevel;
        html += `<div class="skill-row">
            <span class="skill-name">${name} (${sk})</span>
            <input type="range" class="skill-slider" min="0" max="10" value="${base}" onchange="updateSkill('${sk}', this.value)">
            <span class="skill-value">${total}</span>
            <span class="skill-target">${total>=9?"2+":total>=7?"3+":total>=5?"4+":total>=3?"5+":"6+"}</span>
            ${bonus > 0 ? `<span class="skill-base">+${bonus}</span>` : ''}
            ${overMax ? `<span class="skill-max-warning">⚠️ превышает ${maxForLevel}</span>` : ''}
        </div>`;
    }
    html += `</div>`;
    return html;
}