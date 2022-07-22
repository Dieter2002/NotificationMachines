import { LoggingService } from "./LoggingService";
import { TranslationService } from "./TranslationService";

export class ServiceBundler{
  get Aap() {return new LoggingService();}
  get Leuk() {return new TranslationService();}
}
