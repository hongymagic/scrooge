	LMI       = require './lmi.litcoffee'
	StampDuty = require 'stamp-duty'

	Period =
		Monthly     : 12
		Fortnightly : 24
		Weekly      : 48

Base model to represent a mortgage. A mortgage is simply a document contract
which states variables such as price, loan, interest rate and etc.

	class Mortgage extends Backbone.Model

		defaults:
			interest: 5.74
			price:    700000
			deposit:  150459
			duration: 30
			state:    'NSW'

		stamp_duty: ->
			StampDuty @state, @price

		loan: ->
			@price - @deposit

		borrowing: ->
			@loan() + @lmi() + @fees() + @stamp_duty()

		fees: ->
			2469

		lvr: ->
			@loan() / @price

		lmi: ->
			LMI.lookup(@lvr(), @loan()) * @loan()

		repayments: () ->
			P = @borrowing()
			i = @interest / Period.Monthly / 100
			n = @duration * Period.Monthly
			P * (i * Math.pow((i + 1), n)) / (Math.pow((1 + i), n) - 1)

		toJSON: ->
			_.extend _.clone(@attributes), {
				fees       : @fees()
				loan       : @loan()
				borrowing  : @borrowing()
				lvr        : @lvr() * 100
				repayments : @repayments()
				lmi        : @lmi()
				stamp_duty : @stamp_duty()
			}

		toFormattedJSON: ->
			monies   = ['price', 'deposit', 'stamp_duty', 'fees', 'loan', 'borrowing', 'repayments', 'lmi']
			decimals = ['lvr', 'interest']
			json = @toJSON()
			for key, value of json
				json[key] = accounting.formatMoney value if key in monies
				json[key] = accounting.formatNumber value if key in decimals
			json

		update: ->

		toString: ->
			JSON.stringify @toJSON()

	class MortgageFormView extends Backbone.View

		el: '#form'

		template: _.template $('#__MortgageForm').html()

		events:
			'touchstart [type=number]': 'registerTouch'
			'touchmove  [type=number]': 'changeProperty'
			'touchend   [type=number]': 'deregisterTouch'

		initialize: ->
			@binder = new Backbone.ModelBinder

		render: ->
			@$el.html @template @model.toJSON()
			@binder.bind @model, @el
			@

		registerTouch: (event) ->
			touch = event.originalEvent.touches[0]
			@touch =
				x: touch.pageX
				y: touch.pageY

		changeProperty: (event) ->
			event.preventDefault()
			touch = event.originalEvent.touches[0]
			$target = $ event.target
			property = $target.attr 'name'
			step = $target.data 'step'
			value = @model.get property

			if (touch.pageY - @touch.y < 0)
				value += step
			else
				value -= step

			@model.set property, value

		deregisterTouch: (event) ->
			@touch = null

	class MortgageSummaryView extends Backbone.View

		el: '#summary'

		template: _.template $('#__MortgageSummary').html()

		initialize: ->
			@listenTo @model, "change", @render

		render: ->
			@$el.html @template @model.toFormattedJSON()
			@

	m = new Mortgage
	f = new MortgageFormView { model: m }
	v = new MortgageSummaryView { model: m }

	f.render()
	v.render()
