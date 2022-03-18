Array.prototype.mySlice = function (start = 0, end) {
	const result = [];
	const arr = this;
	const arrLen = this.length;
	end = end || arrLen;
	if (start < 0) start = arrLen + start;
	if (end < 0) end = arrLen + end;

	for (let i = start; i < end; i++) {
		result.push(arr[i]);
	}
	return result;
}
console.log(["Banana", "Orange", "Lemon", "Apple", "Mango"].mySlice(-3, -1))//Orange,Lemon

console.log(["Banana", "Orange", "Lemon", "Apple", "Mango"].mySlice(-3, -1)); //Lemon,Apple