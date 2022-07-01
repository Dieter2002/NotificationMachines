import SampleJson from '../resource/keysobjects.json'

export class LoggingService {
  been = SampleJson;

	logSomeMessage(msg: any) {
		console.log("Message from consumer is : " + msg);
	}
}
