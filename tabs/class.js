function renderClassTab(character, CLASSES_DATA, setClass) {
    let html = `<h3>🤖 Выбор класса</h3><div class="grid-2">`;
    CLASSES_DATA.forEach(cls => {
        html += `<div class="class-card ${character.class === cls.id ? 'selected' : ''}" onclick="setClass('${cls.id}')">
            <h4>${cls.name}</h4>
            <small>❤️ +${cls.hp_start_bonus} ХП | +${cls.hp_per_level}/ур</small>
        </div>`;
    });
    html += `</div>`;
    return html;
}