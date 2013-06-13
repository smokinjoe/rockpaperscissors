// this is the constructor for each battle entrant
var Stuyguy = function (name) {
  this.name = name;
  this.wins = 0;
  this.losses = 0;
  this.draws = 0;
  this.games = 0;
  this.action_history = [];
};

// Constructor for a battle record
// This requires some thinking, probably hold data as the battle
// process is running.  Would like some method of keeping things
// organized by opp object, but it would appear this would have
// to execute twice per battle, one for each hero
var Record = function (hero, opp) {
  this.hero = {};
  this.hero.name = hero.name;
  this.hero.action = '';

  this.opponent = {};
  this.opponent.name = opp.name;
  this.opponent.action = '';

  this.result = '';
};

var arena = (function () {
  var _warriors = {};
  var _action_history = [];
  var _results = {};
  var _actions = {
      'rock' : 0,
      'paper' : 1,
      'scissors' : 2
  };

  var _pairUpAndGo = function (n) {
    n = n || 1;
    for (var _h = 0; _h < n; _h += 1) {
      for (var _i = 0; _i < _stuyguys.length; _i += 1) {
        for (var _j = _i; _j < _stuyguys.length; _j += 1) {
          if (_i !== _j) {
            // do battle
          }
        }
      }
    }

  };
  // USES action_history - which ain't good
  var _breakTie = function (opp1, opp2) {
    var _opp1Wins = 0;
    var _opp2Wins = 0;
    for (var _i = 0; _i < _opp1.action_history.length; _i += 1) {
      if (_opp1.action_history[_i].opponent.name === _opp2.name) {
        if (_opp1.action_history[_i].result === "win") {
          _opp1Wins += 1;
        }
        else if (_opp1.action_history[_i].result === "loss") {
          _opp2Wins += 1;
        }
      }
    }

    return _opp2Wins - _opp1Wins;
  };
  // var _sort = function () {};
  var _determineWinner = function () {
    _warriors.sort(function(a, b) {
      return (b.wins - a.wins) ? b.wins - a.wins : ((a.draws - b.draws) ? a.draws-b.draws : _breakTie(a, b));
    });
  };
  var _doBattle = function (action1, action2) {
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

    if (_h == _o) {
        _record.hero.result = 'draw';
        _record.opponent.result = 'draw';
    }
    else if ((_h - _o + 3) % 3 == 1) {
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
    },
    removeWarrior: function(warrior) {
      _warriors[warrior.name] = undefined;
    },
    injectWarriors: function(warriorArray) {
      for (var i = 0; i < warriorArray.length; i += 1) {
        _warriors[warriorArray[i].name] = warriorArray[i];
      }
    },
    clearWarriors: function() {
      _warriors = {};
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
    }
  };
});


