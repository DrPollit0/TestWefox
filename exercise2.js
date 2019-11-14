// Execute with: node exercise2.js

const sentences = [
	'Race car',
	'Amad, a la dama.',
	'Taco cat!',
	'Satan... oscillate my metallic sonatas.',
	'Tacogat',
	'abcdba',
];

const isPalindrome = (sentence) => {
	const cleanSentence = sentence.replace(/[^\w]/g, '').toLowerCase();
	const reverseSentence = cleanSentence.split('').reverse().join('');
	return reverseSentence === cleanSentence;
}

sentences.forEach( (element) => {
	console.log(`This is${isPalindrome(element)?'':' NOT'} a palindrome: "${element}"`);
});
