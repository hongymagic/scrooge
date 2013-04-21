	LMI       = require 'lmi'
	StampDuty = require 'stamp-duty'

	Period =
		Monthly:     12
		Fortnightly: 24
		Weekly:      48

Base model to represent a mortgage. A mortgage is simply a document contract
which states variables such as price, loan, interest rate and etc.

	class Mortgage extends Backbone.Model

		defaults:
			interest:   5.54
			price:      768000
			savings:    134000
			duration:   30
			state:      'NSW'
			capitalize: true

A deposit is how much you have left to contribute towards the loan sans fees
such as LMI, solicitor fees, stamp duty and etc.

TODO: when use decides NOT to capitalize, LMI and fees must be taken our of
the total savings.

		deposit: ->
			@savings - @stamp_duty()

		stamp_duty: ->
			StampDuty @state, @price

		loan: ->
			@price - @deposit()

		borrowing: ->
			borrowing = @loan()
			if (@capitalize)
				borrowing += @lmi() + @fees()
			borrowing

		fees: ->
			2469

Loan to value ratio is given in percentage and represents the ratio of your
contribution verses the loan itself.

		lvr: ->
			@loan() / @price

With most lenders, you do not need to pay mortgage insurance if your LVR is
below 80%. This means that you will need 20% deposit in order to avoid paying
heavy LMI. The rate at which LMI increases is quite significant if your LVR
goes over 90%.

		lmi: ->
			lvr = @lvr()
			if (lvr <= 0.80)
				0
			else
				LMI lvr, @loan()

		repayments: () ->
			P = @borrowing()
			i = @interest / Period.Monthly / 100
			n = @duration * Period.Monthly
			P * (i * Math.pow((i + 1), n)) / (Math.pow((1 + i), n) - 1)

		toJSON: ->
			_.extend _.clone(@attributes), {
				fees       : @fees()
				loan       : @loan()
				deposit    : @deposit()
				borrowing  : @borrowing()
				lvr        : @lvr() * 100
				repayments : @repayments()
				lmi        : @lmi()
				stamp_duty : @stamp_duty()
			}

		toFormattedJSON: ->
			monies   = ['price', 'savings', 'deposit', 'stamp_duty', 'fees', 'loan', 'borrowing', 'repayments', 'lmi']
			decimals = ['lvr', 'interest']
			json = @toJSON()
			for key, value of json
				json[key] = accounting.formatNumber value if key in monies
				json[key] = accounting.formatNumber value if key in decimals
			json

		toString: ->
			JSON.stringify @toJSON()

Export the model

	module.exports = Mortgage
