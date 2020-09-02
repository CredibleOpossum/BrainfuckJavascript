class BFProgram {
	parse = function (str) {
		var parsed = ""; // Set up empty string
		for (var charNum = 0; charNum < str.length; charNum++) {
			// Loop through every character
			if ("><+-,.[]".includes(str[charNum])) {
				// If vaild BF intruction
				parsed += str[charNum]; // Add instruction
			}
		}
		return parsed; // Return the cleaned code
	};

	chr = function (num) {
		return String.fromCharCode(num); // Get the character from the number, returns the character
	};

	ord = function (char) {
		return char.charCodeAt(); // Gets the value of a character, returns the value
	}; // NOTE:If multiple characters are passed, the first one's value is returned

	forward = function () {
		this.pointer += 1; // Push the pointer forward
	};

	backward = function () {
		this.pointer -= 1; // Push the pointer backward
	};

	add = function () {
		this.mem[this.pointer] += 1; // Increment the current memory value
		if (this.mem[this.pointer] == 256) {
			this.mem[this.pointer] = 0; // Loop the varible around
		}
	};

	subtract = function () {
		this.mem[this.pointer] -= 1; // Decrement the current memory value
		if (this.mem[this.pointer] == -1) {
			this.mem[this.pointer] = 255; // Loop the varible around
		}
	};

	input = function () {
		this.mem[this.pointer] = this.ord(prompt()); // Prompt user, take the user's char and convert to ascii value
	};

	output = function () {
		this.string += this.chr(this.mem[this.pointer]); // Pushes the character to its string
	};

	step() {
		switch (this.program[this.programPos]) {
			case ">":
				this.forward();
				break;
			case "<":
				this.backward();
				break;
			case "+":
				this.add();
				break;
			case "-":
				this.subtract();
				break;
			case ",":
				this.input();
				break;
			case ".":
				this.output();
				break;
			case "[":
				if (this.mem[this.pointer] === 0) {
					// Current memory value is zero, jump to the corresponding bracket
					var unmatched = 1;
					while (unmatched > 0) {
						this.programPos++; // Move to next character in program
						if (this.program[this.programPos] === "[") unmatched++; // The next bracket is an opening one, still unmatched
						if (this.program[this.programPos] === "]") unmatched--; // Decrement the unmatched varible.
					}
				}
				break;
			case "]":
				if (this.mem[this.pointer] !== 0) {
					// Current memory value isn't zero, jump back to the corresponding bracket
					var unmatched = 1;
					while (unmatched > 0) {
						// Jump to the previous character in the BF program
						this.programPos--; // If the next character is an opening bracket then there is one less unmatched bracket
						if (this.program[this.programPos] === "[") unmatched--; // Decrement the unmatched varible
						if (this.program[this.programPos] === "]") unmatched++; // The next bracket is an closing one, still unmatched
					}
				}
		}
		this.programPos += 1; // Move the pen to the next intruction
		if (this.programPos > this.program.length) {
			this.running = false; // Shows that the code is finished running
		}
	}

	run = function () {
		while (this.running) {
			this.step(); // Run until completion, beware of infinite loops
		}
	};

	constructor(program) {
		this.program = this.parse(program); // Grabs a minimal version of the BF program
		this.programPos = 0; // The intruction the program is running, might change the name
		this.mem = new Array(30000).fill(0); // Fills the memory with 30,000 zeros
		this.pointer = 0; // Points to where in memory the program is
		this.string = ""; // Stores all the outputted characters
		this.running = true; // Shows if the code is done running
	}
}
