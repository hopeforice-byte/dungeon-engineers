// formulas.js — все формулы для чарника «Инженеры Подземелий»

const Formulas = {
  // ========================
  // НАВЫКИ
  // ========================
  
  getSkillTarget(value) {
    if (value >= 9) return { target: 2, chance: 90, label: '2+' };
    if (value >= 7) return { target: 3, chance: 80, label: '3+' };
    if (value >= 5) return { target: 4, chance: 70, label: '4+' };
    if (value >= 3) return { target: 5, chance: 60, label: '5+' };
    return { target: 6, chance: 50, label: '6+' };
  },

  // ========================
  // ХП, СУ, ИНИЦИАТИВА, СКОРОСТЬ
  // ========================

  calculateHP(t, classBonus, level = 1) {
    const base = 10 + (t * 2);
    const start = base + (classBonus?.start || 0);
    const perLevel = (classBonus?.perLevel || 0) + 2;
    return {
      base, start,
      total: start + (perLevel * (level - 1)),
      perLevel
    };
  },

  calculateSU(t, armorSU = 0, implantSU = 0, raceSU = 0) {
    let base = 0;
    if (t >= 7) base = 2;
    else if (t >= 3) base = 1;
    return base + armorSU + implantSU + raceSU;
  },

  calculateInitiative(ag) {
    return { bonus: ag, formula: `1d10 + ${ag}` };
  },

  calculateSpeed(ag, armorPenalty = 0, raceBonus = 0) {
    return 9 + raceBonus - armorPenalty;
  },

  // ========================
  // РАСА
  // ========================

  getMaxSkillStart(raceId, skillId) {
    if (raceId === 'human') return 7;
    if (raceId === 'ai' && skillId === 'STR') return 4;
    return 6;
  },

  getMaxSkillAtLevel(level, raceId, skillId) {
    const caps = { 1: 6, 2: 7, 3: 7, 4: 8, 5: 8, 6: 9, 7: 9, 8: 10, 9: 10, 10: 10 };
    let cap = caps[level] || 10;
    if (raceId === 'human' && level === 1) cap = 7;
    if (raceId === 'ai' && skillId === 'STR') cap = Math.min(cap, 4);
    return cap;
  },

  getRaceBonuses(race, selectedOptions = {}) {
    const bonuses = {};
    let total = 0;
    if (race.bonuses?.type === 'fixed') {
      for (const [skill, value] of Object.entries(race.bonuses.skills || {})) {
        bonuses[skill] = (bonuses[skill] || 0) + value;
        total += value;
      }
    }
    if (selectedOptions.bonuses) {
      for (const [skill, value] of Object.entries(selectedOptions.bonuses)) {
        bonuses[skill] = (bonuses[skill] || 0) + value;
        total += value;
      }
    }
    if (race.bonuses?.type === 'any_three' && selectedOptions.anyThree) {
      for (const skill of selectedOptions.anyThree) {
        bonuses[skill] = (bonuses[skill] || 0) + 1;
        total += 1;
      }
    }
    return { bonuses, total };
  },

  getAvailablePoints(raceBonusTotal) {
    return 30 + raceBonusTotal;
  },

  // ========================
  // КЛАСС
  // ========================

  getStartingSkills(classSkills, playerSkills, raceBonuses) {
    const result = {};
    const allSkills = ['BS','WS','STR','T','AG','INT','PER','INF','TECH','NET','KNW','SURV'];
    for (const skill of allSkills) {
      result[skill] = Math.max(classSkills?.[skill] || 1, playerSkills?.[skill] || 1) + (raceBonuses?.[skill] || 0);
    }
    return result;
  },

  // ========================
  // ПРОКАЧКА
  // ========================

  getSkillPointsAtLevel(level, raceBonusTotal) {
    const bonuses = { 1:0, 2:1, 3:2, 4:4, 5:5, 6:6, 7:8, 8:9, 9:10, 10:11 };
    return 30 + raceBonusTotal + (bonuses[level] || 0);
  },

  getHPAtLevel(t, classBonus, level) {
    const base = 10 + (t * 2);
    const start = base + (classBonus?.start || 0);
    return start + ((classBonus?.perLevel || 0) + 2) * (level - 1);
  },

  getLevelUpRewards(level, charClass) {
    const rewards = { skillPoints: 1, hpGain: 2 + (charClass?.hp_per_level || 0), special: null, choice: null };
    if (level === 4 || level === 7) { rewards.skillPoints = 2; rewards.note = '+1 к двум разным навыкам'; }
    if (level === 3 || level === 6 || level === 9) { rewards.choice = 'specialization'; }
    const abilities = charClass?.abilities?.filter(a => [2,5,8,10].includes(a.level)) || [];
    const match = abilities.find(a => a.level === level);
    if (match) rewards.special = match;
    return rewards;
  },

  // ========================
  // ИМПЛАНТАТЫ И ОТЧУЖДЕНИЕ
  // ========================

  calculateAlienation(implants) {
    const total = (implants || []).reduce((sum, imp) => sum + (imp.alienation || 0), 0);
    let stage = 'Человек';
    if (total > 90) stage = 'Голем (NPC)';
    else if (total > 70) stage = 'Грань';
    else if (total > 50) stage = 'Машина';
    else if (total > 30) stage = 'Киборг';
    else if (total > 15) stage = 'Модификант';
    return { total, stage };
  },

  getAlienationEffects(stage) {
    const effects = {
      'Человек': 'Нет эффекта',
      'Модификант': 'Помеха на INF с «чистыми» людьми',
      'Киборг': 'Обычная еда не насыщает. Лечение органикой — 50%.',
      'Машина': 'Помеха на PER (эмпатия). Преимущество на спас-броски от страха.',
      'Грань': 'Нет снов. Дети/животные боятся. Преимущество на концентрацию.',
      'Голем (NPC)': 'Персонаж становится NPC.'
    };
    return effects[stage] || '';
  },

  // ========================
  // БЮДЖЕТ
  // ========================

  calculateBudget(base = 200, bonuses = 0) {
    return base + bonuses;
  }
};