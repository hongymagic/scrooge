# Simple LMI Calculator based on http://at.hon.gy/Z1pLvI. Is there a better way
# to implement this lookup?

	LMI =
		lookup: (lvr, loan) ->
			b1 = [0.41, 0.61, 0.76, 0.91, 1.22, 1.68, 1.89, 2.10]
			b2 = [0.52, 0.78, 0.99, 1.18, 1.60, 2.20, 2.47, 2.74]
			b3 = [0.72, 1.01, 1.25, 1.50, 2.02, 3.31, 3.56, 3.76]

			if loan <= 300000
				band = b1
			else if loan <= 600000
				band = b2
			else if loan <= 1000000
				band = b3

			if lvr > 0.8 and lvr < 0.82
				index = 0
			else if lvr < 0.84
				index = 1
			else if lvr < 0.86
				index = 2
			else if lvr < 0.88
				index = 3
			else if lvr < 0.9
				index = 4
			else if lvr < 0.92
				index = 5
			else if lvr < 0.94
				index = 6
			else
				index = 7

			band[index] / 100

# Repayment periods

	Period =
		Monthly     : 12
		Fortnightly : 24
		Weekly      : 48

# Mortgage

	class Mortgage extends Backbone.Model

# Every mortgage has these variables which can be adjusted.

		defaults:
			interest: 5.74 / 100
			price:    700000
			deposit:  150459
			duration: 30 * 12

# TODO: The big fat stamp duty!

		stamp_duty: ->
			26990

# Loan is calculated based on the price of the property and the initial deposit
# put down on the property.

		loan: ->
			this.price - this.deposit

# This is the total monies borrowed from the lender.

		borrowing: ->
			this.loan() + this.lmi() + this.fees() + this.stamp_duty()

# TODO: Lender's settlement fee, legal fees, Registration fees, Other lender fees.

		fees: ->
			2469

# Loan to Value Ratio (LVR) is calculated based on the loan and the price of the
# property.
#
# Note: This value is almost always presented as percentage value.

		lvr: ->
			this.loan() / this.price

# Depending on the LVR, a mortgage may need pay Lenders' Mortgage Insurace. This
# value can vary depending on the LVR and the lender

		lmi: ->
			LMI.lookup(this.lvr(), this.loan()) * this.loan()

# Monthly repayments for the mortgage based on above variables:
# 	M = P (i(1 + i)^n) / ((1 + i)^n - 1)

		repayments: () ->
			P = this.borrowing()
			i = this.interest / Period.Monthly
			n = this.duration
			P * (i * Math.pow((i + 1), n)) / (Math.pow((1 + i), n) - 1)

		toJSON: ->
			_.extend _.clone(this.attributes), {
				fees       : this.fees()
				loan       : this.loan()
				borrowing  : this.borrowing()
				lvr        : this.lvr() * 100
				repayments : this.repayments()
				lmi        : this.lmi()
			}

		toString: ->
			JSON.stringify this.toJSON()

# Test

	m = new Mortgage
	console.log m.toString()
