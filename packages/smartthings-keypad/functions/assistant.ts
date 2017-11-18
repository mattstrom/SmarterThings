import functions = require('firebase-functions');
import actions = require('actions-on-google');
import ActionsSdkAssistant = actions.ActionsSdkAssistant;

/**
 * Endpoint which handles requests for a Google Assistant action which asks users to say a number
 * and read out the ordinal of that number.
 * e.g. If the user says "Twelve" the action will say "The ordinal of twelve is twelfth".
 */
export const sayNumber = functions.https.onRequest((req, res) => {
	const assistant = new ActionsSdkAssistant({ request: req, response: res });

	// List of re-prompts that are used when we did not understand a number from the user.
	const reprompts = [
		'I didn\'t hear a number',
		'If you\'re still there, what\'s the number?',
		'What is the number?'
	];

	const actionMap = new Map();

	actionMap.set(assistant.StandardIntents.MAIN, assistant => {
		const inputPrompt = assistant.buildInputPrompt(true, `<speak>
        Hi! <break time="1"/>
        I can read out an ordinal number like <say-as interpret-as="ordinal">123</say-as>.
        Say a number.
      </speak>`, reprompts
		);
		assistant.ask(inputPrompt);
	});

	actionMap.set(assistant.StandardIntents.TEXT, assistant => {
		const rawInput = assistant.getRawInput();
		if (rawInput === 'bye') {
			assistant.tell('Goodbye!');
		} else if (isNaN(parseInt(rawInput, 10))) {
			const inputPrompt = assistant.buildInputPrompt(false, 'I didn\'t quite get that, what was the number?', reprompts);
			assistant.ask(inputPrompt);
		} else {
			const inputPrompt = assistant.buildInputPrompt(true, `<speak>
          The ordinal of <say-as interpret-as="cardinal">${rawInput}</say-as> is
          <say-as interpret-as="ordinal">${rawInput}</say-as>
        </speak>`, reprompts
			);
			assistant.ask(inputPrompt);
		}
	});

	assistant.handleRequest(actionMap);
});
