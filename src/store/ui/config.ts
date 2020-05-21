/**
  创建和配置 IOC
*/
import { Container } from "inversify"
import { UiInterface, Types } from './type'
import { UiServices } from "./services"
const UiContainer = new Container({defaultScope: "Singleton"});
UiContainer.bind<UiInterface>(Types.UiInterface).to(UiServices)
export { UiContainer }