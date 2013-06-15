// this is the constructor for each battle entrant
var Stuyguy = function (name) {
  this.name = name;
  this.wins = 0;
  this.losses = 0;
  this.draws = 0;
  this.games = 0;
  this.action_history = [];
};

var arena = (function () {
  var _debug = false;
  var _warriors = {};
  var _array_map = [];
  var _action_history = [];
  var _actions = {
      'rock' : 0,
      'paper' : 1,
      'scissors' : 2
  };
  var _action_strings = ['rock', 'paper', 'scissors'];

  Array.prototype.unset = function(value) {
    if(this.indexOf(value) != -1) { // Make sure the value exists
      this.splice(this.indexOf(value), 1);
    }
  };

  // Constructor for a warrior battle record
  // This requires some thinking, probably hold data as the battle
  // process is running.  Would like some method of keeping things
  // organized by opp object, but it would appear this would have
  // to execute twice per battle, one for each hero
  //var Warrior_Action_History = function (hero, opp) {
  //  this.hero = {};
  //  this.hero.name = hero.name;
  //  this.hero.action = '';

  //  this.opponent = {};
  //  this.opponent.name = opp.name;
  //  this.opponent.action = '';

  //  this.result = '';
  //};

  var Action_History = function (opp1, opp2) {
    this.warriors = {};
    this.warriors[opp1.name] = {};
    this.warriors[opp1.name].name = opp1.name;
    this.warriors[opp1.name].action = '';
    this.warriors[opp1.name].result = '';
    this.warriors[opp2.name] = {};
    this.warriors[opp2.name].name = opp2.name;
    this.warriors[opp2.name].action = '';
    this.warriors[opp2.name].result = '';
    this.winner = {};
    this.loser = {};
  };
  Action_History.prototype.declareWinner = function (warrior) {
    this.winner = this.warriors[warrior.name];
  };
  Action_History.prototype.declareLoser = function (warrior) {
    this.loser = this.warriors[warrior.name];
  };
  Action_History.prototype.roll(warrior) {
    this.warriors[warrior.name].action = _action_strings[Math.floor(Math.random() * _action_strings.length)];
  };

  var _pairUpAndGo = function (n) {
    n = n || 1;
    for (var _h = 0; _h < n; _h += 1) {
      for (var _i = 0; _i < _array_map.length; _i += 1) {
        for (var _j = _i; _j < _array_map.length; _j += 1) {
          if (_i !== _j) {
            _enterTheArena(_array_map[_i], _array_map[_j]);
          }
        }
      }
    }
  };
  // USES action_history - which ain't good
  //var _breakTie = function (opp1, opp2) {
  //  var _opp1Wins = 0;
  //  var _opp2Wins = 0;
  //  for (var _i = 0; _i < _opp1.action_history.length; _i += 1) {
  //    if (_opp1.action_history[_i].opponent.name === _opp2.name) {
  //      if (_opp1.action_history[_i].result === "win") {
  //        _opp1Wins += 1;
  //      }
  //      else if (_opp1.action_history[_i].result === "loss") {
  //        _opp2Wins += 1;
  //      }
  //    }
  //  }

  //  return _opp2Wins - _opp1Wins;
  //};
  var _enterTheArena = function (opp1, opp2) {
    var _ah_record = new Action_History(opp1, opp2);
    _ah_record.roll(opp1);
    _ah_record.roll(opp2);
    var _result = _determineWinner(_ah_record.warriors[opp1.name].action, _ah_record.warriors[opp2.name].action);
  }
  //var _sort = function () {
  //  _warriors.sort(function(a, b) {
  //    return (b.wins - a.wins) ? b.wins - a.wins : ((_breakTie(a, b)) ? _breakTie(a, b) : a.draws-b.draws);
  //  });
  //}
  var _determineWinner = function (action1, action2) {
    // progress: http://jsfiddle.net/smokinjoe/hq663/8/

    var _h = (typeof action1 === "string") ? _actions[action1] : _action1;
    var _o = (typeof action2 === "string") ? _actions[action2] : _action2;

    var _record = {
        hero : {
            'action' : action1,
            'result' : ''
        },
        opponent : {
            'action' : action2,
            'result' : ''
        }
    };

    if (_h === _o) {
        _record.hero.result = 'draw';
        _record.opponent.result = 'draw';
    }
    else if ((_h - _o + 3) % 3 === 1) {
        _record.hero.result = 'win';
        _record.opponent.result = 'loss';
    }
    else {
        _record.hero.result = 'loss';
        _record.opponent.result = 'win';
    }

    return _record;

  };

  return {
    injectWarrior: function(warrior) {
      warrior = (typeof warrior === "string") ? new Stuyguy(warrior) : warrior;
      _warriors[warrior.name] = warrior;
      _array_map.push(_warriors[warrior.name]);
    },
    removeWarrior: function(warrior) {
      _array_map.unset(warrior);
      _warriors[warrior.name] = undefined;
    },
    injectWarriors: function(warriorArray) {
      for (var i = 0; i < warriorArray.length; i += 1) {
        _warriors[warriorArray[i].name] = warriorArray[i];
        _array_map.push(_warriors[warriorArray[i].name]);
      }
    },
    clearWarriors: function() {
      _warriors = {};
      _array_map = [];
    },
    battle: function(n) {
      _pairUpAndGo(n);
    },
    getStatus: function(name) {
      return _warriors[name];
    },
    getResults: function() {
      // return results
    },
    getHistory: function() {
      return _action_history;
    },
    clearTheDead: function() {
      _action_history = [];
    },
    debug: function() {
      _debug = !_debug;
    }
  };
}());


