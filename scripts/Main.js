document.getElementById("mem").innerText = formatArray(new Array(30000).fill(0)); // Fill the mem string with a placeholder
placePointer(1); // Puts the pointer on the first varible, placeholder

function pad(num, padAmount) {
	num = num.toString(); // Makes sure the input is a string
	return "\xa0".repeat(padAmount - num.length) + num; // Uses "\xa0" to avoid truncation
}

function formatArray(array) {
	output = "";
	for (arrayPos = 0; arrayPos < array.length; arrayPos++) {
		// Goes through every element of array
		output += pad(array[arrayPos], 4) + ",";
	}
	return `[${output}]`; // Returns the output in brackets
}

function placePointer(pointer) {
	document.getElementById("pointer").innerText = "\xa0".repeat(pointer * 5 - 1) + "^"; // Makes the pointer point to the correct varible (requires a monospaced font)
}

function updateHTML() {
	document.getElementById("mem").innerText = formatArray(code.mem, 3); // Sets the mem div to the current memory of the code
	placePointer(code.pointer + 1); // Places the pointer in the correct area
	document.getElementById("output").value = code.string; // Displays the output
}

function loadCode() {
	code = new BFProgram(document.getElementById("program").value); // Creates a "BFProgram"  with the program string of the program textarea
	document.getElementById("code").value = code.program; // Sets the div "code" to the cleaned BF code
	updateHTML(); // Updates the visuals of the page to the new memory, pointer, output
}

function stepCode() {
	code.step(); // Calls step on the class "code"
	updateHTML(); // Updates the visuals of the page to the new memory, pointer, output
}

function runCode() {
	code.run();
	updateHTML(); // Updates the visuals of the page to the new memory, pointer, output
}
