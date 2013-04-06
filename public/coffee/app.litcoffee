LMI       = require './lmi.litcoffee'
StampDuty = require './stamp-duty.litcoffee'

Repayment periods

	Period =
		Monthly     : 12
		Fortnightly : 24
		Weekly      : 48

Mortgage

	class Mortgage extends Backbone.Model

Every mortgage has these variables which can be adjusted.

		defaults:
			interest: 5.74
			price:    700000
			deposit:  150459
			duration: 30

The big fat stamp duty!

		stamp_duty: ->
			StampDuty.calculate @price

Loan is calculated based on the price of the property and the initial deposit
put down on the property.

		loan: ->
			@price - @deposit

This is the total monies borrowed from the lender. It is common to add extra
costs such as LMI, fees on top of the loan in order to decrease the intial
LVR.

		borrowing: ->
			@loan() + @lmi() + @fees() + @stamp_duty()

TODO: Lender's settlement fee, legal fees, Registration fees, Other lender fees.

		fees: ->
			2469

Loan to Value Ratio (LVR) is calculated based on the loan and the price of the
property.

Note: This value is almost always presented as percentage value.

		lvr: ->
			@loan() / @price

Depending on the LVR, a mortgage may need pay Lenders' Mortgage Insurace. This
value can vary depending on the LVR and the lender

		lmi: ->
			LMI.lookup(@lvr(), @loan()) * @loan()

Monthly repayments for the mortgage based on above variables:
M = P (i(1 + i)^n) / ((1 + i)^n - 1)

		repayments: () ->
			P = @borrowing()
			i = @interest / Period.Monthly / 100
			n = @duration * Period.Monthly
			P * (i * Math.pow((i + 1), n)) / (Math.pow((1 + i), n) - 1)

Collection of model properties and computed properties. All units are in human
readable format. For example, percentage units will be exported as: 70.10
intead of 0.7010 which are used in calculations.

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

Prettified toJSON

		toFormattedJSON: ->
			monies   = ['price', 'deposit', 'stamp_duty', 'fees', 'loan', 'borrowing', 'repayments', 'lmi']
			decimals = ['lvr', 'interest']
			json = @toJSON()
			for key, value of json
				json[key] = accounting.formatMoney value if key in monies
				json[key] = accounting.formatNumber value if key in decimals
			json

Hack to get it working with Tangle

		update: ->


		toString: ->
			JSON.stringify @toJSON()

A view to let users input their own mortgage variables

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

Instantiate a default view for everyone as a starting point

	m = new Mortgage
	f = new MortgageFormView { model: m }
	v = new MortgageSummaryView { model: m }

	f.render()
	v.render()
