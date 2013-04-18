	FastClick = require 'fastclick'

Import calculators needed

	LMI       = require 'lmi'
	StampDuty = require 'stamp-duty'

	Period =
		Monthly     : 12
		Fortnightly : 24
		Weekly      : 48

Base model to represent a mortgage. A mortgage is simply a document contract
which states variables such as price, loan, interest rate and etc.

	class Mortgage extends Backbone.Model

		defaults:
			interest: 5.75
			price:    760000
			savings:  100000
			duration: 10
			state:    'NSW'

		deposit: ->
			@savings - @stamp_duty()

		stamp_duty: ->
			StampDuty @state, @price

		loan: ->
			@price - @deposit()

		borrowing: ->
			@loan() + @lmi() + @fees()

		fees: ->
			2469

		lvr: ->
			@loan() / @price

		lmi: ->
			LMI @lvr(), @loan()

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

		update: ->

		toString: ->
			JSON.stringify @toJSON()

	class MortgageFormView extends Backbone.View

		el: '#form'

		template: _.template $('#__MortgageForm').html()

		initialize: ->
			@binder = new Backbone.ModelBinder

		render: ->
			@$el.html @template @model.toJSON()
			@binder.bind @model, @el
			@

	class MortgageSummaryView extends Backbone.View

		el: '#summary'

		template: _.template $('#__MortgageSummary').html()

		initialize: ->
			@listenTo @model, "change", @render

		render: ->
			@$el.html @template @model.toFormattedJSON()
			@

Enable fastclick on iOS WebView

	FastClick document.body

	m = new Mortgage
	f = new MortgageFormView { model: m }
	v = new MortgageSummaryView { model: m }

	f.render()
	v.render()
