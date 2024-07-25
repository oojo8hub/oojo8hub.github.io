const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_VALUE = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

function getMaxLifeValue() {
  const enteredValue = parseInt(
    prompt("Maximum life for you and monster", "100")
  );

  let parsedValue = enteredValue;
  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw {
      message: `Invalid user input , not a number`,
    };
  }
  return parsedValue;
}

let chosenMaxLife;
try {
  chosenMaxLife = getMaxLifeValue();
} catch (error) {
  console.log(error);
  chosenMaxLife = 100;
  alert("You entered a wrong format , 100 was used instead ");
}

let battleLog = [];
let lastLoggedEntry;

function writeToLog(ev, val, monsterHealth, playerHealth) {
  logEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };

  switch (ev) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = "MONSTER";
      break;

    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry.target = "MONSTER";
      break;

    case LOG_EVENT_MONSTER_ATTACK:
      logEntry.target = "PLAYER";
      break;

    case LOG_EVENT_PLAYER_HEAL:
      logEntry.target = "PLAYER";
      break;

    case LOG_EVENT_GAME_OVER:
      break;

    default:
      logEntry = {};
  }

  if (ev == LOG_EVENT_PLAYER_ATTACK) {
    // logEntry = {
    //    event: ev,
    //    value: val,
    //    target: "MONSTER",
    //    finalMonsterHealth: monsterHealth,
    //    finalPlayerHealth: playerHealth
    // // };
    // battleLog.push(logEntry);
    // } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    //   logEntry = {
    //     event: ev,
    //     value: val,
    //     target: "MONSTER",
    //     finalMonsterHealth: monsterHealth,
    //     finalPlayerHealth: playerHealth,
    //   };
    // } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    //   logEntry = {
    //     event: ev,
    //     value: val,
    //     target: "PLAYER",
    //     finalMonsterHealth: monsterHealth,
    //     finalPlayerHealth: playerHealth,
    //   };
  }
  // else if (ev === LOG_EVENT_PLAYER_HEAL) {
  //   logEntry = {
  //     event: ev,
  //     value: val,
  //     target: "PLAYER",
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth,
  //   };
  // } else if (ev === LOG_EVENT_GAME_OVER) {
  //   logEntry = {
  //     event: ev,
  //     value: val,
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth,
  //   };
  // }

  battleLog.push(logEntry);
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  // Monster damage to PLayer
  const initialPlayerHealth = currentPlayerHealth;
  const monsterDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= monsterDamage;

  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    monsterDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(currentPlayerHealth);
    alert("You would be died but the bonus life saved you");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("you won");

    writeToLog(
      LOG_EVENT_GAME_OVER,
      "Player W , Monster L",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("Monster won");

    writeToLog(
      LOG_EVENT_GAME_OVER,
      "Monster W , Player L",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("You drew");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "Monster and Player W / draw ",
      currentMonsterHealth,
      currentPlayerHealth
    );
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  //Expression yets a value you can store in jscripts , a const or variable

  const logEvent =
    mode === MODE_ATTACK
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STRONG_ATTACK;

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
  endRound();
}

function attackMonsterHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_VALUE);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal to more than your initial health");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;

  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function printLogHandler() {
  for (let i = 0; i < 3; i++) {
    console.log(battleLog[i]);
  }

  console.log(battleLog);
}

attackBtn.addEventListener("click", attackMonsterHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
