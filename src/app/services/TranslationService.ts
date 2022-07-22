import SampleJson from '../resource/keysobjects.json'

export class TranslationService{
  private greeting: string;

  constructor(){
    this.greeting = "";
  }

  greet() {
    // SampleJson.
    return "Hello, " + this.greeting;
  }
}
