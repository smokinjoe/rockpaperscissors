$("#clear").click(function () {
  $("#number-of-rounds").val('');
  $("#results-body").html('');
});

$("#roll-all-at-once").click( function () {
  $("#results-body").html('');

  var _num_rounds = ($("#number-of-rounds").val() === "1 Round") ? 1 : $("#number-of-rounds").val();

  if (_num_rounds > 200) {
    alert("Sorry, that's asking too much of our Warriors.");
    $('#clear').triggerHandler('click');
    return false;
  }

  function doBattle (_opp1, _opp2) {
    var _actions = ['rock','paper','scissors'];
    var record = {};
    record[_opp1.name] = {
      'name' : _opp1.name,
      'action' : _actions[Math.floor(Math.random() * _actions.length)],
      'result' : ''
    };
    record[_opp2.name] = {
      'name' : _opp2.name,
      'action' : _actions[Math.floor(Math.random() * _actions.length)],
      'result' : ''
    };

    if (record[_opp1.name].action === "rock") {
      switch (record[_opp2.name].action) {
        case "rock":
          _opp1.draws += 1;
          _opp2.draws += 1;
          record[_opp1.name].result = 'draw';
          record[_opp2.name].result = 'draw';
          doBattle(_opp1, _opp2);
          break;
        case "paper":
          _opp1.losses += 1;
          _opp2.wins += 1;
          record[_opp1.name].result = 'loss';
          record[_opp2.name].result = 'win';
          break;
        case "scissors":
          _opp1.wins += 1;
          _opp2.losses += 1;
          record[_opp1.name].result = 'win';
          record[_opp2.name].result = 'loss';
          break;
        default:
          alert("Something has gone wrong");
          break;
      }
    }
    else if (record[_opp1.name].action === "paper") {
      switch (record[_opp2.name].action) {
        case "rock":
          _opp1.wins += 1;
          _opp2.losses += 1;
          record[_opp1.name].result = 'win';
          record[_opp2.name].result = 'loss';
          break;
        case "paper":
          _opp1.draws += 1;
          _opp2.draws += 1;
          record[_opp1.name].result = 'draw';
          record[_opp2.name].result = 'draw';
          doBattle(_opp1, _opp2);
          break;
        case "scissors":
          _opp1.losses += 1;
          _opp2.wins += 1;
          record[_opp1.name].result = 'loss';
          record[_opp2.name].result = 'win';
          break;
        default:
          alert("Something has gone wrong");
          break;
      }
    }
    else if (record[_opp1.name].action === "scissors") {
      switch (record[_opp2.name].action) {
        case "rock":
          _opp1.losses += 1;
          _opp2.wins += 1;
          record[_opp1.name].result = 'loss';
          record[_opp2.name].result = 'win';
          break;
        case "paper":
          _opp1.wins += 1;
          _opp2.losses += 1;
          record[_opp1.name].result = 'win';
          record[_opp2.name].result = 'loss';
          break;
        case "scissors":
          _opp1.draws += 1;
          _opp2.draws += 1;
          record[_opp1.name].result = 'draw';
          record[_opp2.name].result = 'draw';
          doBattle(_opp1, _opp2);
          break;
        default:
          alert("Something has gone wrong");
          break;
      }
    }
    else {
      alert('something has gone wrong');
    }

    var _opp1_record = {
      'hero' : {
        'action' : record[_opp1.name].action,
        'name' : _opp1.name
      },
      'opponent' : {
        'action' : record[_opp2.name].action,
        'name' : _opp2.name
      },
      'result' : record[_opp1.name].result
    };

    var _opp2_record = {
      'hero' : {
        'action' : record[_opp2.name].action,
        'name' : _opp2.name
      },
      'opponent' : {
        'action' : record[_opp1.name].action,
        'name' : _opp1.name
      },
      'result' : record[_opp2.name].result
    };

    _opp1.action_history.push(_opp1_record);
    _opp2.action_history.push(_opp2_record);

    _opp1.games += 1;
    _opp2.games += 1;
  }

  function pairUpAndGo(_n) {
    _n = _n || 1;
    for (var _h = 0; _h < _n; _h += 1) {
      for (var _i = 0; _i < _stuyguys.length; _i += 1) {
        for (var _j = 0; _j < _stuyguys.length; _j += 1) {
          if (_i !== _j) {
            doBattle(_stuyguys[_i], _stuyguys[_j]);
          }
        }
      }
    }
  }

  var Stuyguy = function (_name) {
    this.name  = _name;
    this.wins  = 0;
    this.losses = 0;
    this.games = 0;
    this.draws = 0;
    this.action_history = [];
  };

  var _stuyguys = [];
  _stuyguys.push(new Stuyguy('rob'));
  _stuyguys.push(new Stuyguy('alex'));
  _stuyguys.push(new Stuyguy('graeme'));
  _stuyguys.push(new Stuyguy('chris'));
  _stuyguys.push(new Stuyguy('matt'));
  _stuyguys.push(new Stuyguy('joe'));

  pairUpAndGo(_num_rounds);

  _stuyguys.sort(function(a, b) {
    return (b.wins - a.wins) ? b.wins - a.wins : a.draws - b.draws;
  });

  for (var _i = 0; _i < _stuyguys.length; _i += 1) {
    var _return_string = '<tr>'
                + '<td class="popover-me">' + _stuyguys[_i].name + '</td>'
                + '<td>' + _stuyguys[_i].wins + '</td>'
                + '<td>' + _stuyguys[_i].losses + '</td>'
                + '<td>' + _stuyguys[_i].draws + '</td>'
                + '<td>' + _stuyguys[_i].games + '</td>'
              + '</tr>';
    $("#results-body").append(_return_string);

  }

  console.log(_stuyguys);
});