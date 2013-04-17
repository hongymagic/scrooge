;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0](function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
(function() {
  var LMI;

  LMI = {
    lookup: function(lvr, loan) {
      var b1, b2, b3, band, index;

      b1 = [0.41, 0.61, 0.76, 0.91, 1.22, 1.68, 1.89, 2.10];
      b2 = [0.52, 0.78, 0.99, 1.18, 1.60, 2.20, 2.47, 2.74];
      b3 = [0.72, 1.01, 1.25, 1.50, 2.02, 3.31, 3.56, 3.76];
      if (loan <= 300000) {
        band = b1;
      } else if (loan <= 600000) {
        band = b2;
      } else if (loan <= 1000000) {
        band = b3;
      }
      if (lvr > 0.8 && lvr < 0.82) {
        index = 0;
      } else if (lvr < 0.84) {
        index = 1;
      } else if (lvr < 0.86) {
        index = 2;
      } else if (lvr < 0.88) {
        index = 3;
      } else if (lvr < 0.9) {
        index = 4;
      } else if (lvr < 0.92) {
        index = 5;
      } else if (lvr < 0.94) {
        index = 6;
      } else {
        index = 7;
      }
      return band[index] / 100;
    }
  };

  module.exports = LMI;

}).call(this);


},{}],2:[function(require,module,exports){
(function() {
  var LMI, Mortgage, MortgageFormView, MortgageSummaryView, Period, StampDuty, f, m, v, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  LMI = require('lmi');

  StampDuty = require('stamp-duty');

  Period = {
    Monthly: 12,
    Fortnightly: 24,
    Weekly: 48
  };

  Mortgage = (function(_super) {
    __extends(Mortgage, _super);

    function Mortgage() {
      _ref = Mortgage.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Mortgage.prototype.defaults = {
      interest: 5.75,
      price: 760000,
      savings: 100000,
      duration: 10,
      state: 'NSW'
    };

    Mortgage.prototype.deposit = function() {
      return this.savings - this.stamp_duty();
    };

    Mortgage.prototype.stamp_duty = function() {
      return StampDuty(this.state, this.price);
    };

    Mortgage.prototype.loan = function() {
      return this.price - this.deposit();
    };

    Mortgage.prototype.borrowing = function() {
      return this.loan() + this.lmi() + this.fees();
    };

    Mortgage.prototype.fees = function() {
      return 2469;
    };

    Mortgage.prototype.lvr = function() {
      return this.loan() / this.price;
    };

    Mortgage.prototype.lmi = function() {
      return LMI(this.lvr(), this.loan());
    };

    Mortgage.prototype.repayments = function() {
      var P, i, n;

      P = this.borrowing();
      i = this.interest / Period.Monthly / 100;
      n = this.duration * Period.Monthly;
      return P * (i * Math.pow(i + 1, n)) / (Math.pow(1 + i, n) - 1);
    };

    Mortgage.prototype.toJSON = function() {
      return _.extend(_.clone(this.attributes), {
        fees: this.fees(),
        loan: this.loan(),
        deposit: this.deposit(),
        borrowing: this.borrowing(),
        lvr: this.lvr() * 100,
        repayments: this.repayments(),
        lmi: this.lmi(),
        stamp_duty: this.stamp_duty()
      });
    };

    Mortgage.prototype.toFormattedJSON = function() {
      var decimals, json, key, monies, value;

      monies = ['price', 'savings', 'deposit', 'stamp_duty', 'fees', 'loan', 'borrowing', 'repayments', 'lmi'];
      decimals = ['lvr', 'interest'];
      json = this.toJSON();
      for (key in json) {
        value = json[key];
        if (__indexOf.call(monies, key) >= 0) {
          json[key] = accounting.formatNumber(value);
        }
        if (__indexOf.call(decimals, key) >= 0) {
          json[key] = accounting.formatNumber(value);
        }
      }
      return json;
    };

    Mortgage.prototype.update = function() {};

    Mortgage.prototype.toString = function() {
      return JSON.stringify(this.toJSON());
    };

    return Mortgage;

  })(Backbone.Model);

  MortgageFormView = (function(_super) {
    __extends(MortgageFormView, _super);

    function MortgageFormView() {
      _ref1 = MortgageFormView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    MortgageFormView.prototype.el = '#form';

    MortgageFormView.prototype.template = _.template($('#__MortgageForm').html());

    MortgageFormView.prototype.initialize = function() {
      return this.binder = new Backbone.ModelBinder;
    };

    MortgageFormView.prototype.render = function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.binder.bind(this.model, this.el);
      return this;
    };

    return MortgageFormView;

  })(Backbone.View);

  MortgageSummaryView = (function(_super) {
    __extends(MortgageSummaryView, _super);

    function MortgageSummaryView() {
      _ref2 = MortgageSummaryView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    MortgageSummaryView.prototype.el = '#summary';

    MortgageSummaryView.prototype.template = _.template($('#__MortgageSummary').html());

    MortgageSummaryView.prototype.initialize = function() {
      return this.listenTo(this.model, "change", this.render);
    };

    MortgageSummaryView.prototype.render = function() {
      this.$el.html(this.template(this.model.toFormattedJSON()));
      return this;
    };

    return MortgageSummaryView;

  })(Backbone.View);

  m = new Mortgage;

  f = new MortgageFormView({
    model: m
  });

  v = new MortgageSummaryView({
    model: m
  });

  f.render();

  v.render();

}).call(this);


},{"lmi":3,"stamp-duty":4}],3:[function(require,module,exports){
// A sample lenders' mortgage insurance (LMI) calculator for Australia. Please
// note that LMI will vary between lenders and this calculation should be used
// only as a sample guide.

var b1 = [0.41, 0.61, 0.76, 0.91, 1.22, 1.68, 1.89, 2.10];
var b2 = [0.52, 0.78, 0.99, 1.18, 1.60, 2.20, 2.47, 2.74];
var b3 = [0.72, 1.01, 1.25, 1.50, 2.02, 3.31, 3.56, 3.76];

//
// Number#toFixed which returns a number
function toFixed (value, precision) {
	if (precision == null) precision = 4;

	var power = Math.pow(10, precision);
	var fixed = (Math.round(value * power) / power).toFixed(precision);
	return parseFloat(fixed);
}

//
// LMI is simply a portion of the loan which is based on the loan-to-value
// ratio.
function rate (lvr, loan) {
	var band, index;

	if (loan < 300000)
		band = b1;
	else if (loan < 600000)
		band = b2;
	else if (loan < 1000000)
		band = b3;

	if (band === undefined)
		return 0;

	if (lvr > 0.8 && lvr < 0.82) {
		index = 0;
	} else if (lvr < 0.84) {
		index = 1;
	} else if (lvr < 0.86) {
		index = 2;
	} else if (lvr < 0.88) {
		index = 3;
	} else if (lvr < 0.9) {
		index = 4;
	} else if (lvr < 0.92) {
		index = 5;
	} else if (lvr < 0.94) {
		index = 6;
	} else {
		index = 7;
	}

	return toFixed(band[index] / 100, 5);
};

module.exports = function (lvr, loan, precision) {
	return toFixed(rate(lvr, loan) * loan, precision || 2);;
};

},{}],4:[function(require,module,exports){
var data = require('./data');

function filter (value) {
	return function (band) {
		return band.min <= value && value <= band.max;
	};
}

function toFixed (value, precision) {
	if (precision == null) precision = 2;

	var power = Math.pow(10, precision);
	var fixed = (Math.round(value * power) / power).toFixed(precision);
	return parseFloat(fixed);
}

Array.prototype.first = function (filter) {
	var i, length;
	for (i = 0, length = this.length; i < length; i += 1)
		if (filter.call(this, this[i]) === true)
			return this[i];
}

module.exports = function (state, value) {
	if (state == null) state = 'nsw';
	if (value == null) value = 0;

	var bands = data[state.toLowerCase()];
	var band = bands.first(filter(value));
	var duty = band.base + (value - (band.over || band.min)) * (band.rate / 100);

	return toFixed(duty);
};

},{"./data":5}],5:[function(require,module,exports){
module.exports = {
	nsw: [
		{ min: 0,       max: 14000,    rate: 1.25, base: 0 },
		{ min: 14000,   max: 30000,    rate: 1.50, base: 175 },
		{ min: 30000,   max: 80000,    rate: 1.75, base: 415 },
		{ min: 80000,   max: 300000,   rate: 3.50, base: 1290 },
		{ min: 300000,  max: 1000000,  rate: 4.50, base: 8990 },
		{ min: 1000000, max: 3000000,  rate: 5.50, base: 40490 },
		{ min: 3000000, max: Infinity, rate: 7.00, base: 150490 }
	],

	qld: [
		{ min: 0,       max: 5000,     rate: 0.00, base: 0 },
		{ min: 5000,    max: 105000,   rate: 1.50, base: 0, over: 5000 },
		{ min: 105000,  max: 480000,   rate: 3.50, base: 1500 },
		{ min: 480000,  max: 980000,   rate: 4.50, base: 14625 },
		{ min: 980000,  max: Infinity, rate: 5.25, base: 37125 }
	],

	sa: [
		{ min: 0,       max: 12000,    rate: 1.00, base: 0 },
		{ min: 12000,   max: 30000,    rate: 2.00, base: 120 },
		{ min: 30000,   max: 50000,    rate: 3.00, base: 480 },
		{ min: 50000,   max: 100000,   rate: 3.50, base: 1080 },
		{ min: 100000,  max: 200000,   rate: 4.00, base: 2830 },
		{ min: 200000,  max: 250000,   rate: 4.25, base: 6830 },
		{ min: 250000,  max: 300000,   rate: 4.75, base: 8955 },
		{ min: 300000,  max: 500000,   rate: 5.00, base: 11330 },
		{ min: 500000,  max: Infinity, rate: 5.50, base: 21330 }
	],

	vic: [
		{ min: 0,      max: 25000,    rate: 1.40, base: 0 },
		{ min: 25000,  max: 130000,   rate: 2.40, base: 350 },
		{ min: 130000, max: 440000,   rate: 5.00, base: 2870 },
		{ min: 440000, max: 550000,   rate: 6.00, base: 18370 },
		{ min: 550000, max: 960000,   rate: 6.00, base: 2870, over: 130000 },
		{ min: 960000, max: Infinity, rate: 5.50, base: 0 }
	],

	wa: [
		{ min: 0,       max: 120000,   rate: 1.90, base: 0 },
		{ min: 120000,  max: 150000,   rate: 2.85, base: 2280 },
		{ min: 150000,  max: 360000,   rate: 3.80, base: 3135 },
		{ min: 360000,  max: 300000,   rate: 4.75, base: 11115 },
		{ min: 725000,  max: Infinity, rate: 5.15, base: 28435 }
	]
};
},{}]},{},[2,1])
;