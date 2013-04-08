Lenders' Mortgage Insurance calculator. This is a very simple and naive
implementation of the LMI. Please note that every lender has their own
bracket for LMI. Use this as an approximate calculation.

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

	module.exports = LMI
