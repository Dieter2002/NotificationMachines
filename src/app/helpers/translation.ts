import SampleJson from '../resource/keysobjects.json'

class TransationService{
  private greeting: string;

  constructor(){
    this.greeting = "";
  }

  greet() {
    // SampleJson.
    return "Hello, " + this.greeting;
  }
}
