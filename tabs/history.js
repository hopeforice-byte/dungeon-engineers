function renderHistoryTab(character) {
    let html = `<div class="history-list">`;
    if (character.levelHistory.length === 0) {
        html += `<div class="history-item">Нет записей. Повышайте уровень!</div>`;
    } else {
        character.levelHistory.forEach(entry => {
            html += `<div class="history-item"><strong>Уровень ${entry.level}</strong><br>${entry.action || ''}<br><small>${entry.date || ''}</small></div>`;
        });
    }
    html += `</div>`;
    return html;
}